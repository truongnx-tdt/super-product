import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import dotenv from 'dotenv';
import path from 'path';

// Load đúng file env theo NODE_ENV
const envFile = process.env['NODE_ENV'] === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const apiUrl = process.env['apiUrl'];
if (!apiUrl) {
    throw new Error('API URL is not defined in environment variables');
}
else{
    console.log('[API] API_URL:', apiUrl);
}

export const loginHandler = async (req: Request, res: Response) => {
    try {
        const apiRes = await fetch(`${apiUrl}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });

        const data = await apiRes.json();

        if (data.status === 200) {
            res.cookie('accessToken', data.data.accessToken, {
                httpOnly: true,
                sameSite: 'lax',
                secure: true,
                maxAge: 5 * 60 * 1000, // 5 phút
            });

            res.cookie('refreshToken', data.data.refreshToken, {
                httpOnly: true,
                sameSite: 'lax',
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
            });
        }

        const decoded = jwtDecode(data.data.accessToken)
        data.data = decoded;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Login proxy failed', details: err });
    }
};


export const apiHandler = async (req: Request, res: Response) => {
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
};

export const apiGuestHandler = async (req: Request, res: Response) => {
    const targetPath = req.originalUrl.replace(/^\/tdt\/guest/, '');
    console.log('[API] Guest request to:', targetPath);
    const response = await fetch(`${apiUrl}${targetPath}`, {
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: ['POST', 'PUT', 'PATCH'].includes(req.method) ? JSON.stringify(req.body) : undefined
    });
    const data = await response.json();
    return res.status(response.status).json(data);
};