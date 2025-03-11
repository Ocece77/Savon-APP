import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { PrivacyPolicyComponent } from '../pages/privacy-policy/privacy-policy.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'confidentialite', component: PrivacyPolicyComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
