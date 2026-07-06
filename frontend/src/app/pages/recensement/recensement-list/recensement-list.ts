import { CommonModule } from '@angular/common';
import { Component,signal,inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecensementService } from '../../../services/recensement.service';
import { lastValueFrom } from 'rxjs';
import {  dateFormat,formatNumber,formatPrix } from '../../../../config';
export interface RecensementAtody {
  id:number;
  dateRecensement:string;
  nbAtody:number;
  idLot:string;
}

@Component({
  selector: 'app-recensement-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './recensement-list.html',
  styleUrl: './recensement-list.css',
})
export class RecensementListComponent implements OnInit{

  isLoading = signal(true);
  errorMessage = signal('');
  error = signal(false);
  routeAdd:string = '/recensement/saisie';
  recensements= signal<RecensementAtody[]>([]);
  recensementService = inject(RecensementService);
  dateFormat = dateFormat;
  formatNumber = formatNumber;
  formatPrix = formatPrix;

  async ngOnInit(){
    await this.fetchData();
  }

  async fetchData(){
    this.isLoading.set(true);
    try {
      const response = await lastValueFrom(this.recensementService.fetchData());
      this.recensements.set(response.data.list);
      console.log(this.recensements);
    } catch (error:any) {
      this.error.set(true);
      this.errorMessage.set(error.message);
    }finally{
      this.isLoading.set(false);
    }
  }

}
