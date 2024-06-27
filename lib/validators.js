import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(" ");

  if (errors.isEmpty) return next();
  else {
    next(new ErrorHandler(400, errorMessages));
  }
};

export const registerUserValidator = () => [
  body("firstName", "Please provide a valid first name").notEmpty(),
  body("lastName", "Please provide a valid last name").notEmpty(),
  body("gender", "Please provide a valid gender")
    .notEmpty()
    .isIn(["Male", "Female", "Other"]),
  body("dob", "Please provide a valid date of birth").notEmpty().isDate(),
  body("mobileNo", "Please provide a valid phone number with 12 digits")
    .notEmpty()
    .isLength({ min: 12, max: 12 }),
  body("email", "Please provide a valid email")
    .notEmpty()
    .isEmail()
    .normalizeEmail(),
  body("password", "Please provide a password with at least 6 characters")
    .notEmpty()
    .isLength({ min: 6 }),
  body("role").optional().isIn(["User", "Admin", "SuperAdmin"]),
];

export const loginValidator = () => [
  body("email", "Please provide a valid email")
    .notEmpty()
    .isEmail()
    .normalizeEmail(),
  body("password", "Please provide a password with at least 6 characters")
    .notEmpty()
    .isLength({ min: 6 }),
];

export const createFormValidator = () => [
  body("userId", "User Id is required").notEmpty(),
  body("formData", "Form data is required").notEmpty(),
];

export const updateFormValidator = () => [
  body("formId", "Please provide the form Id").notEmpty(),
  body("formData", "Please provide the form data ").notEmpty(),
];

export const deleteFormValidator = () => [
  body("formId", "Please provide form Id").notEmpty(),
];

export const getFormPdfValidator = () => [
  param("formId")
    .exists()
    .withMessage("Form Id is required")
    .isMongoId()
    .withMessage("Form Id must be a valid Mongo ID"),
];
