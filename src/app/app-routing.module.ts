import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./signin/signin.module').then((m) => m.SigninPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },

  {
    path: 'landing',
    loadChildren: () =>
      import('./landing/landing.module').then((m) => m.LandingPageModule),
  },
  {
    path: 'transaction',
    loadChildren: () =>
      import('./transaction/transaction.module').then(
        (m) => m.TransactionPageModule
      ),
  },

  {
    path: 'transaction-confirm',
    loadChildren: () =>
      import('./transaction-confirm/transaction-confirm.module').then(
        (m) => m.TransactionConfirmPageModule
      ),
  },
  {
    path: 'transaction-selectaddress',
    loadChildren: () =>
      import(
        './transaction-selectaddress/transaction-selectaddress.module'
      ).then((m) => m.TransactionSelectaddressPageModule),
  },
  {
    path: 'transaction-setaddress',
    loadChildren: () =>
      import('./transaction-setaddress/transaction-setaddress.module').then(
        (m) => m.TransactionSetaddressPageModule
      ),
  },
  {
    path: 'transaction-selectpet',
    loadChildren: () =>
      import('./transaction-selectpet/transaction-selectpet.module').then(
        (m) => m.TransactionSelectpetPageModule
      ),
  },
  {
    path: 'transaction-cukur-kucing',
    loadChildren: () =>
      import('./transaction-cukur-kucing/transaction-cukur-kucing.module').then(
        (m) => m.TransactionCukurKucingPageModule
      ),
  },
  {
    path: 'transaction-service-cat',
    loadChildren: () =>
      import('./transaction-service-cat/transaction-service-cat.module').then(
        (m) => m.TransactionServiceCatPageModule
      ),
  },
  {
    path: 'transaction-service-anjing',
    loadChildren: () =>
      import(
        './transaction-service-anjing/transaction-service-anjing.module'
      ).then((m) => m.TransactionServiceAnjingPageModule),
  },
  {
    path: 'transaction-service-anjing-haircut',
    loadChildren: () =>
      import(
        './transaction-service-anjing-haircut/transaction-service-anjing-haircut.module'
      ).then((m) => m.TransactionServiceAnjingHaircutPageModule),
  },
  {
    path: 'order-success',
    loadChildren: () =>
      import('./order-success/order-success.module').then(
        (m) => m.OrderSuccessPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
