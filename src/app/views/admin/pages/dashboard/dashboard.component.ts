import { Component } from '@angular/core';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth.service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { DashService } from '../../../../core/services/dash.service';
import { AppErrorShow } from '../../../../core/utils/app-error-show';
import { CommonModule } from '@angular/common';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,SampleSearchPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user:any
  data:any
  role:any
  audits:any
  search_text=""

 constructor(
    private lsService:LocalStorageService,
    private dashService: DashService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  
     this.user=this.lsService.get(GlobalName.userName)
     this.getDash();
     this.role=this.user.roles[0].name
}


  getDash(){
    this.data=[]
    this.dashService.getDashAdmin(this.role).subscribe((res:any)=>{
      this.data=res.data
    },
    (err:any)=>{

    })
  }

  getAll(){
    this.dashService.getDash().subscribe((res:any)=>{
      this.data=res.data
    },
    (err:any)=>{
    AppErrorShow.showError("Tableau de bord",err)
    })
  }


}
