import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {ClickOutsideDirective} from '../click-outside';
export interface SelectOption {
  value: any;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule,ClickOutsideDirective],
  templateUrl: './select.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Sélectionner...';
  @Input() invalid:boolean = false;

  isOpen = false;
  selectedOption: SelectOption | null = null;
  isDisabled = false;

  // Callbacks imposés par ControlValueAccessor
  private onChange = (value: any) => {};
  private onTouched = () => {};

  // Angular appelle ça quand le formControl change depuis l'extérieur
  writeValue(value: any): void {
    this.selectedOption = this.options.find(o => o.value === value) ?? null;
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void { this.isDisabled = disabled; }

  toggle() {
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
      this.onTouched();
    }
  }

  select(option: SelectOption) {
    this.selectedOption = option;
    this.onChange(option.value);
    this.isOpen = false;
  }

  close() {
    this.isOpen = false;
  }
}