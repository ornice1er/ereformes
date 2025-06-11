import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { AffectationService } from '../../../../core/services/affectation.service';
import { ObjectifService } from '../../../../core/services/objectif.service';
import { ReformeService } from '../../../../core/services/reforme.service';
import { ResultatService } from '../../../../core/services/resultat.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
  selector: 'app-index2-reformes',
  templateUrl: './index2-reformes.component.html',
    standalone:true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule],
  styleUrls: ['./index2-reformes.component.css']
})
export class Index2ReformesComponent implements OnInit {

  buttonsPermission :any|undefined;
  structures:any[] =[]
  roles:any[] =[]
  data:any[] =[]
  objectifs:any[] =[]
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  role:any
  user:any
pg={
    pageSize:10,
    p:1,
    total:0
  }
  isPaginate=true
   search_text=""
 loading=false
  remoteSearchData: any[] = []
  constructor(
    private reformeService:ReformeService,
    private affService:AffectationService,
    private toastrService:ToastrService,
    private resultService:ResultatService,
      config: NgbModalConfig,
    private modalService: NgbModal,
    
    private lsService:LocalStorageService,
    private objectifService:ObjectifService,
    private router:Router

    ) {
     config.backdrop = 'static';
     config.keyboard = false;
     }


  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.role=this.user.roles[0].name

    this.init()
    this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true,
      result:true
    };
  }

  init(){
    this.getAll()
   //this.getObjectifs()
  }



  getAll(){
    // this.data=[]
    this.reformeService.getCurrent(this.isPaginate,this.pg.pageSize,this.pg.p).subscribe((res:any)=>{
      this.isPaginate=res.isPaginate
      if (this.isPaginate) {
        this.data=res.data.data
        this.pg.p=res.data.current_page
        this.pg.total=res.data.total
      }else{
      this.data=res.data
      this.pg.p=1
      this.pg.total=res.data.length
      }
     
      this.modalService.dismissAll()
      
    },
    (err:any)=>{

    })
  }


  store(value:any){
    this.reformeService.store(value).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()

    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Reformes",err.error.message)
    })
  }
  update(value:any){
    this.reformeService.update(this.selected_data.id,value).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Reformes",err.error.message)
    })
  }
  delete(){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.reformeService.delete(this.selected_data.id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Reformes",err.error.message)
    })
  }
})
  }
  checked(el?:any){
    console.log(el)
    this.selected_data=el;
    this.objectifs=this.selected_data.objectifs
  }
  verifyIfElementChecked(){
    console.log(this.selected_data)
    if (this.selected_data==null) {
      this.toastrService.warning("Aucun élément selectionné");
      return false;
    }
    return true;
  }


  dismiss(){
    this.modalService.dismissAll()
  }

  add(content:any){
    this.modalService.open(content,{size:'lg'});
  }
  openAff(content:any){
    if(!this.verifyIfElementChecked()) return ;

    this.modalService.open(content,{size:'lg'});
  }


  show(content:any){
    if(!this.verifyIfElementChecked()) return ;
    this.modalOption={centered:false,size:"lg"}
    this.modalService.open(content,{size:'lg'});
  }

  edit(content:any){
    if(!this.verifyIfElementChecked()) return ;
    this.modalService.open(content,{size:'lg'});

  }

  storeAff(value:any){
    if(!this.verifyIfElementChecked()) return ;
    AppSweetAlert.confirmBox('info','Affectation ou Retour de correction ','Voulez vous envoyer  cet enregistrement ?').then((result:any)=>{
   
      if (result.isConfirmed) {
        let data={
          reforme_id:this.selected_data.id,
          sens:1,
          instruction:value.instruction
        };
        console.log(data);
        this.affService.store(data).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAll()
    
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","Retour de l'enregistrement",err.error.message)
      })
      } 
    })
   
  }

  transUp(){
    if(!this.verifyIfElementChecked()) return ;
    AppSweetAlert.confirmBox('info','Transmission de la réforme','Voulez vous transmettre  cet enregistrement ?').then((result:any)=>{

      if (result.isConfirmed) {
        let value={
          reforme_id:this.selected_data.id,
          sens:-1
        };
    
        this.affService.store(value).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAll()
    
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","Transmission de l'enregistrement ",err.error.message)
      })
      } 
    })
   
  }
  publish(){
    if(!this.verifyIfElementChecked()) return ;

    AppSweetAlert.confirmBox('info','Publication de réforme','Voulez vous publier cette réforme ?').then((result:any)=>{

      if (result.isConfirmed) {
        this.reformeService.publish(this.selected_data.id).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAll()
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","Publication de réforme",err.error.message)
      })
      } 
    })
   
  }

  unpublish(){
    if(!this.verifyIfElementChecked()) return ;

    AppSweetAlert.confirmBox('info','Publication de réforme','Voulez vous arrêter de publier cette réforme ?').then((result:any)=>{

      if (result.isConfirmed) {
        this.reformeService.unpublish(this.selected_data.id).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAll()
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","Publication de réforme",err.error.message)
      })
      } 
    })
   
  }
  getObjectifs(){
    this.objectifService.getAll().subscribe((res:any)=>{
      this.objectifs=res.data
    },
    (err:any)=>{

    })
  }
  storeR(value:any){
    this.resultService.store(value).subscribe((res:any)=>{
      AppSweetAlert.simpleAlert("success","Objectifs",res.message)
      this.getAll()

    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Région",err.error.message)
    })
  }

  storeObjectif(value:any){
    value.reforme_id=this.selected_data.id
    this.objectifService.store(value).subscribe((res:any)=>{
        // this.toastrService.success(res.message)
        this.getAll()
        AppSweetAlert.simpleAlert("success","Objectifs",res.message)

    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Objectifs",err.error.message)
    })
  }
  goToEdit(){
      this.router.navigate(['/admin/edit-reforme/'+this.selected_data.id]);
  }

  deleteR(id:any){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.objectifService.delete(id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Couverture",err.error.message)
    })
  }
})
  }

  deleteResult(id:any){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.resultService.delete(id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Couverture",err.error.message)
    })
  }
})
  }

    onSearchChange() {
  const localResults = this.data.filter(d => d.name.includes(this.search_text));
  if (this.search_text.length > 2 && localResults.length === 0) {
    this.searchRemotely();
  }
}

  searchRemotely() {
  if (!this.search_text || this.search_text.trim().length < 2) return;

  this.loading = true;

  this.reformeService.search({search:this.search_text}).subscribe({
    next: (result:any) => {
      this.remoteSearchData = result.data;
      this.data = this.remoteSearchData;
      this.pg.p=1
      this.pg.total=this.data.length
      this.loading = false;
      console.log(this.remoteSearchData);
    },
    error: (err:any) => {
      console.error(err);
      this.loading = false;
    }
  });
}

resetSearch() {
  this.search_text = '';
  this.isPaginate=true;
  this.pg.p = 1; // reset pagination si utilisée
  this.getAll(); // méthode pour recharger les données initiales
}


  getPage(event:any){
    if (this.isPaginate) {
      this.pg.p=event
      this.getAll();
    } else {
          this.pg.p=event
    }
  }

}
