import { Component } from '@angular/core';
import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-name.util',
  imports: [],
  templateUrl: './name.util.html',
  styleUrl: './name.util.scss',
})
export class NameUtil {}

export function splitFullName(fullName: string): {
  firstname: string;
  lastname: string;
} {
  const parts = fullName.trim().split(/\s+/);

  return {
    firstname: parts[0] ?? '',
    lastname: parts.slice(1).join(' ')
  };
}

export function fullNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value ?? '').trim();

    if (!value) {
      return null;
    }

    const { firstname, lastname } = splitFullName(value);

    if (!lastname) {
      return { fullName: true };
    }

    if (firstname.length < 3 || lastname.length < 3) {
      return { nameTooShort: true };
    }

    return null;
  };
}
