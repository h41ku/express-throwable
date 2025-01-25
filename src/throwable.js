import done from './done.js'

export default handler => async (request, response, next) => {
    try {
        await handler(request, response)
        done()
    } catch (error) {
        next(error)
    }
}
