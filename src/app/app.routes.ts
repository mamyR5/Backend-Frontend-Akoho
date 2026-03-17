import { Routes } from '@angular/router';
import { SituationComponent } from './pages/situation/situation';
import { LotCreateComponent } from './pages/lot/lot-create/lot-create';
import { LotListComponent } from './pages/lot/lot-list/lot-list';
import { RecensementListComponent } from './pages/recensement/recensement-list/recensement-list';
import { RecensementCreateComponent } from './pages/recensement/recensement-create/recensement-create';
import { MortaliteCreateComponent } from './pages/mortalite/mortalite-create/mortalite-create';
import { MortaliteListComponent } from './pages/mortalite/mortalite-list/mortalite-list';
import { IncubationCreateComponent } from './pages/incubation/incubation-create/incubation-create';
import { IncubationListComponent } from './pages/incubation/incubation-list/incubation-list';
export const routes: Routes = [
    {
        path: '',
        component: SituationComponent,
    },
    {
        path:'lot',
        children:[
            {
                path:'saisie',
                component:LotCreateComponent
            },
            {
                path:'liste',
                component:LotListComponent
            }
        ]
    },
    {
        path:'recensement',
        children:[
            {
                path:'saisie',
                component:RecensementCreateComponent
            },
            {
                path:'liste',
                component:RecensementListComponent
            }
        ]
    },
    {
        path:'mortalite',
        children:[
            {
                path:'saisie',
                component:MortaliteCreateComponent
            },
            {
                path:'liste',
                component:MortaliteListComponent
            }
        ]
    },
     {
        path:'incubation',
        children:[
            {
                path:'saisie',
                component:IncubationCreateComponent
            },
            {
                path:'liste',
                component:IncubationListComponent
            }
        ]
    }
];
