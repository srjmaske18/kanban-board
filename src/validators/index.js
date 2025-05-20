import {body } from "express-validator";


const userRegistrationValidator = () =>{
    return [
        body('email')
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is Invalid"),
    body("username")
        .trim()
         .notEmpty().withMessage("username is required")
         .isLength({min:3}).withMessage("username should be atlest 3 char")
         .isLength({max:13}).withMessage("username should be atlest 13 char")
    ]
}


const userLoginValidator = () =>{
    return [
        body("email")
            .isEmail().withMessage("Email is not Valid"),
        body("password")
        .notEmpty().withMessage("Password can not be empty")
    ]
}
export {userRegistrationValidator, userLoginValidator}