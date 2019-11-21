import data from '../data/reports.json';
import logger from '../util/logger';

const reports = { ...data };

interface Report {
    id: string;
}

enum Messages {
    ERROR_NOT_FOUND = 'Report was not found',
    MESSAGE_BLOCKED = 'Message has been blocked',
    MESSAGE_RESOLVED = 'Message has been resolved',
    MESSAGES_FETCHED = 'Message has been fetched',
}

export const getMessages = async () => {
    logger.info(Messages.MESSAGES_FETCHED);
    return reports;
};

export const blockMessage = async (reportsId: string) => {
    const report = reports.elements.find(
        (report: Report) => report.id === reportsId
    );

    if (report) {
        const reportIndex = reports.elements.indexOf(report);
        reports.size = reports.elements.length - 1;
        reports.elements.splice(reportIndex, 1);
        logger.info(Messages.MESSAGE_BLOCKED);
    } else {
        throw new Error(Messages.ERROR_NOT_FOUND);
    }
};

export const resolveMessage = async (
    reportsId: string,
    ticketState: string
) => {
    const report = reports.elements.find(
        (report: Report) => report.id === reportsId
    );

    if (report) {
        const reportIndex = reports.elements.indexOf(report);
        reports.elements[reportIndex].state = ticketState;
        logger.info(Messages.MESSAGE_RESOLVED);
    } else {
        throw new Error(Messages.ERROR_NOT_FOUND);
    }
};
