import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { AffectationService } from '../../../../core/services/affectation.service';
import { ReformeService } from '../../../../core/services/reforme.service';
import { ResultatService } from '../../../../core/services/resultat.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
  selector: 'app-follow-reforme',
  templateUrl: './follow-reforme.component.html',
    standalone:true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule],
  styleUrls: ['./follow-reforme.component.css']
})
export class FollowReformeComponent implements OnInit {
  buttonsPermission :any|undefined;
  structures:any[] =[]
  roles:any[] =[]
  data:any[] =[]
  reformes:any[] =[]
  reformes2:any[] =[]
  result:any
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  isShown=false;
  pg={
    pageSize:10,
    p:1,
    total:0
  }
  isPaginate=true
 search_text=""
 loading=false
  remoteSearchData: any[] = []
     selectedId: number | null = null;
  is_active=null
  
  constructor(
    private reformeService:ReformeService,
    private resultService:ResultatService,
    private affService:AffectationService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
    private modalService: NgbModal,
    
    

    ) {
     config.backdrop = 'static';
     config.keyboard = false;
     }


  ngOnInit(): void {

    this.init()
    this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
  }

  init(){
    this.getAll()
    this.getReformes()
  }



  getAll(){
    this.data=[]
    this.reformeService.getSuiviResult(this.isPaginate,this.pg.pageSize,this.pg.p).subscribe((res:any)=>{
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
      //
    },
    (err:any)=>{

    })
  }
  getReformes(){
    this.data=[]
    
    this.reformeService.getAll().subscribe((res:any)=>{
     this.reformes=res.data
     this.loadResult( this.reformes![0].id)
     this.reformes.forEach((el:any)=> this.reformes2.push({id:el.id,text:el.libref}))
     this.isShown=true;
     
    },
    (err:any)=>{

    })
  }

  loadResult(event:any){
   
    this.reformeService.get(event).subscribe((res:any)=>{
      this.result=res.data
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
        AppSweetAlert.simpleAlert("error","Région",err.error.message)
    })
  }
  update(value:any){
    this.reformeService.update(this.selected_data.id,value).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Région",err.error.message)
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
        AppSweetAlert.simpleAlert("error","Région",err.error.message)
    })
  }
})
  }
  checked(el?:any){
    this.selected_data=el;
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

    this.reformeService.store(value).subscribe((res:any)=>{
      this.toastrService.success(res.message)
      this.getAll()

  },
  (err:any)=>{
    console.log(err)
      AppSweetAlert.simpleAlert("error","Retour de l'enregistrement",err.error.message)
  })
  }

  transUp(){
    if(!this.verifyIfElementChecked()) return ;

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
      AppSweetAlert.simpleAlert("error","Publication de réforme",err.error.message)
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

  changeStatus(id:any){
    AppSweetAlert.confirmBox('info','Suivi de réforme','Confirmer ce resultat comme valider ?').then((result:any)=>{

      if (result.isConfirmed) {
        this.resultService.update(id,{status:1}).subscribe((res:any)=>{
          AppSweetAlert.simpleAlert("success","Suivi de réforme","Validation de résultat effectuée avec succès")

          this.init()
         },
         (err:any)=>{
     
         })
      }
 
    })
  
  }

  getPourcent(o:any){
    let total= o.results.length
    if (total !=0) {
       let current=o.results.filter((el:any)=>el.status ==1).length
    let pourcent= (current*100)/total
    return `(${pourcent}%)`;
    }
   
    return ""
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
