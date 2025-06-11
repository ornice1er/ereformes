import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ObjectifService } from '../../../../core/services/objectif.service';
import { ReformeService } from '../../../../core/services/reforme.service';
import { SuiviResultService } from '../../../../core/services/suivi-result.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
  selector: 'app-follow-reforme-create',
  templateUrl: './follow-reforme-create.component.html',
    standalone:true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule],
  styleUrls: ['./follow-reforme-create.component.css']
})
export class FollowReformeCreateComponent implements OnInit {
  buttonsPermission :any|undefined;
  data:any[] =[]
  reformes:any[] =[]
  objectifs:any[] =[]
  results:any[] =[]
  result_id:any
  suivi_results:any[] =[]
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  loading=false
  user:any
  
  constructor(
    
    private objectifService:ObjectifService,
    private reformeService:ReformeService,
    private srService:SuiviResultService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
      private lsService:LocalStorageService,
    private modalService: NgbModal) {
     config.backdrop = 'static';
     config.keyboard = false;
     }


  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)

    this.init()
    this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
  }

  init(){
   // this.getAll()
    this.getReformes()
  }



  getAll(){
    this.data=[]
    this.objectifService.getAll().subscribe((res:any)=>{
      this.data=res.data
      this.modalService.dismissAll()
      
    },
    (err:any)=>{

    })
  }

  getReformes(){
    this.data=[]
    this.reformeService.getAll().subscribe((res:any)=>{
     this.reformes=res.data
    },
    (err:any)=>{

    })
  }


  store(value:any){
    value.resultat_id=this.result_id

    if (this.suivi_results.length>0) {
              let date1=new Date(this.suivi_results[this.suivi_results.length-1].date)
        let date2=new Date(value.date)
      if (date1.getTime()> date2.getTime()) {
        AppSweetAlert.simpleAlert("error","Date Incorrect","On ne peut avoir une date antérieur au dernier enregistrement!")
        return ;
      }
    }

   
    this.loading=true
    
    this.srService.store(value).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
        this.loading=false
        this.suivi_results.push(res.data)
        this.modalService.dismissAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Donnée de suivi",err.error.message)
    })
  }
  update(value:any){
    this.srService.update(this.selected_data.id,value).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Objectif",err.error.message)
    })
  }
  delete(){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.srService.delete(this.selected_data.id).subscribe((res:any)=>{
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
    if(this.result_id==null){
      AppSweetAlert.simpleAlert("error","Donnée de suivi","Veuillez sélectionner un résultat")
      return 
    }
      
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

  getObjectfs(event:any){
    console.log(event.target.value)
    this.objectifs= this.reformes.find((el:any)=>el.id == event.target.value).objectifs
  }

  getResults(event:any){
    this.results= this.objectifs.find((el:any)=>el.id == event.target.value).results
  }
  getSuiviResults(event:any){
    this.result_id=event.target.value

    this.suivi_results= this.results.find((el:any)=>el.id == event.target.value).suivi_results

    console.log(this.suivi_results)
  }

  deleteSuiviResult(id:any,index:any){
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.srService.delete(id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()

        this.suivi_results.splice(index,1)
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Couverture",err.error.message)
    })
  }
})
  }
}
