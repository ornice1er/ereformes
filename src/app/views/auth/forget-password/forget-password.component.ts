import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  standalone: true,
  imports: [LoadingComponent, FormsModule, RouterModule, CommonModule],
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  loading: any;
  mailSent = false;
  email: string = '';
  isLoading: boolean = false;
  isSuccess: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  sendMail(value: any) {
    this.loading = true;
    this.authService.sendMail(value).subscribe(
      (res: any) => {
        this.loading = false;
        this.mailSent = true;
      },
      (err: any) => {
        this.loading = false;
        this.toastr.success('Connexion échoué', 'Connexion');
      }
    );
  }

  onSubmit(): void {
    if (this.email) {
      this.isLoading = true;
      // this.loading = true;
      this.authService.sendMail({ email: this.email }).subscribe(
        (res: any) => {
          this.isLoading = false;
          this.isSuccess = true;
        },
        (err: any) => {
          this.isLoading = false;
          this.toastr.success('Connexion échoué', 'Connexion');
        }
      );
      // // Simulate API call
      // setTimeout(() => {
      //   this.isLoading = false;
      //   this.isSuccess = true;
      // }, 2000);
    }
  }
}
