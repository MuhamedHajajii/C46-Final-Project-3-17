import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { AuthMethodSelectorComponent } from '../../components/auth-method-selector/auth-method-selector.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [RegisterFormComponent, AuthMethodSelectorComponent, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {}
