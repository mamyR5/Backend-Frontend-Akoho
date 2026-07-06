import { CommonModule } from '@angular/common';
import { Component,inject,OnInit,signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MortaliteService } from '../../../services/mortalite.service';
import { lastValueFrom } from 'rxjs';
import { dateFormat,formatNumber,formatPrix } from '../../../../config';


export interface AkohoMaty {
  id:number;
  dateNahafatesana:string;
  nbMaty:number;
  idLot:string;
}

@Component({
  selector: 'app-mortalite-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './mortalite-list.html',
  styleUrl: './mortalite-list.css',
})
export class MortaliteListComponent implements OnInit {

  routeAdd:string = '/mortalite/saisie';
  isLoading  = signal(true);
  error = signal(false);
  errorMessage = signal('');
  mortaliteService = inject(MortaliteService);
  dateFormat = dateFormat;
  formatNumber = formatNumber;

  deces=signal<AkohoMaty[]>([]);

  async ngOnInit(){
    await this.fetchData();
  }
  
  async fetchData(){
    this.isLoading.set(true);
    try {
      const response = await lastValueFrom(this.mortaliteService.fetchData());
      this.deces.set(response.data.list);
      console.log(this.deces);
    } catch (error: any) {
      this.error.set(true);
      this.errorMessage.set(error.message);
    }finally{
      this.isLoading.set(false);
    }
  }

}
