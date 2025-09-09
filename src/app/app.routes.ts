import { Routes } from '@angular/router';
import { Login } from './+pages/login/login';
import { AdminLogin } from './+pages/admin-login/admin-login';

export const routes: Routes = [
    {path:'login' , component:Login},
    {path:'adminLogin' , component:AdminLogin},
    {path:'' , redirectTo:'/login' , pathMatch:'full'},
    {path:'**' , redirectTo:'/login'}
];
