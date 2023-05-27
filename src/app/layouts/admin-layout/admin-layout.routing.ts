import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { SettingsComponent } from "../../pages/settings/settings.component";
import { CompaniesComponent } from "../../pages/companies/companies.component";
import { ContactsComponent } from "../../pages/contacts/contacts.component";
import { DealsComponent } from "../../pages/deals/deals.component";
import { ProductsComponent } from "../../pages/products/products.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'settings',       component: SettingsComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'companies',      component: CompaniesComponent },
    { path: 'contacts',       component: ContactsComponent },
    { path: 'deals',          component: DealsComponent },
    { path: 'products',       component: ProductsComponent }
];
