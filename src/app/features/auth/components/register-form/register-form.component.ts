import { JsonPipe } from '@angular/common';
import { Component, inject, isSignal, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule, RxwebValidators } from '@rxweb/reactive-form-validators'; // <-- #2 import module

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, RxReactiveFormsModule, JsonPipe],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private readonly fb = inject(FormBuilder);

  requiredMessage = 'this field is required';

  registerForm = this.fb.group({
    name: ['', [RxwebValidators.required({ message: this.requiredMessage })]],
    email: [
      '',
      [
        RxwebValidators.required({ message: this.requiredMessage }),
        RxwebValidators.email({ message: 'not valid email' }),
      ],
    ],
    password: [
      '',
      [
        RxwebValidators.required({ message: this.requiredMessage }),
        RxwebValidators.password({
          validation: {
            upperCase: true,
            lowerCase: true,
            specialCharacter: true,
            digit: true,
            minLength: 8,
          },
          message: 'not valid password',
        }),
      ],
    ],
    rePassword: [
      '',
      [
        RxwebValidators.required({ message: this.requiredMessage }),
        RxwebValidators.compare({ fieldName: 'password' }),
      ],
    ],
    phone: ['', [RxwebValidators.required({ message: this.requiredMessage })]],
  });

  ngOnInit(): void {
    this.validateText();
  }

  onRegisterSubmit(): void {
    console.log(this.registerForm);
    console.log(this.registerForm.value);
  }

  score = signal(0);
  validationText = signal('Weak');
  validateText(): void {
    this.registerForm.get('password')?.valueChanges.subscribe((value) => {
      let score = 0;

      let userInput = value as string;

      if (/[a-z]/.test(userInput)) score++; // lowercase
      if (/[A-Z]/.test(userInput)) score++; // uppercase
      if (/\d/.test(userInput)) score++; // number
      if (/[@$!%*?&]/.test(userInput)) score++; // special char
      if (userInput?.length >= 8) score++; // length

      console.log(userInput);
      console.log(this.score());
      this.score.set(score);
      if (score < 2) {
        this.validationText.set('Week');
      }
      if (score <= 3 && score >= 2) {
        this.validationText.set('good');
      }
      if (score === 5) {
        this.validationText.set('Excellent');
      }
    });
  }

  get strengthColor(): string {
    switch (this.score()) {
      case 0:
      case 1:
        return 'red';
      case 2:
        return 'orange';
      case 3:
        return 'yellow';
      case 4:
        return 'lightgreen';
      case 5:
        return 'green';
      default:
        return 'gray';
    }
  }
}
