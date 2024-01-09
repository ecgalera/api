const {check, validationResult} = require("express-validator")
//  Creamos un validador como un []
const  validatorCreateUser =[
    check("name")
    .exists().withMessage("Name field required")
    .trim() 
    .notEmpty().withMessage("Must contain values")
    .isLength({min:2 , max:90}).withMessage("Character count: min:2, max:90")
    .isAlpha("es-ES",{ignore: " "}).withMessage("Only letters"),
    check("email")
    .exists().withMessage("Email is required")
    .trim()
    .isEmail().withMessage("Must be a valid email address")
    .normalizeEmail(), 
    check("password")
    .exists().withMessage("Debe existir")
    .trim()
    .notEmpty().withMessage("No debe venir vacío")
    .isLength({min:8, max:20}).withMessage("Min: 8 , max:20"),
    (req, res, next)=>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(400).json({error:error.array()})
        }
    }
]

module.exports = {validatorCreateUser}