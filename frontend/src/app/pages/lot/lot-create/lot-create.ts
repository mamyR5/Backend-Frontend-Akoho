import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectComponent, SelectOption } from '../../../shared/select/select';
import { InputComponent } from '../../../shared/input/input';
import { Race, RaceService } from '../../../services/race.service';
import { lastValueFrom } from 'rxjs';
import { LotService } from '../../../services/lot.service';


@Component({
  selector: 'app-lot-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectComponent],
  templateUrl: './lot-create.html',
})
export class LotCreateComponent implements OnInit {

  form!: FormGroup;
  isLoading = signal(false);
  error = signal(false);
  errorMessage = signal('');
  isSubmitting = signal(false);
  successMessage = signal('');
  raceService = inject(RaceService);
  racesFetch = signal<Race[]>([]);
  lotService = inject(LotService);


  races = signal<SelectOption[]>([]);

  constructor(private fb: FormBuilder) { }

  async ngOnInit() {

    this.form = this.fb.group({
      DateCreation: ['', Validators.required],
      AgeSemaine: [null, [Validators.required, Validators.min(0)]],
      NbAkoho: [null, [Validators.required, Validators.min(1)]],
      idRace: ['', Validators.required],
    });

    await this.fetchRaces();
  }

  async fetchRaces() {
    this.isLoading.set(true);
    try {
      const response = await lastValueFrom(this.raceService.fetchData());
      this.racesFetch.set(response.data.list);
      console.log(response.data.list);
      for (const race of this.racesFetch()) {
        this.races().push(
          {
            value: race.id,
            label: race.nom
          });
      }
      console.log(this.races());
    } catch (error: any) {
      this.error.set(true);
      this.errorMessage.set(error.message)
    } finally {
      this.isLoading.set(false);
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    this.error.set(false);

    try {
      const payload = {
        id: 0,                              // ← toujours 0 pour une création
        DateCreation: this.form.value.DateCreation,
        AgeSemaine: this.form.value.AgeSemaine,
        NbAkoho: this.form.value.NbAkoho,
        idRace: this.form.value.idRace,
      };

      await lastValueFrom(this.lotService.create(payload));

      this.successMessage.set('Lot enregistré avec succès !');
      this.form.reset();

    } catch (err: any) {
      this.error.set(true);
      this.errorMessage.set(err.message);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  isInvalid(field: string) {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }
}