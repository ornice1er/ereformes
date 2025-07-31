import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReformService {
  private reformsSubject = new BehaviorSubject<any[]>([]);
  public reforms$ = this.reformsSubject.asObservable();

  private statsSubject = new BehaviorSubject<any>({
    reformesEnAttente: 1,
    totalReformes: 219,
    reformesAdministratives: 192,
    reformesInstitutionnelles: 27
  });
  public stats$ = this.statsSubject.asObservable();

  constructor() {
    // Simuler des données initiales
    this.loadMockData();
  }

  private loadMockData(): void {
    const mockReforms: any[] = [
      {
        id: '1',
        libelle: 'Digitalisation des services publics',
        typeReforme: 'administrative',
        natureReforme: 'organisationnelle',
        objectifGlobal: 'Moderniser les processus administratifs par la digitalisation',
        populationCible: 'Fonctionnaires et citoyens',
        couverture: 'nationale',
        structuresImpliquees: 'Ministères, Collectivités locales',
        structurePorteuse: 'Ministère de la Modernisation',
        dateDebut: '2024-01-01',
        dateFin: '2024-12-31',
        periodeExecution: '12 mois',
        status: 'en_cours',
        progression: 65
      },
      {
        id: '2',
        libelle: 'Réforme du système judiciaire',
        typeReforme: 'institutionnelle',
        natureReforme: 'legislative',
        objectifGlobal: 'Améliorer l\'efficacité et la transparence du système judiciaire',
        populationCible: 'Magistrats, avocats, justiciables',
        couverture: 'nationale',
        structuresImpliquees: 'Cours et tribunaux, Barreau',
        structurePorteuse: 'Ministère de la Justice',
        dateDebut: '2024-03-01',
        dateFin: '2025-02-28',
        periodeExecution: '24 mois',
        status: 'en_cours',
        progression: 35
      },
      {
        id: '3',
        libelle: 'Décentralisation administrative',
        typeReforme: 'structurelle',
        natureReforme: 'organisationnelle',
        objectifGlobal: 'Renforcer l\'autonomie des collectivités territoriales',
        populationCible: 'Collectivités locales, citoyens',
        couverture: 'nationale',
        structuresImpliquees: 'Régions, Départements, Communes',
        structurePorteuse: 'Ministère de l\'Intérieur',
        dateDebut: '2024-06-01',
        dateFin: '2026-05-31',
        periodeExecution: '36 mois',
        status: 'planifiee',
        progression: 15
      },
      {
        id: '4',
        libelle: 'Modernisation du système fiscal',
        typeReforme: 'administrative',
        natureReforme: 'reglementaire',
        objectifGlobal: 'Simplifier et moderniser la fiscalité',
        populationCible: 'Contribuables, entreprises',
        couverture: 'nationale',
        structuresImpliquees: 'Direction des impôts, Douanes',
        structurePorteuse: 'Ministère des Finances',
        dateDebut: '2023-09-01',
        dateFin: '2024-08-31',
        periodeExecution: '12 mois',
        status: 'terminee',
        progression: 100
      },
      {
        id: '5',
        libelle: 'Réforme de l\'éducation nationale',
        typeReforme: 'institutionnelle',
        natureReforme: 'legislative',
        objectifGlobal: 'Améliorer la qualité de l\'enseignement',
        populationCible: 'Élèves, enseignants, parents',
        couverture: 'nationale',
        structuresImpliquees: 'Écoles, Universités, CROUS',
        structurePorteuse: 'Ministère de l\'Éducation',
        dateDebut: '2024-09-01',
        dateFin: '2027-08-31',
        periodeExecution: '36 mois',
        status: 'planifiee',
        progression: 5
      }
    ];
    this.reformsSubject.next(mockReforms);
  }

  getStats(): Observable<any> {
    return this.stats$;
  }

  getReforms(): Observable<any[]> {
    return this.reforms$;
  }

  addReform(reform: any): void {
    const currentReforms = this.reformsSubject.value;
    const newReform = { ...reform, id: Date.now().toString() };
    this.reformsSubject.next([...currentReforms, newReform]);

    // Mettre à jour les statistiques
    this.updateStats();
  }

  updateReform(reform: any): void {
    const currentReforms = this.reformsSubject.value;
    const index = currentReforms.findIndex(r => r.id === reform.id);
    if (index !== -1) {
      currentReforms[index] = reform;
      this.reformsSubject.next([...currentReforms]);
    }
  }

  deleteReform(id: string): void {
    const currentReforms = this.reformsSubject.value;
    const filteredReforms = currentReforms.filter(r => r.id !== id);
    this.reformsSubject.next(filteredReforms);
    this.updateStats();
  }

  private updateStats(): void {
    const reforms = this.reformsSubject.value;
    const stats: any = {
      reformesEnAttente: reforms.filter(r => r.status === 'planifiee').length,
      totalReformes: reforms.length,
      reformesAdministratives: reforms.filter(r => r.typeReforme === 'administrative').length,
      reformesInstitutionnelles: reforms.filter(r => r.typeReforme === 'institutionnelle').length
    };
    this.statsSubject.next(stats);
  }
}
