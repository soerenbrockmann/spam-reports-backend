import { Request, Response, NextFunction } from 'express';
import { getMessages, blockMessage, resolveMessage } from '../models/reports';
import logger from '../util/logger';
import { check, validationResult } from 'express-validator';

enum States {
    CLOSED = 'CLOSED',
}

export const getReports = async (req: Request, res: Response) => {
    const messages = await getMessages();
    res.status(200).send(messages);
};

export const resolveReport = async (
    { params, body }: Request,
    res: Response
) => {
    try {
        await resolveMessage(params.reportId, body.ticketState);
        res.status(200).send('Ok');
    } catch (err) {
        logger.error(err);
        res.status(404).send(err.message);
    }
};

export const blockReport = async (req: Request, res: Response) => {
    try {
        await blockMessage(req.params.reportId);
        res.status(200).send('Ok');
    } catch (err) {
        logger.error(err);
        res.status(404).send(err.message);
    }
};

export const validateReport = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    } catch (err) {
        logger.error(err);
        res.status(500).send(err.message);
    }
};

export const validationMiddleware = [
    check('ticketState').exists(),
    check('ticketState').equals(States.CLOSED),
];
