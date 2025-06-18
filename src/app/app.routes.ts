import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { HomeComponent } from './modules/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'about',
                loadComponent: () => import('./modules/about/about.component').then(m => m.AboutComponent)
            },
            {
                path: 'courses',
                loadComponent: () => import('./modules/courses/courses.component').then(m => m.CoursesComponent)
            },
            {
                path: 'courses/:id',
                loadComponent: () => import('./modules/courses/course-detail/course-detail.component').then(m => m.CourseDetailComponent)
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
