import { RenderMode, ServerRoute } from '@angular/ssr';
import { RouteConstants } from './core/models/common';

export const serverRoutes: ServerRoute[] = [
  {
    path: RouteConstants.EMPTY,
    renderMode: RenderMode.Server
  },
  {
    path: 'auth/login',
    renderMode: RenderMode.Client
  },
  {
    path: 'auth/signup',
    renderMode: RenderMode.Client
  },
  {
    path: RouteConstants.ABOUT,
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
    status: 301,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    },
  }
];
