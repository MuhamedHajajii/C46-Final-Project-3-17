import { Icon } from 'flowbite-angular/icon';
import { bars } from 'flowbite-angular/icon/outline/general';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarToggle,
} from 'flowbite-angular/navbar';

import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarToggle, Icon, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [provideIcons({ bars })],
})
export class NavbarComponent {}
