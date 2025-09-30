import { Routes } from '@angular/router';
import { Login } from './+pages/login/login';
import { AdminLogin } from './+pages/admins/admin-login/admin-login';
import { AdminNavigationComponent } from './+shares/admin-navigation/admin-navigation.component';
import { StudentNavigationComponent } from './+shares/student-navigation/student-navigation.component';
import { FacultyNavigationComponent } from './+shares/faculty-navigation/faculty-navigation.component';
import { RoleGuard } from './+guards/role-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'adminLogin', component: AdminLogin },

  {
    path: 'admins',
    component: AdminNavigationComponent,
    canActivate: [RoleGuard],
    data: { allowedRoles: ['Admin'] },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./+pages/admins/admin-dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  {
    path: 'students',
    component: StudentNavigationComponent,
    canActivate: [RoleGuard],
    data: { allowedRoles: ['Student'] },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./+pages/students/student-dashboard/student-dashboard.component').then(
            (m) => m.StudentDashboardComponent
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'prefix' },
    ],
  },
  {
    path: 'faculties',
    component: FacultyNavigationComponent,
    canActivate: [RoleGuard],
    data: { allowedRoles: ['Faculty'] },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./+pages/faculties/faculty-dashboard/faculty-dashboard.component').then(
            (m) => m.FacultyDashboardComponent
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'prefix' },
    ],
  },
  { path: '**', redirectTo: '/login' },
];
