import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../../core/services/role.service';
import { AppDashBloc } from '../../../../core/utils/app-dash-bloc';
import { AppErrorShow } from '../../../../core/utils/app-error-show';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserService } from '../../../../core/services/user.service';
declare var bootstrap: any;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  standalone:true,
  imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule],
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,AfterViewInit  {
@ViewChild('other_content1') other_content1:any
@ViewChild('other_content2') other_content2:any
@ViewChild('other_content3') other_content3:any
  

  buttonsPermission :any|undefined;
 search_text=""
  structures:any[] =[]
  roles:any[] =[]
  selectedRoles:any[] =[]
  data:any[] =[]
  dashTags:any[] =AppDashBloc
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  is_active=null
  loading=false
  remoteSearchData: any[] = []
  role_name=""
  role:any
  user:any
  pg={
    pageSize:10,
    p:1,
    total:0
  }
  isPaginate=true
  selectedId: number | null = null;
  tag="admin-users"
  
  constructor(
    private userService:UserService,
    private roleService:RoleService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
      private lsService:LocalStorageService,
    private modalService: NgbModal) {
     config.backdrop = 'static';
     config.keyboard = false;
     }


  ngAfterViewInit(): void {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
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
    this.getRoles()
  }


  getRoles(){
    this.roleService.getAll().subscribe((res:any)=>{
      this.roles=res.data
    },
    (err:any)=>{
    AppErrorShow.showError("Gestion des utilisateurs",err)
    })
  }

  getAll(){
    this.selectedId = null;
    this.userService.getAll(this.isPaginate,this.pg.pageSize,this.pg.p).subscribe((res:any)=>{
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
AppErrorShow.showError("Gestion des utilisateurs",err)
    })
  }



  store(value:any){
    this.loading=true
    if(value.is_signer=="")value.is_signer=false
    console.log(value)
    this.userService.store(value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()

    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Gestion des utilisateurs",err.error.message)
    })
  }

  resetPassword(value:any){
    this.loading=true
    value['id']=this.selected_data.id
    this.userService.resetPassword(value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()

    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Gestion des utilisateurs",err.error.message)
    })
  }
  update(value:any){
    this.loading=true
    if(value.is_signer=="")value.is_signer=false

    this.userService.update(this.selected_data.id,value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Gestion des utilisateurs",err.error.message)
    })
  }
  delete(){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.userService.delete(this.selected_data.id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Gestion des utilisateurs",err.error.message)
    })
  }
})
  }
  checked(el?:any){
    this.selectedRoles=[]
    this.selected_data=el;
    this.selected_data?.roles?.forEach((el:any) => this.selectedRoles.push(el.name));
    this.is_active=el.is_active
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
        this.userService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
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

  this.userService.search({search:this.search_text}).subscribe({
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


  hasRole(el:any){
    return false;
  }

  filterByRole(ev:any){
    //el.roles.find((el2:any)=>el2.name == ev.target.value)!=undefined ?true:false
     this.data.filter((el:any)=>{
       console.log(ev.target.value);
      return false;
    })
  }

}
