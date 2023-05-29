import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { AdminComponent } from "./admin.component";
import { AuthGard } from "./auth.guard";
import { MaterialFeatures } from "./material.module";
import { ProductTableComponent } from "./productTable.component";
import { ProductEditorComponent } from "./productEditor.component";
import { OrderTableComponent } from "./orderTable.component";


let routing = RouterModule.forChild([
    { path: "auth", component: AuthComponent },
    {path: 'main', component: AdminComponent, canActivate: [AuthGard], 
    children: [
        {path: "products/:mode/:id", component: ProductEditorComponent},
        {path: "products/:mode", component: ProductEditorComponent},
        {path: "products", component: ProductTableComponent},
        {path: "orders", component: OrderTableComponent},
    ]},
    { path: "**", redirectTo: "auth" }
]);

@NgModule({
    imports: [CommonModule, FormsModule, routing, MaterialFeatures],
    declarations: [AuthComponent, AdminComponent, ProductTableComponent, ProductEditorComponent, OrderTableComponent],
   providers: [AuthGard]
})
export class AdminModule { }