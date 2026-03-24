import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FooterComponent } from './core/components/footer/footer.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { WebsiteInfoBannerComponent } from './shared/components/website-info-banner/website-info-banner.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    NgxSpinnerModule,
    FooterComponent,
    RouterOutlet,
    WebsiteInfoBannerComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
