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
    path: 'order-grooming',
    loadChildren: () =>
      import('./order-grooming/order-grooming.module').then(
        (m) => m.OrderGroomingPageModule
      ),
  },
  {
    path: 'list-address',
    loadChildren: () =>
      import('./list-address/list-address.module').then(
        (m) => m.ListAddressPageModule
      ),
  },
  {
    path: 'list-addressadd',
    loadChildren: () =>
      import('./list-addressadd/list-addressadd.module').then(
        (m) => m.ListAddressaddPageModule
      ),
  },
  {
    path: 'order-selectpet',
    loadChildren: () =>
      import('./order-selectpet/order-selectpet.module').then(
        (m) => m.OrderSelectpetPageModule
      ),
  },
  {
    path: 'order-selectpetmodal',
    loadChildren: () =>
      import('./order-selectpetmodal/order-selectpetmodal.module').then(
        (m) => m.OrderSelectpetmodalPageModule
      ),
  },
  {
    path: 'order-selectpackage',
    loadChildren: () =>
      import('./order-selectpackage/order-selectpackage.module').then(
        (m) => m.OrderSelectpackagePageModule
      ),
  },
  {
    path: 'order-selectpackagemodal',
    loadChildren: () =>
      import('./order-selectpackagemodal/order-selectpackagemodal.module').then(
        (m) => m.OrderSelectpackagemodalPageModule
      ),
  },
  {
    path: 'order-selectdatetime',
    loadChildren: () =>
      import('./order-selectdatetime/order-selectdatetime.module').then(
        (m) => m.OrderSelectdatetimePageModule
      ),
  },
  {
    path: 'order-selectpayment',
    loadChildren: () => import('./order-selectpayment/order-selectpayment.module').then( m => m.OrderSelectpaymentPageModule)
  },
  {
    path: 'order-selectpaymentmodal',
    loadChildren: () => import('./order-selectpaymentmodal/order-selectpaymentmodal.module').then( m => m.OrderSelectpaymentmodalPageModule)
  },
  {
    path: 'order-success',
    loadChildren: () => import('./order-success/order-success.module').then( m => m.OrderSuccessPageModule)
  },
  {
    path: 'order-servicecat',
    loadChildren: () => import('./order-servicecat/order-servicecat.module').then( m => m.OrderServicecatPageModule)
  },
  {
    path: 'order-servicedog',
    loadChildren: () => import('./order-servicedog/order-servicedog.module').then( m => m.OrderServicedogPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },  {
    path: 'transaction',
    loadChildren: () => import('./transaction/transaction.module').then( m => m.TransactionPageModule)
  },
  {
    path: 'transaction1',
    loadChildren: () => import('./transaction1/transaction1.module').then( m => m.Transaction1PageModule)
  },
  {
    path: 'transaction2',
    loadChildren: () => import('./transaction2/transaction2.module').then( m => m.Transaction2PageModule)
  },
  {
    path: 'transaction3',
    loadChildren: () => import('./transaction3/transaction3.module').then( m => m.Transaction3PageModule)
  },
  {
    path: 'transaction1modal',
    loadChildren: () => import('./transaction1modal/transaction1modal.module').then( m => m.Transaction1modalPageModule)
  },
  {
    path: 'transaction-confirm',
    loadChildren: () => import('./transaction-confirm/transaction-confirm.module').then( m => m.TransactionConfirmPageModule)
  },
  {
    path: 'transaction-selectaddress',
    loadChildren: () => import('./transaction-selectaddress/transaction-selectaddress.module').then( m => m.TransactionSelectaddressPageModule)
  },
  {
    path: 'transaction-setaddress',
    loadChildren: () => import('./transaction-setaddress/transaction-setaddress.module').then( m => m.TransactionSetaddressPageModule)
  },
  {
    path: 'transaction-selectpet',
    loadChildren: () => import('./transaction-selectpet/transaction-selectpet.module').then( m => m.TransactionSelectpetPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
