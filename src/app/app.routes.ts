import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent)
            }
        ]
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'signup',
                loadComponent: () => import('./modules/auth/signup/signup.component').then(m => m.SignupComponent)
            }
        ]
    }
];
