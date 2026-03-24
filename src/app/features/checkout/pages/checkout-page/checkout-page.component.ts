import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../cart/services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent {
  // injected services
  private readonly fb = inject(FormBuilder);
  private readonly checkoutService = inject(CheckoutService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  activePaymentMethod = signal<'online' | 'cash'>('cash');

  cartId = this.activatedRoute.snapshot.paramMap.get('id')!;

  billingDetailsForm = this.fb.group({
    details: ['Test address'],
    phone: ['01000000000'],
    city: ['Cairo'],
    postalCode: [12345],
  });

  onBillingDetailSubmit(): void {
    console.log(this.billingDetailsForm.value);

    if (this.activePaymentMethod() === 'cash') {
      this.checkoutService.cashPayment(this.cartId, this.billingDetailsForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigateByUrl('/allorders');
        },
      });
    } else {
      this.checkoutService.onlinePayment(this.cartId, this.billingDetailsForm.value).subscribe({
        next: (response) => {
          console.log(response);
          window.location.assign(response.session.url);
        },
      });
    }
  }
}
