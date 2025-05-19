// HIGHER ORDER FUCTION FOT THE USE OF PROMISE INSTEADED OF TRYCATCH

const asyncHandler  = (requestHandler) =>{
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export {asyncHandler }