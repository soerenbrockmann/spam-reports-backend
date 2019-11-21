import app from '../src/app';
import request, { Response } from 'supertest';

// report data must be mocked in case of real data source
const endpoint: string = '/reports/01322891-c5cb-4ac5-90d4-3c4224f40ba2';
const endpoint404: string = '/reports/123';

describe('Testing api endpoint - PUT /reports/reportId ', () => {
    it('returns status code 200 on success', async () => {
        const result: Response = await request(app)
            .put(endpoint)
            .send({ ticketState: 'CLOSED' });
        expect(result.status).toEqual(200);
    });

    it('returns status code 422 when validation failes', async () => {
        const result: Response = await request(app)
            .put(endpoint)
            .send({ ticketState: 'DUMMY' });
        expect(result.status).toEqual(422);
    });

    it('returns status code 404 when not found', async () => {
        const result: Response = await request(app)
            .put(endpoint404)
            .send({ ticketState: 'CLOSED' });
        expect(result.status).toEqual(404);
    });
});
