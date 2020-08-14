const logger = require('../utils/logger')

const reqLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:', req.path)
    logger.info('Body:', req.body)
    logger.info('---')
    next()
}

const unkownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unkown Endpoint '})
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if ( error.name === 'CastError' ) {
        res.status(400).send({ error: 'Malformatted id' })

    } else if ( error.name === 'ValidationError' ) {
        res.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = { reqLogger, unkownEndpoint, errorHandler }