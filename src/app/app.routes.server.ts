import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'courses/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
       const ids: string[] = [
        'custom-id',
        'custom-id1',
        'etc.'
        ];
       return ids.map(id => ({ id }));
   },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
