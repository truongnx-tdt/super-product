import { Routes } from '@angular/router';
import { RouteConstants } from './core/models/common';

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
        children: [
            {
                path: RouteConstants.LOGIN,
                loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: RouteConstants.SIGNUP,
                loadComponent: () => import('./modules/auth/signup/signup.component').then(m => m.SignupComponent)
            }
        ]
    },
    {
        path: RouteConstants.EMPTY,
        loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children: [
            {
                path: RouteConstants.HOME,
                loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: RouteConstants.ABOUT,
                loadComponent: () => import('./modules/about/about.component').then(m => m.AboutComponent)
            },
            {
                path: '**',
                loadComponent: () => import('./modules/errors/not-found/not-found.component').then(m => m.NotFoundComponent)
            }
        ]
    }
];
