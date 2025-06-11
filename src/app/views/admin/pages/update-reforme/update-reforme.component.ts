import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { CouvertureService } from '../../../../core/services/couverture.service';
import { FileService } from '../../../../core/services/file.service';
import { NatureService } from '../../../../core/services/nature.service';
import { ReformeService } from '../../../../core/services/reforme.service';
import { SectorService } from '../../../../core/services/sector.service';
import { StructureService } from '../../../../core/services/structure.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
  selector: 'app-update-reforme',
  templateUrl: './update-reforme.component.html',
    standalone:true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule],
  styleUrls: ['./update-reforme.component.css']
})
export class UpdateReformeComponent implements OnInit {

  user:any
  id:any
  role:any
  data:any
  sectors:any[]=[]
  natures:any[]=[]
  covers:any[]=[]
  structures:any[]=[]
  files:any[]=[]
  isLoading=false
  formData: FormData= new FormData()
  period:any
  date1:any=""
  date2:any=""
  
  constructor(
    private sectorService:SectorService,
    private natureService:NatureService,
    private coverService:CouvertureService,
    private fileService:FileService,
    private reformeService:ReformeService,
    private router:Router,
    private route:ActivatedRoute,
    config: NgbModalConfig,
    private modalService: NgbModal,
    
    private structureService:StructureService,
    private lsService:LocalStorageService,

  ) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    this.get()
    this.getCovers()
    this.getNatures()
    this.getSectors()
    this.getStructures()
    this.user=this.lsService.get(GlobalName.userName)
    this.role=this.user.roles[0].name
  }

  get(){
    this.reformeService.get(this.id).subscribe((res:any)=>{
      this.data=res.data
      this.isLoading=false

    },
    (err:any)=>{
      this.isLoading=false

    })
  }

  getStructures(){
    this.structureService.getAll().subscribe((res:any)=>{
      this.structures=res.data
      this.modalService.dismissAll()
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

  openAddFile(content:any){
    this.modalService.open(content,{size:'lg'});
  }


  getNatures(){
    this.data=[]
    this.natureService.getAll().subscribe((res:any)=>{
      this.natures=res.data
    },
    (err:any)=>{

    })
  }
  getSectors(){
    this.data=[]
    this.sectorService.getAll().subscribe((res:any)=>{
      this.sectors=res.data
    },
    (err:any)=>{

    })
  }


  store(value:any){
    value['files']=this.files
    let date1=new Date(value.date_debut)
    let date2=new Date(value.date_fin)
    if (date1.getTime()> date2.getTime()) {
      AppSweetAlert.simpleAlert("error","Date Incorrect","La date début ne peut être antérieure à la date fin")

    }

    this.isLoading=true
  
    this.reformeService.update(this.id,value).subscribe((res:any)=>{
      this.router.navigate(['/admin/treatment-reformes']);
      this.isLoading=false

    },
    (err:any)=>{
      this.isLoading=false

    })
  }
  addFile(value:any){
    this.formData.append("name_file",value.name_file)
    this.fileService.store(this.formData).subscribe((res:any)=>{
      this.files.push(res.data)
      this.formData= new FormData()
    },
    (err:any)=>{

    })
  }

  uploadFile(event:any){
    this.formData.append("file",event.target.files[0])
  }
  showDate1(event:any){
    var date=new Date(event.target.value);
    this.date1=`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    this.period=`Du ${this.date1} au ${this.date2}`

  }
  showDate2(event:any){
    var date=new Date(event.target.value);
    this.date2=`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    this.period=`Du ${this.date1} au ${this.date2}`

  }
}
