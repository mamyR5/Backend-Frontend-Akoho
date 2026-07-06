import { Component, OnInit ,signal ,inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectComponent, SelectOption } from '../../../shared/select/select';
import { CommonModule } from '@angular/common';
import { RecensementService } from '../../../services/recensement.service';
import { LotService } from '../../../services/lot.service';
import { Lot } from '../../lot/lot-list/lot-list';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-recensement-create',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule,SelectComponent],
  templateUrl: './recensement-create.html',
})


export class RecensementCreateComponent implements OnInit{
  form!:FormGroup;
  isLoading = signal(false);
  isSubmitting=signal(false);
  recensementService = inject(RecensementService);
  lotService = inject(LotService);
  error = signal(false);
  errorMessage = signal('');
  successMessage=signal('');


  lotsFetch = signal<Lot[]>([]);
  lots = signal<SelectOption[]>([]);
  constructor(private fb:FormBuilder) {}

  async ngOnInit(){
    this.form = this.fb.group({
      DateRecensement: ['',Validators.required],
      NbAtody:[null,[Validators.required,Validators.min(1)]],
      idLot: ['',Validators.required],
    });

    await this.fetchLots();
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
        DateRecensement: this.form.value.DateRecensement,
        NbAtody: this.form.value.NbAtody,
        idLot: this.form.value.idLot,
      };

      await lastValueFrom(this.recensementService.create(data));
      this.successMessage.set('Recensement créé avec succès !');
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
