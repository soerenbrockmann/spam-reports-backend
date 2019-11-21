import logger from './util/logger';

import app from './app';

const port = 3001;

const server = app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
    logger.info('Press CTRL-C to stop\n');
});

export default server;
