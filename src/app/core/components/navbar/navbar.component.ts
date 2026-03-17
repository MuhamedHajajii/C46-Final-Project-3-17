import { Icon } from 'flowbite-angular/icon';
import { bars } from 'flowbite-angular/icon/outline/general';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarToggle,
} from 'flowbite-angular/navbar';

import { Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
@Component({
  selector: 'app-navbar',
  imports: [Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarToggle, Icon, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [provideIcons({ bars })],
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);

  userToken = this.authService.userToken;
}
