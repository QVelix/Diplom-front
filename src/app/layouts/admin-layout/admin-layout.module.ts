import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from "../../pages/settings/settings.component";
import { AuthLayoutModule } from "../auth-layout/auth-layout.module";
import { CompaniesComponent } from "../../pages/companies/companies.component";
import { ContactsComponent } from "../../pages/contacts/contacts.component";
import { DealsComponent } from "../../pages/deals/deals.component";
import { ProductsComponent } from "../../pages/products/products.component";
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        ClipboardModule,
        AuthLayoutModule,
        ReactiveFormsModule
    ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    SettingsComponent,
    CompaniesComponent,
    ContactsComponent,
    DealsComponent,
    ProductsComponent
  ]
})

export class AdminLayoutModule {}
