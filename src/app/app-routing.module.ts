import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './features/home/container/components/home/home.component';
import { LoginComponent } from './features/login/container/components/login/login.component';
import { RegisterComponent } from './features/login/container/components/register/register.component';
import { AuthGuard } from './features/login/container/guard/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
