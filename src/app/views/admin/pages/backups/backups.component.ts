import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { AuthService } from '../../../../core/services/auth.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { ConfigService } from '../../../../core/utils/config-service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { BackupService } from '../../../../core/services/backup.service';

@Component({
  selector: 'app-backups',
  templateUrl: './backups.component.html',
   standalone:true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule],
  styleUrls: ['./backups.component.css']
})
export class BackupsComponent implements OnInit {
  isLoadning=false


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
    
      config: NgbModalConfig,
      private bakcService:BackupService,
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

  saveDB(){
    this.isLoadning=true

    this.bakcService.saveDB().subscribe((res:any)=>{
      AppSweetAlert.simpleAlert("success","Sauvegarde de la base de donnée","Base de donnée sauvegardèe")
      this.init()
    },  
    (err:any)=>{
      this.isLoadning=false
      AppSweetAlert.simpleAlert("error","Sauvegarde de la base de donnée",err.error.message)
    })
  }
  getAll(){
    this.bakcService.getBackups(this.isPaginate,this.pg.pageSize,this.pg.p).subscribe((res:any)=>{
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


 


  
  
   download(name:string,type:any){
     if (type=="doc") {
        console.log(ConfigService.toFile("storage/backups/docs/"+name))
      return ConfigService.toFile("storage/backups/docs/"+name);

     }else{
      return ConfigService.toFile("storage/backups/db_data/"+name);

     }
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

  this.bakcService.search({search:this.search_text}).subscribe({
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
