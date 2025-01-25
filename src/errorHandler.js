export default handler => (request, response, next) => {
    const { errorHandlersChain } = request
    request.errorHandlersChain = async (error, request, response) => {
        if (errorHandlersChain)
            await errorHandlersChain(error, request, response)
        await handler(error, request, response)
    }
    next()
}
