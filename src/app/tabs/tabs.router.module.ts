import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'balanco',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../balanco/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'caixa',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../caixa/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'produtos',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../produtos/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'minha-conta',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../minha-conta/minha-conta.module').then(m => m.MinhaContaPageModule)
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
