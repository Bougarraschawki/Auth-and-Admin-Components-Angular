import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from './store/store.module';

import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { CheckoutComponent } from './store/checkout/checkout.component';
import { CartDetailComponent } from './store/cartDetail/cartDetail.component';
import { StoreFirstGuard } from './storeFirst.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule,
    RouterModule.forRoot([
      { path: 'store', component: StoreComponent, canActivate: [StoreFirstGuard]},
      { path: 'cart', component: CartDetailComponent, canActivate: [StoreFirstGuard]},
      { path: 'checkout', component: CheckoutComponent, canActivate: [StoreFirstGuard] },
      {
        path: "admin",
        loadChildren: () => import("./admin/admin.module")
          .then(m => m.AdminModule),
        canActivate: [StoreFirstGuard]
      },
      { path: '**', redirectTo: '/store'},
    ]),
    BrowserAnimationsModule,
  ],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Step 2

