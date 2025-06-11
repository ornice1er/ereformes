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
import { ReformeService } from '../../../../core/services/reforme.service';
import { StructureService } from '../../../../core/services/structure.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
  selector: 'app-search-reforme',
  templateUrl: './search-reforme.component.html',
    standalone:true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule],
  styleUrls: ['./search-reforme.component.css']
})
export class SearchReformeComponent implements OnInit {

  buttonsPermission :any|undefined;
  structures:any[] =[]
  covers:any[] =[]
  natures:any[] =[]
  roles:any[] =[]
  data:any[] =[]
  data2:any[] =[]
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  role:any
  user:any

  
  constructor(
    private reformeService:ReformeService,
    private affService:AffectationService,
    private structuService:StructureService,
    private coverService:CouvertureService,
    private natureService:NatureService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
    private modalService: NgbModal,
    
    private lsService:LocalStorageService,


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
      delete:true
    };
  }

  init(){
    this.getAll()
    this.getStructures()
    this.getNatures()
    this.getCovers()
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


  getAll(){
    this.data=[]
    this.reformeService.getMyList().subscribe((res:any)=>{
     this.data=res
     this.data2=res
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
    AppSweetAlert.confirmBox('info','Transmission de la réforme','Voulez vous transmettre  cet enregistrement ?').then((result:any)=>{

      if (result.isConfirmed) {
        this.reformeService.store(value).subscribe((res:any)=>{
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
          AppSweetAlert.simpleAlert("error","Transmission de l'affectation",err.error.message)
      })
      } 
    })
   
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
}
