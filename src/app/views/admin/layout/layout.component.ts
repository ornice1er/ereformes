import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { GlobalName } from '../../../core/utils/global-name';
import { LocalStorageService } from '../../../core/utils/local-stoarge-service';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppSweetAlert } from '../../../core/utils/app-sweet-alert';
import { FormsModule } from '@angular/forms';
import { AdminMenu, SaisieCentraleMenu, SaisieMenu, ValidationMenu, PublicationMenu } from './menu';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    FormsModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  menuOpen = true;
  user:any
  role:any
  loading:any
  menu:any[]=[]
 isMobile: boolean = false;

  constructor(
    private modalService: NgbModal,
    private authService:AuthService,
    private router: Router,
    private toastr:ToastrService,
    private lsService:LocalStorageService
  ) { }

  ngOnInit(): void {
   this.checkScreenSize();
    this.user=this.lsService.get(GlobalName.userName)
    this.role=this.user.roles[0].name
    this.getMenu()
}

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }


toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

    openAddModal(content:any) {
    this.loading=false
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" })
  }

  logout(){
    this.authService.logout().subscribe((res:any)=>{
      this.lsService.remove(GlobalName.tokenName)
      this.lsService.remove(GlobalName.refreshTokenName)
      this.lsService.remove(GlobalName.expireIn)
      this.lsService.remove(GlobalName.userName)
      this.lsService.remove(GlobalName.exercice)
      this.router.navigate(['/auth/login'])
      this.toastr.success('Déconnexion réussie', 'Connexion');
    }),
    (err:any)=>{
      console.log(err)
      this.toastr.success('Déconnexion échouée', 'Connexion');

    } ;
  }

     saveUsager(value:any) {
      this.loading=true
      this.authService.update(value).subscribe((res: any) => {
              this.loading=false

        this.modalService.dismissAll()
        AppSweetAlert.simpleAlert('succes',"Mise à jour", "Profile mis à jour avec succès");
      })
      
      /*if (value.password != value.confirm) {
        AppSweetAlert.simpleAlert("Erreur", "Mot de passe non identique", 'error');
      } else {
       
      }*/
  
    }


      getMenu(){
    switch (this.role) {
      case "admin":
          this.menu=AdminMenu
        break;
      case "saisie central":
          this.menu=SaisieCentraleMenu
        break;
      case "saisie":
          this.menu=SaisieMenu
        break;
      case "validation":
          this.menu=ValidationMenu
        break;
      case "publication":
          this.menu=PublicationMenu
        break;
     
    
      default:
        break;
    }
  }


}
