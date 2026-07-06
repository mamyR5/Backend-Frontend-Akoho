import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { lastValueFrom } from 'rxjs';
import { LotService } from '../../../services/lot.service';
import { extractData } from '../../../utils/app-utils';
import { ApiResponse } from '../../../models/api-respone';
import { dateFormat,formatNumber,formatPrix } from '../../../../config';

export interface Lot {
  id: number;
  dateCreation: string;
  ageSemaine: number | null;
  nbAkoho: number;
  idRace: string;
}


@Component({
  selector: 'app-lot-liste',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lot-list.html',
})
export class LotListComponent implements OnInit {

  routeAdd: string = '/lot/saisie';
  isLoading = signal(true);
  errorMessage = signal('');
  error = signal(false);
  dateFormat = dateFormat;
  formatNumber = formatNumber;
  formatPrix = formatPrix;
  lotService = inject(LotService);

  /*lots: Lot[] = [
    { id: 1, DateCreation: '2025-01-10', AgeSemaine: 2,    NbAkoho: 500, PrixAchat: 250000, race: 'Poulet de chair' },
    { id: 2, DateCreation: '2025-02-15', AgeSemaine: 0, NbAkoho: 200, PrixAchat: 180000, race: 'Poule pondeuse'  },
    { id: 3, DateCreation: '2025-03-01', AgeSemaine: 4,    NbAkoho: 350, PrixAchat: 320000, race: 'Pintade'         },
  ];*/

  lots=signal<Lot[]>([]);

  async ngOnInit() {
    await this.fetchData();
  }

  async fetchData() {
    this.isLoading.set(true);
    try {
      console.log('2- avatn requête');
      const response = await lastValueFrom(this.lotService.fetchData());
      console.log('3- réponse reçu');
      this.lots.set(response.data.list);
      console.log(this.lots);
      console.log('4- sett-er na ilay liste lot');
    } catch (error: any) {
      this.error.set(true);
      this.errorMessage.set(error.message);
      console.log(this.errorMessage);
    } finally {
      console.log('4- sett-er na ho false ilay isLoading');
      this.isLoading.set(false);
    }

  }

  
}