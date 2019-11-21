import app from '../src/app';
import request, { Response } from 'supertest';

// report data must be mocked in case of real data source
const endpoint: string = '/reports';

describe('Testing api endpoint - GET /reports ', () => {
    it('returns status code 200 on success', async () => {
        const result: Response = await request(app).get(endpoint);
        expect(result.status).toEqual(200);
    });
});
