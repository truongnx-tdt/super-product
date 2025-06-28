import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

// Load đúng file env theo NODE_ENV
const envFile = process.env['NODE_ENV'] === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Bây giờ bạn có thể dùng
const apiUrl = process.env['apiUrl'];
console.log('[SSR] API_URL:', envFile + ' -> ' + apiUrl);

if (!apiUrl) {
  throw new Error('API URL is not defined in environment variables');
}
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */
app.use(express.json());
app.use(cookieParser());

app.post('/login', async (req, res) => {
  try {
    const apiRes = await fetch(`${apiUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body) ,
    });

    const data = await apiRes.json();
    if (data.status === 200) {
      // Set HTTP-only cookies
      res.cookie('accessToken', data.data.accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        maxAge: 5 * 60 * 1000 // 5 phút
      });
      res.cookie('refreshToken', data.data.refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
      });
    }
    data.data = null;
    res.json(data);
  }
  catch (err) {
    res.status(500).json({ error: 'Login proxy failed', details: err });
  }
});


app.all('/tdt/auth/*', async (req, res) => {
  const targetPath = req.originalUrl.replace(/^\/tdt\/auth/, '');
  const accessToken = req.cookies['accessToken'];
  const refreshToken = req.cookies['refreshToken'];

  const response = await fetch(`${apiUrl}${targetPath}`, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
    },
    body: ['POST', 'PUT', 'PATCH'].includes(req.method) ? JSON.stringify(req.body) : undefined
  });

  if (response.status === 401 && refreshToken) {
    // call get token refresh API
    const refreshRes = await fetch(`${apiUrl}/api/token-refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: accessToken,
        refreshToken: refreshToken
      })
    });

    const refreshData = await refreshRes.json();

    if (refreshData.status === 200) {
      // cleare cookies if logout 
      if (targetPath.includes('/logout')) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(200).json({ message: 'Logged out successfully' });
      }

      // Set lại cookie mới
      res.cookie('accessToken', refreshData.data.accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        maxAge: 5 * 60 * 1000
      });

      res.cookie('refreshToken', refreshData.data.refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
      });

      // Gọi lại API gốc với token mới
      const retry = await fetch(`${apiUrl}${targetPath}`, {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshData.data.accessToken}`
        },
        body: ['POST', 'PUT', 'PATCH'].includes(req.method) ? JSON.stringify(req.body) : undefined
      });

      const retryData = await retry.json();
      return res.status(retry.status).json(retryData);
    } else {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.status(401).json({ error: 'Session expired, please login again.' });
    }
  }
  // Access token vẫn hợp lệ
  const data = await response.json();
  if (targetPath.includes('logout')) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
  }
  return res.status(response.status).json(data);
});

app.all('/tdt/guest/*', async (req, res) => {
  const targetPath = req.originalUrl.replace(/^\/tdt\/guest/, '');
  const response = await fetch(`${apiUrl}${targetPath}`, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: ['POST', 'PUT', 'PATCH'].includes(req.method) ? JSON.stringify(req.body) : undefined
  });
  const data = await response.json();
  return res.status(response.status).json(data);
});



/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
