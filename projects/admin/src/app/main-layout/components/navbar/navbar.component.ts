import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { SharedModule } from '../../../shared/shared/shared.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,MaterialModule,SharedModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

}
