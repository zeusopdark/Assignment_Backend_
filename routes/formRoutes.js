import { verifyRole, verifyToken } from "../middlewares/auth.js";
import { Router } from "express";
import { createFormValidator, deleteFormValidator, getFormPdfValidator, updateFormValidator, validate } from "../lib/validators.js";
import { createForm, deleteForm, downloadFormAsPdf, getForm, updateForm } from "../controllers/form.controllers.js";
const router=Router();

router.post("/create", verifyToken,verifyRole(["User","Admin"]),createFormValidator(),validate,createForm);
router.get("/getforms",verifyToken,verifyRole(["User","Admin"]),getForm);
router.put("/updateform",verifyToken,verifyRole(["User","Admin"]),updateFormValidator(),validate,updateForm);
router.delete("/deleteform",verifyToken,verifyRole(["User","Admin"]),deleteFormValidator(),validate,deleteForm);
router.get("/downloadFormPdf/:formId",verifyToken,verifyRole(["Admin"]),getFormPdfValidator(),validate,downloadFormAsPdf);
export default router;