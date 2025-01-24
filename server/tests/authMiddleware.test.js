import sign from 'jsonwebtoken';
import express, { json } from 'express';
import request from 'supertest';
import verifyToken from '../middleware/authMiddleware.js';

const secretkey = "da30e0c0eafbadba9389c0883c6537acc7ba17e188a53f49e8dcf6bb914c1fcbconst"


// Mock Express App
const app = express();
app.use(json());
app.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Access granted' });
});

describe('verifyToken Middleware', () => {
    it('should allow access with a valid token', async () => {
        const payload = { userId: 12, application: 'todoApp' };
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJhcHBsaWNhdGlvbiI6InRvZG9BcHAiLCJpYXQiOjE3Mzc1MjkwNjZ9.aJ8majoJqXukD6cPW1Q3-zRtn6Ybp1buJapChUH-OYM';

        const response = await request(app)
            .get('/protected')
            .set('Authorization', token);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Access granted' });
    });

    it('should deny access if the token is missing', async () => {
        const response = await request(app).get('/protected');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Access denied' });
    });

    it('should deny access if the token is invalid', async () => {
        const invalidToken = 'invalid.token.string';

        const response = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${invalidToken}`);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid token' });
    });

    it('should deny access if the authorization header does not start with "Bearer "', async () => {
        const payload = { userId: 12, application: 'todoApp' };
        const token = sign(payload, secretkey);

        const response = await request(app)
            .get('/protected')
            .set('Authorization', `Token ${token}`);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Access denied' });
    });
});