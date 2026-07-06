import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Pour afficher le contenu
import { SidebarComponent } from '../../components/sidebar/sidebar'; // Pour la sidebar
import { HeaderComponent } from '../../components/header/header';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent,HeaderComponent], // <--- On importe les deux
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayoutComponent {}