import express from 'express';
import cors from 'cors';

import * as reportsController from './controllers/reports';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/reports', reportsController.getReports);
app.put(
    '/reports/:reportId',
    reportsController.validationMiddleware,
    reportsController.validateReport,
    reportsController.resolveReport
);
app.delete('/reports/:reportId', reportsController.blockReport);

export default app;
