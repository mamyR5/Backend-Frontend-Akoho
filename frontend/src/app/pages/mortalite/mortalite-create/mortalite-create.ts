import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectComponent, SelectOption } from '../../../shared/select/select';
import { MortaliteService } from '../../../services/mortalite.service';
import { LotService } from '../../../services/lot.service';
import { Lot } from '../../lot/lot-list/lot-list';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-mortalite-create',
  imports: [CommonModule, ReactiveFormsModule, SelectComponent],
  templateUrl: './mortalite-create.html',
  styleUrl: './mortalite-create.css',
})
export class MortaliteCreateComponent implements OnInit {
  form!: FormGroup;
  isLoading = signal(false);
  isSubmitting = signal(false);
  errorMessage = signal('');
  error = signal(false);
  successMessage = signal('');
  mortaliteService = inject(MortaliteService);
  lotService = inject(LotService);
  lotsFetch = signal<Lot[]>([]);

  lots = signal<SelectOption[]>([]);

  constructor(private fb: FormBuilder) { }

  async ngOnInit() {
    this.form = this.fb.group({
      DateNahafatesana: ['', Validators.required],
      NbMaty: [null, [Validators.required, Validators.min(1)]],
      idLot: ['', Validators.required],
    });
    await this.fetchLots();
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.error.set(false);

    try {
      const data = {
        id: 0,
        DateNahafatesana: this.form.value.DateNahafatesana,
        NbMaty: this.form.value.NbMaty,
        idLot: this.form.value.idLot,
      };

      await lastValueFrom(this.mortaliteService.create(data));
      this.successMessage.set('Cas de mortalité créé avec succès !');
      this.form.reset();

    } catch (error: any) {
      this.error.set(true);
      const apiError = error?.error?.error?.message;
      const fallback = error?.message;
      this.errorMessage.set(apiError || fallback);
    } finally {
      this.isSubmitting.set(false);
    }

  }

  isInvalid(field: string) {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  async fetchLots() {
    this.isLoading.set(true);
    try {
      const response = await lastValueFrom(this.lotService.fetchData());
      this.lotsFetch.set(response.data.list);
      for (const lot of this.lotsFetch()) {
        this.lots().push(
          {
            value: lot.id,
            label: `Lot ${lot.id}`
          }
        );
      }
    } catch (error: any) {
      this.error.set(true);
      this.errorMessage.set(error.message);
    } finally {
      this.isLoading.set(false);
    }
  }
}
