import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'number' | 'date' = 'text';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() suffix = '';        // ex: "Ar", "kg", "sem."
  @Input() required = false;
  @Input() invalid = false;
  @Input() errorMessage = '';

  value: any = null;
  isDisabled = false;
  isFocused = false;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void { this.isDisabled = disabled; }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    // Pour number, on convertit en number — sinon Angular reçoit une string
    const val = this.type === 'number'
      ? (target.value === '' ? null : Number(target.value))
      : target.value;
    this.value = val;
    this.onChange(val);
  }

  onFocus() {
    this.isFocused = true;
    this.onTouched();
  }

  onBlur() {
    this.isFocused = false;
  }
}