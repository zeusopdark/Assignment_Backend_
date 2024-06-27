import { TryCatch } from "../middlewares/error.js";
import Form from "../models/form.model.js";
import { ErrorHandler } from "../utils/utility.js";
import{generatePDF}from "../utils/features.js"
import PDFDocument from "pdfkit";
export const createForm = TryCatch(async (req, res, next) => {
  const { userId,formData } = req.body;
  const form = new Form({
    userId,
    data:formData
  });
  await form.save();
  res.status(201).json({
    message: "Form created successfully",
    success: true,
  });
});

export const getForm=TryCatch(async(req,res,next)=>{
    const forms=await Form.find({userId:req.user},"-userId");
    return res.status(200).json({
        success:true,
        message:"Forms fetched successfully...!",
        forms
    })
})

export const updateForm=TryCatch(async(req,res,next)=>{
    const{formId,formData}=req.body;
    const form= await Form.findByIdAndUpdate(formId,{data:formData},{new:true});
    res.status(200).json({
        success:true,
        message:"Form updated successfully...",
        form
    })
})

export const deleteForm=TryCatch(async(req,res,next)=>{
    const{formId}=req.body
    await Form.findByIdAndDelete(formId);
    res.status(200).json({
        success:true,
        message:"Form Deleted Successfully...."
    })
})

export const downloadFormAsPdf=TryCatch(async(req,res,next)=>{
    const {formId}=req.params;

    const form = await Form.findById(formId);
    if(!form)return next(new ErrorHandler(404,"Form not found"));

    const pdfDoc = new PDFDocument();
    generatePDF(pdfDoc, form.data);

    res.setHeader('Content-disposition', 'attachment; filename=form.pdf');
    res.setHeader('Content-type', 'application/pdf');

    pdfDoc.pipe(res);
    pdfDoc.end();

})