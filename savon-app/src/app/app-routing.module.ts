import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { CalculateurComponent } from './pages/calculateur/calculateur.component';
import { RecettesComponent } from './pages/recettes/recettes.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'calculateur', component: CalculateurComponent },
  { path: 'recettes', component: RecettesComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'inscription', component: SigninComponent },



  { path: 'confidentialite', component: PrivacyPolicyComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
