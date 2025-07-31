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
import {
  LucideAngularModule,
  FileText,
  BarChart3,
  Users,
  Building,
} from 'lucide-angular';
import { Observable } from 'rxjs';
import { ReformService } from '../../../../core/services/reform.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SampleSearchPipe, LucideAngularModule,  MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatChipsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  user: any;
  data: any;
  role: any;
  audits: any;
  search_text = '';
  readonly FileTextIcon = FileText;
  readonly BarChart3Icon = BarChart3;
  readonly UsersIcon = Users;
  readonly BuildingIcon = Building;
  reforms$: Observable<any>;
  displayedColumns: string[] = [
    'objet',
    'periode',
    'status',
    'structure',
    'progression',
  ];

  constructor(
    private lsService: LocalStorageService,
    private dashService: DashService,
    private authService: AuthService,
    private reformService: ReformService
  ) {
    this.reforms$ = this.reformService.getReforms();
  }

  ngOnInit(): void {
    this.user = this.lsService.get(GlobalName.userName);
    this.role = this.user.roles[0].name;
    this.getDash();
  }

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      administrative: 'Administrative',
      institutionnelle: 'Institutionnelle',
      structurelle: 'Structurelle',
    };
    return labels[type] || type;
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      en_cours: 'En cours',
      planifiee: 'Planifiée',
      terminee: 'Terminée',
      suspendue: 'Suspendue',
    };
    return labels[status] || status;
  }

  formatDateRange(dateDebut: string, dateFin: string): string {
    const debut = new Date(dateDebut).toLocaleDateString('fr-FR', {
      month: 'short',
      year: 'numeric',
    });
    const fin = new Date(dateFin).toLocaleDateString('fr-FR', {
      month: 'short',
      year: 'numeric',
    });
    return `${debut} - ${fin}`;
  }

  getDash() {
    this.data = [];
    this.dashService.getDashAdmin(this.role).subscribe(
      (res: any) => {
        this.data = res.data;
      },
      (err: any) => {}
    );
  }

  getAll() {
    this.dashService.getDash().subscribe(
      (res: any) => {
        this.data = res.data;
      },
      (err: any) => {
        AppErrorShow.showError('Tableau de bord', err);
      }
    );
  }
}
