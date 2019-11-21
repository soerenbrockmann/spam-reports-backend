import app from '../src/app';
import request, { Response } from 'supertest';

// report data must be mocked in case of real data source
const endpoint: string = '/reports/0103e005-b762-485f-8f7e-722019d4f302';

describe('Testing api endpoint - DELETE /reports/reportId', () => {
    it('returns status code 200 on success', async () => {
        const result: Response = await request(app).delete(endpoint);
        expect(result.status).toEqual(200);
    });

    it('returns status code 404 when not found', async () => {
        const result: Response = await request(app).delete(endpoint);
        expect(result.status).toEqual(404);
    });
});
