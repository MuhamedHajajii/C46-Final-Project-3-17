import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService, IAuthResponse } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Stored_Keys } from '../../../../core/constants/stored-keys';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  // injected services
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  redirectUrl = this.activatedRoute.snapshot.queryParamMap.get('redirectUrl');

  errorMessage = signal('');

  isLoading = signal<boolean>(false);

  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  onLoginSubmit(): void {
    if (this.isLoading()) return;

    console.log(this.loginForm.value);
    this.errorMessage.set('');
    this.isLoading.set(true);
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.onSuccessResponse(response);
      },
      error: (error: HttpErrorResponse) => {
        this.onFailedResponse(error);
      },
    });
  }

  onSuccessResponse(response: IAuthResponse): void {
    console.log(response);
    this.isLoading.set(false);
    localStorage.setItem(Stored_Keys.token, response.token);
    this.authService.refreshToken.update((value) => value + 1);
    this.router.navigateByUrl(this.redirectUrl ? `/${this.redirectUrl}` : '/');
  }

  onFailedResponse(error: HttpErrorResponse): void {
    console.log(error.error.message);
    this.errorMessage.set(error.error.message);
    this.isLoading.set(false);
  }
}
