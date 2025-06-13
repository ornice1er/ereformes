import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { AffectationService } from '../../../../core/services/affectation.service';
import { CouvertureService } from '../../../../core/services/couverture.service';
import { NatureService } from '../../../../core/services/nature.service';
import { ObjectifService } from '../../../../core/services/objectif.service';
import { ReformeService } from '../../../../core/services/reforme.service';
import { ResultatService } from '../../../../core/services/resultat.service';
import { StructureService } from '../../../../core/services/structure.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
  selector: 'app-index-reforme',
  templateUrl: './index-reforme.component.html',
    standalone:true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule],
  styleUrls: ['./index-reforme.component.css']
})
export class IndexReformeComponent implements OnInit {
  buttonsPermission :any|undefined;
  structures:any[] =[]
  objectifs:any[] =[]
  user:any
  role:any
  data:any[] =[]
  data2:any[] =[]
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  covers:any[] =[]
  natures:any[] =[]
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
    
    private lsService:LocalStorageService,
    private structuService:StructureService,
    private coverService:CouvertureService,
    private natureService:NatureService,
    private objectifService:ObjectifService,

    ) {
     config.backdrop = 'static';
     config.keyboard = false;
     }


  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.role=this.user.roles[0].name
    

    this.init()
    this.checkAction()
   
  }

  init(){
    this.getAll()
    this.getStructures()
    this.getNatures()
    this.getCovers()
    // this.getObjectifs()
  }



  getAll(){
    this.data=[]
    this.reformeService.getAll(this.isPaginate,this.pg.pageSize,this.pg.p).subscribe((res:any)=>{
      this.isPaginate=res.isPaginate
      if (this.isPaginate) {
        this.data=res.data.data
        this.data2=res.data.data
        this.pg.p=res.data.current_page
        this.pg.total=res.data.total
      }else{
      this.data=res.data
      this.data2=res.data
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
        AppSweetAlert.simpleAlert("error","Ré",err.error.message)
    })
  }
  storeR(value:any){
    this.resultService.store(value).subscribe((res:any)=>{
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
    this.objectifs=this.selected_data.objectifs
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
          AppSweetAlert.simpleAlert("error","Transmission de l'affectation",err.error.message)
      })
      } 
    })
   
  }

  checkAction(){
    switch (this.role) {
      case "admin":
        this.buttonsPermission = {
          show:false,
          add:false,
          edit:false,
          delete:false
        };
        break;
      case "saisie central":
        this.buttonsPermission = {
          show:true,
          add:true,
          edit:true,
          delete:true,
          publish:true,
          unpublish:true,
          transup:false,
          result:true,
          state:true


        };
        break;
      case "saisie":
        this.buttonsPermission = {
          show:true,
          add:true,
          edit:true,
          delete:true
        };
        break;
      case "validation":
        this.buttonsPermission = {
          show:true,
          add:true,
          edit:true,
          delete:true
        };
        break;
      case "publication":
        this.buttonsPermission = {
          show:true,
          add:true,
          edit:true,
          delete:true,
          publish:true,
          unpublish:true,
        };
        break;
     
    
      default:
        break;
    }
  }

  filterByStructure(event:any){
    this.data2= this.data.filter((el:any) => el.structure_id == event.target.value)
    
   }
   filterByNature(event:any){
    this.data2= this.data.filter((el:any) => el.nature_id == event.target.value)
    
 
   }
   filterByCover(event:any){
    this.data2= this.data.filter((el:any) => el.couverture_id == event.target.value)
    
 
   }
   filterByTypeR(event:any){
    this.data2= this.data.filter((el:any) => el.typeref == event.target.value)
    
 
   }
   getNatures(){
    this.data=[]
    this.natureService.getAll().subscribe((res:any)=>{
      this.natures=res.data
    },
    (err:any)=>{

    })
  }


  getCovers(){
    this.data=[]
    this.coverService.getAll().subscribe((res:any)=>{
      this.covers=res.data
    },
    (err:any)=>{

    })
  }
  getStructures(){
    this.data=[]
    this.structuService.getAll().subscribe((res:any)=>{
      this.structures=res.data
    },
    (err:any)=>{

    })
  }

  getObjectifs(){
    this.data=[]
    this.objectifService.getAll().subscribe((res:any)=>{
      this.objectifs=res.data
    },
    (err:any)=>{

    })
  }

    setStatus(value:any){
  
      this.toastrService.warning("Opération en cours")
        this.loading=true
          this.reformeService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
            this.toastrService.success(res.message)
            this.loading=false
            this.getAll()
        },
        (err:any)=>{
          this.loading=false
          console.log(err)
            AppSweetAlert.simpleAlert("error","Gestion des utilisateurs",err.error.message)
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
