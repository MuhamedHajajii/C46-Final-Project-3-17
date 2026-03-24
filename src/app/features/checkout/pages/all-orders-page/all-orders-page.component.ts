import { Component, inject, OnInit, signal } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Stored_Keys } from '../../../../core/constants/stored-keys';
import { DatePipe } from '@angular/common';
import { LoadingDataSpinnerComponent } from '../../../../shared/components/loading-data-spinner/loading-data-spinner.component';

@Component({
  selector: 'app-all-orders-page',
  imports: [DatePipe, LoadingDataSpinnerComponent],
  templateUrl: './all-orders-page.component.html',
  styleUrl: './all-orders-page.component.css',
})
export class AllOrdersPageComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);
  isLoading = signal(false);
  allOrders = signal<any[]>([]);

  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders(): void {
    this.isLoading.set(true);
    this.ordersService.getUserOrders(localStorage.getItem(Stored_Keys.userId)!).subscribe({
      next: (response: any) => {
        console.log(response);
        this.isLoading.set(false);
        this.allOrders.set(response);
      },
    });
  }

  // helper methods (optional)
  getTotalItems(order: any): number {
    return order.cartItems.reduce((acc: number, item: any) => acc + item.count, 0);
  }
}
