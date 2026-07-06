import { NavChild } from '../../shared/nav-item/nav-item';

import { Component ,signal } from '@angular/core';
import { NavItemComponent } from '../../shared/nav-item/nav-item';

export interface NavGroup {
  title: string;
  items: {
    label: string;
    exact?: boolean;
    route?: string;
    icon: string;
    children: NavChild[];
  }[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NavItemComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {

  isCollapsed = signal(false);

  toggle(){
    this.isCollapsed.update(v => !v);
  }

  navGroups: NavGroup[] = [
    {
      title: 'Générale',
      items: [
        {
          label: 'Situation',
          exact: true,
          route: '/',
          icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
          children: [] as NavChild[]
        }
      ]
    },
    {
      title: 'Akoho',
      items: [
        {
          label: 'Lot',
          icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
          children: [
            {
              label: 'Saisie',
              route: '/lot/saisie',
              icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
            },
            {
              label: 'Liste',
              route: '/lot/liste',
              icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6m-6 4h6'
            }
          ]
        },
        {
          label: 'Mortalité',
          icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
          children: [
            {
              label: 'Saisie',
              route: '/mortalite/saisie',
              icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
            },
            {
              label: 'Liste',
              route: '/mortalite/liste',
              icon: 'M3 10h18M3 14h18M10 6h4M10 18h4M3 6h4M3 18h4M17 6h4M17 18h4'
            }
          ]
        }
      ]

    },
    {
      title: 'Atody',
      items: [
        {
          label: 'Recensement',
          icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
          children: [
            {
              label: 'Saisie',
              route: '/recensement/saisie',
              icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
            },
            {
              label: 'Liste',
              route: '/recensement/liste',
              icon: 'M4 6h16M4 10h16M4 14h16M4 18h16'
            }
          ]
        },
        {
          label: 'Incubations',
          icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
          children: [
            /*{
              label: 'Saisie',
              route: '/incubation/saisie',
              icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
            },*/
            {
              label: 'Liste',
              route: '/incubation/liste',
              icon: 'M4 6h16M4 10h16M4 14h16M4 18h16'
            }
          ]
        }
      ]
    }
  ];
}