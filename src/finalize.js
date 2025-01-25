import NotError from './NotError.js'

export default (callback = async (request, response) => {}, options = { silent: true }) => (
    async (error, request, response, next) => {
        await callback(request, response)
        if (!(error instanceof NotError)) {
            if (!options.silent) {
                console.error('Handled error:', error)
            }
            if (request.errorHandlersChain) {
                await request.errorHandlersChain(error, request, response)
            }
            if (!response.headersSent) {
                response.status(500)
            }
        }
        response.end()
    }
)
