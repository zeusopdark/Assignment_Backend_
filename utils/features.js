import jwt from "jsonwebtoken"
const options = {
    maxAge: 12 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
  };
  export const sendToken = (res, user, code, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res
      .status(code)
      .cookie("token", token, options)
      .json({ sucess: true, token, message, user });
  };

  export const generatePDF = (pdfDoc, data) => {
    pdfDoc.fontSize(12).text('Form Data:', {
        align: 'left'
    });

    for (let [key, value] of data.entries()) {
        pdfDoc.text(`${key}: ${value}`);
    }
};