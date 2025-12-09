import { Component } from '@angular/core';
import { ReformeService } from '../../../../core/services/reforme.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { CouvertureService } from '../../../../core/services/couverture.service';
import { NatureService } from '../../../../core/services/nature.service';
import { StructureService } from '../../../../core/services/structure.service';
import { BarChart3, Building, FileText, LucideAngularModule, Users } from 'lucide-angular';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule,FormsModule,LucideAngularModule,SampleSearchPipe],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  buttonsPermission :any|undefined;
  data:any[] =[]
    data2:any[] =[]
  stats: any;
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
  structures:any[] =[]
  covers:any[] =[]
  natures:any[] =[]
 readonly FileTextIcon = FileText;
  readonly BarChart3Icon = BarChart3;
  readonly UsersIcon = Users;
  readonly BuildingIcon = Building;

    constructor(
      private reformeService:ReformeService,
      private toastrService:ToastrService,
          private structuService:StructureService,
          private coverService:CouvertureService,
          private natureService:NatureService,
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
        this.getStructures()
    this.getNatures()
    this.getCovers()
    }
  
    getAll(){
      this.reformeService.getPublic(this.isPaginate,this.pg.pageSize,this.pg.p).subscribe((res:any)=>{
          this.isPaginate=res.isPaginate
        if (this.isPaginate) {
          this.data=res.data.reformes?.data
          this.pg.p=res.data.reformes?.current_page
          this.pg.total=res.data.reformes?.total
        }else{
        this.data=res.data.reformes
        this.pg.p=1
        this.pg.total=res.data.reformes?.length
        }

        this.stats=res.data.stats
       this.selectedId=null
        this.modalService.dismissAll()
        this.data2=this.data
      },
      (err:any)=>{
  
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


  filterByStructure(event:any){
     if ( event.target.value=="all") {
      this.data2=this.data
    }else{
    this.data2= this.data.filter((el:any) => el.structure_id == event.target.value)

    }
    
   }
   filterByNature(event:any){
     if ( event.target.value=="all") {
      this.data2=this.data
    }else{
    this.data2= this.data.filter((el:any) => el.nature_id == event.target.value)

    }
    
 
   }
   filterByCover(event:any){
     if ( event.target.value=="all") {
      this.data2=this.data
    }else{
    this.data2= this.data.filter((el:any) => el.couverture_id == event.target.value)

    }
    
 
   }
   filterByTypeR(event:any){
    if ( event.target.value=="all") {
      this.data2=this.data
    }else{
    this.data2= this.data.filter((el:any) => el.typeref == event.target.value)

    }
    
 
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

}
