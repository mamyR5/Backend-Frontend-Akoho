import { CommonModule } from '@angular/common';
import { Component, OnInit ,signal , inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectComponent,SelectOption } from '../../../shared/select/select';
import { Lot } from '../../lot/lot-list/lot-list';
import { EtatAtody, EtatService } from '../../../services/etat.service';
import { LotService } from '../../../services/lot.service';
import { lastValueFrom } from 'rxjs';
import { IncubationService } from '../../../services/incubation.service';

@Component({
  selector: 'app-incubation-create',
  imports: [CommonModule,ReactiveFormsModule,SelectComponent],
  templateUrl: './incubation-create.html',
  styleUrl: './incubation-create.css',
})
export class IncubationCreateComponent implements OnInit{
  form!:FormGroup;
  isLoading = signal(false);
  error = signal(false);
  isSubmitting=signal(false);
  lotsFetch = signal<Lot[]>([]);
  etatFetch = signal<EtatAtody[]>([]);
  lotService = inject(LotService);
  etatService = inject(EtatService);
  incubationService = inject(IncubationService);
  errorMessage = signal('');
  successMessage=signal('');

  etats=signal<SelectOption[]>([]);

  lots = signal<SelectOption[]>([]);

  constructor(private fb:FormBuilder) {}

  async ngOnInit(){
    this.form = this.fb.group({
      DateIncubation: ['',Validators.required],
      Nb:[null,[Validators.required,Validators.min(1)]],
      idEtatAtody:['',Validators.required],
      idLot: ['',Validators.required],
    });

    await this.fetchLots();
    await this.fetchEtats();

  }

  async fetchLots(){
      this.isLoading.set(true);
      try {
        const response = await lastValueFrom(this.lotService.fetchData());
        this.lotsFetch.set(response.data.list);
        for(const lot of this.lotsFetch()){
          this.lots().push(
            {
              value: lot.id,
              label: `Lot ${lot.id}`
            }
          );
        }
      } catch (error:any) {
        this.error.set(true);
        this.errorMessage.set(error.message);
      }finally{
        this.isLoading.set(false);
      }
    }  

     async fetchEtats(){
      this.isLoading.set(true);
      try {
        const response = await lastValueFrom(this.etatService.fetchData());
        this.etatFetch.set(response.data.list);
        for(const etat of this.etatFetch()){
          this.etats().push(
            {
              value: etat.id,
              label: etat.libelle
            }
          );
        }
      } catch (error:any) {
        this.error.set(true);
        this.errorMessage.set(error.message);
      }finally{
        this.isLoading.set(false);
      }
    } 



  async onSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    this.error.set(false);

    try{
      const data = {
        id:0,
        DateIncubation: this.form.value.DateIncubation,
        Nb: this.form.value.Nb,
        idEtatAtody: this.form.value.idEtatAtody,
        idLot:this.form.value.idLot,
      };

      await lastValueFrom(this.incubationService.create(data));
      this.successMessage.set("Cas d'incubation créé avec succès !");
      this.form.reset();

    }catch(error:any){
      this.error.set(true);
      const apiError = error?.error?.error?.message;
      const fallback = error?.message;
      this.errorMessage.set(apiError || fallback);
    }finally{
      this.isSubmitting.set(false);
    }

  }

  isInvalid(field: string) {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

}
