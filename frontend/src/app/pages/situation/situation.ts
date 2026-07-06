// situation/situation.component.ts
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { SituationService } from '../../services/situation.service';
import { dateFormat } from '../../../config';

// models/situation.ts
export interface SituationLot {
    idLot: number;
    NbAkohoTotal: number;
    PrixAchat: number;
    PrixSakafoTotal: number;
    PoidsMoyenTotal: number;
    NbAkohoMatyTotal: number;
    NbPondaisonMax:number;
    NbAtodyTotal: number;
    PerteAtody:number;
    PrixVenteTotal: number;
    PrixAtodyTotal:number;
    Recette:number;
    Depense:number;
    Benefice: number;
    Exist: boolean;
}

@Component({
    selector: 'app-situation',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './situation.html',
})
export class SituationComponent implements OnInit {

    private situationService = inject(SituationService);

    situations = signal<SituationLot[]>([]);
    isLoading   = signal(true);
    error       = signal(false);
    errorMessage = signal('');

    // Date du jour par défaut
    selectedDate = signal(new Date().toISOString().split('T')[0]);

    // Totaux calculés automatiquement
    totalVolailles    = computed(() => this.situations().reduce((s, l) => s + l.NbAkohoTotal, 0));
    totalPrixAchat    = computed(() => this.situations().reduce((s, l) => s + l.PrixAchat, 0));
    totalPrixAlim     = computed(() => this.situations().reduce((s, l) => s + l.PrixSakafoTotal, 0));
    totalPrixVente    = computed(() => this.situations().reduce((s, l) => s + l.PrixVenteTotal, 0));
    totalNbAtody      = computed(() => this.situations().reduce((s, l) => s + l.NbAtodyTotal, 0));
    totalBenefice     = computed(() => this.situations().reduce((s, l) => s + l.Benefice, 0));
    totalPerteAtody = computed(()=>this.situations().reduce((s,l)=> s + l.PerteAtody,0));
    totalRecette = computed(()=>this.situations().reduce((s,l)=> s + l.Recette,0));
    totalDepense = computed(()=>this.situations().reduce((s,l)=> s + l.Depense,0));
    totalAkohoMaty = computed(()=>this.situations().reduce((s,l)=> s + l.NbAkohoMatyTotal,0));

    dateFormat = dateFormat;

    async ngOnInit() {
        await this.fetchData(this.selectedDate());
    }

    async onDateChange(event: Event) {
        const input = event.target as HTMLInputElement;
        this.selectedDate.set(input.value);
        await this.fetchData(input.value);
    }

    async fetchData(date: string) {
        this.isLoading.set(true);
        try {
            const response = await lastValueFrom(this.situationService.fetchData(date));
            this.situations.set(response.data.list);
        } catch (err: any) {
            this.error.set(true);
            this.errorMessage.set(err.message);
        } finally {
            this.isLoading.set(false);
        }
    }

    formatPrix(value: number): string {
        return new Intl.NumberFormat('fr-FR').format(value) + ' Ar';
    }

    formatNumber(value: number): string {
        return new Intl.NumberFormat('fr-FR').format(value);
    }

    formatBenefice(value: number): string {
        return (value >= 0 ? '+' : '') + new Intl.NumberFormat('fr-FR').format(value) + ' Ar';
    }
}