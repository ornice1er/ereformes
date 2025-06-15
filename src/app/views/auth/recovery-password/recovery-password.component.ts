import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  standalone:true,
  imports:[LoadingComponent,FormsModule,],
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  loading:any
  token:any
  
    constructor(
      
      private authService:AuthService,
      private router: Router,
      private route:ActivatedRoute,
      private toastr: ToastrService
    ) { }
  
    ngOnInit(): void {
     this.token= this.route.snapshot.paramMap.get('token')
     if (this.token== undefined) {

      this.router.navigate(['/admin/login'])
      
     }
      
    }
  
  
    recoverPassword(value:any){

      if (value.password != value.password_confirmation) {
        this.toastr.error('Nouveaux mots de passe non identique', 'Mot de passe oublié');
        return ;
      }
      value.token=this.token
      this.loading=true
      this.authService.recoverPassword(value).subscribe((res:any)=>{
        this.loading=false
        this.router.navigate(['/login'])
        this.toastr.success('Changement de mot passe réussi', 'Mot de passe oublié');

       
      },
      (err:any)=>{
        this.loading=false
        this.toastr.error('Changement de mot passe échoué', 'Mot de passe oublié');
  
      });
    }
}
