import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface NavChild {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-item.html',
})
export class NavItemComponent {
  @Input() label!: string;
  @Input() icon!: string;
  @Input() route: string = '';
  @Input() collapsed: boolean = false;
  @Output() collapseChanged = new EventEmitter<boolean>();
  @Input() children: NavChild[] = [];

  isOpen = false;



  toggle() {
    this.isOpen = !this.isOpen;
  }

  toggleSideBar() {
    if (this.collapsed) {
      // Sidebar fermé → on l'ouvre ET on ouvre le dropdown
      this.collapseChanged.emit(false);
      this.isOpen = true;
    } else {
      // Sidebar ouvert → on toggle juste le dropdown
      this.isOpen = !this.isOpen;
    }
  }
}