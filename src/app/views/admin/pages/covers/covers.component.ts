import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { CouvertureService } from '../../../../core/services/couverture.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-covers',
  templateUrl: './covers.component.html',
  standalone:true,
  imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],
  styleUrls: ['./covers.component.css']
})
export class CoversComponent implements OnInit {

  buttonsPermission :any|undefined;
  data:any[] =[]
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
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
    
    private coverService:CouvertureService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
    private modalService: NgbModal) {
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
  }

  getAll(){
    this.coverService.getAll(this.isPaginate,this.pg.pageSize,this.pg.p).subscribe((res:any)=>{
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
     this.selectedId=null
      this.modalService.dismissAll()
      
    },
    (err:any)=>{

    })
  }


  store(value:any){
    this.loading=true
    this.coverService.store(value).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    this.loading=false

    },
    (err:any)=>{
      if(err.error.message){
        AppSweetAlert.simpleAlert("error","Couverture",err.error.message)
      }else{
        let message="";
        for (const key in err.error) {
          if (Object.prototype.hasOwnProperty.call(err.error, key)) {
            const element = err.error[key];
            let sub_message =""
  
            element.forEach((el:any) => {
              sub_message+=el+" \n"
            });
            message=`${key}: ${sub_message}`
          }
          console.log(message)
  
        }
            this.loading=false

      }       
    })
  }
  update(value:any){
        this.loading=true

    this.coverService.update(this.selected_data.id,value).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
            this.loading=false

    },
    (err:any)=>{
      if(err.error.message){
        AppSweetAlert.simpleAlert("error","Couverture",err.error.message)
      }else{
        let message="";
        for (const key in err.error) {
          if (Object.prototype.hasOwnProperty.call(err.error, key)) {
            const element = err.error[key];
            let sub_message =""
  
            element.forEach((el:any) => {
              sub_message+=el+" \n"
            });
            message=`${key}: ${sub_message}`
          }
          console.log(message)
  
        }
        
      }   
          this.loading=false

    })
  }
  delete(){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.coverService.delete(this.selected_data.id).subscribe((res:any)=>{
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

    setStatus(value:any){
  
      this.toastrService.warning("Opération en cours")
        this.loading=true
          this.coverService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
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
  const localResults = this.data.filter(d => d.lib_couvert.includes(this.search_text));
  if (this.search_text.length > 2 && localResults.length === 0) {
    this.searchRemotely();
  }
}

  searchRemotely() {
  if (!this.search_text || this.search_text.trim().length < 2) return;

  this.loading = true;

  this.coverService.search({search:this.search_text}).subscribe({
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
