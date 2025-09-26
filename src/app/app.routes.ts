import { Routes } from '@angular/router';
import { Login } from './+pages/login/login';
import { AdminLogin } from './+pages/admins/admin-login/admin-login';
import { AdminNavigationComponent } from './+shares/admin-navigation/admin-navigation.component';
import { AdminDashboardComponent } from './+pages/admins/admin-dashboard/admin-dashboard.component';
import { StudentNavigationComponent } from './+shares/student-navigation/student-navigation.component';
import { StudentDashboardComponent } from './+pages/students/student-dashboard/student-dashboard.component';
import { FacultyNavigationComponent } from './+shares/faculty-navigation/faculty-navigation.component';
import { FacultyDashboardComponent } from './+pages/faculties/faculty-dashboard/faculty-dashboard.component';
import { RoleGuard } from './+guards/role-guard';


export const routes: Routes = [
    {path:'login' , component:Login},
    {path:'adminLogin' , component:AdminLogin },
    
    {path:'admins' , component:AdminNavigationComponent ,  canActivate: [RoleGuard], data: { allowedRoles: ['Admin'] } , children:[
        {path:'dashboard' , component:AdminDashboardComponent },
        {path:'', redirectTo:'dashboard' , pathMatch:'prefix'},
        {path:'**', redirectTo:'dashboard' , pathMatch:'full'}
    ]},
    
    {path:'students' , component:StudentNavigationComponent ,   canActivate: [RoleGuard], data: { allowedRoles: ['Student'] } , children:[
        {path:'dashboard' , component:StudentDashboardComponent},
        {path:'', redirectTo:'dashboard' , pathMatch:'prefix'},
        {path:'**', redirectTo:'dashboard' , pathMatch:'prefix'}
    ]},
    {path:'faculties' , component:FacultyNavigationComponent ,  canActivate: [RoleGuard], data: { allowedRoles: ['Faculty'] } , children:[
        {path:'dashboard' , component:FacultyDashboardComponent},
        {path:'', redirectTo:'dashboard' , pathMatch:'prefix'},
        {path:'**', redirectTo:'dashboard' , pathMatch:'prefix'}
    ]},
    {path:'' , redirectTo:'/login' , pathMatch:'full'},
    {path:'**' , redirectTo:'/login'},
];
