import { Component } from '@angular/core';
import { AuthMethodSelectorComponent } from '../../components/auth-method-selector/auth-method-selector.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent, AuthMethodSelectorComponent, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {}
