import { CommonModule } from '@angular/common';
import { Component,signal,inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { dateFormat,formatNumber,formatPrix } from '../../../../config';
import { lastValueFrom } from 'rxjs';
import { IncubationService } from '../../../services/incubation.service';

export interface Incubation {
  id:number;
  dateIncubation:string;
  nb:number;
  idEtatAtody:string;
  idLot:string;
}

@Component({
  selector: 'app-incubation-list',
  imports: [CommonModule,/*RouterLink*/],
  templateUrl: './incubation-list.html',
  styleUrl: './incubation-list.css',
})
export class IncubationListComponent implements OnInit {

  isLoading = signal(true);
  error = signal(false);
  errorMessage=signal('');
  dateFormat = dateFormat;
  formatNumber = formatNumber;
  formatPrix = formatPrix;
  routeAdd:string='/incubation/saisie';
  incubations = signal<Incubation[]>([]);
  incubationService = inject(IncubationService);

  async ngOnInit()  {
    await this.fetchData();
  }

  async fetchData(){
    this.isLoading.set(true);
    try {
      const response = await lastValueFrom(this.incubationService.fetchData());
      this.incubations.set(response.data.list);
    } catch (error:any) {
      this.error.set(false);
      this.errorMessage.set(error.message);
    }finally{
      this.isLoading.set(false);
    }
  }
  
}
