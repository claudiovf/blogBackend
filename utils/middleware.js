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
        return res.status(400).send({ error: 'Malformatted id' })

    } else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message })

    } else if (error.name === 'JsonWebTokenError') {
        return res.status(400).send({ error: 'Publishing user must login' })
    }

    next(error)
}

const getTokenFrom = (req, res, next) => {
    const authorization = req.get('authorization')

    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
       
    }
    else null

    next()
}

module.exports = { 
    reqLogger, 
    unkownEndpoint, 
    errorHandler,
    getTokenFrom 
}