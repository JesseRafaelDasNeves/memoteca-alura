import { AbstractControl } from '@angular/forms';

export function maiusculoValidators(control: AbstractControl) {
  const autoria = control.value as string;
  if (autoria !== autoria?.toUpperCase()) {
    return {maiusculo: true}
  }
  return null;
}
