const UserModal = require('../modal/Logsin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

exports.logindata = async (req, res) => {
    try {
        const logindata = await UserModal.findOne({ email: req.body.email });
        if (!logindata) throw new Error("Invalid email");

        main(logindata)

        const verypassword = await bcrypt.compare(req.body.password, logindata.password);
        if (!verypassword) throw new Error('Invalid password');
        const token = jwt.sign({ id: logindata._id }, "surat");
        res.status(200).json({
            status: "success",
            message: "User logged in successfully",
            data: logindata,
            token
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message // Corrected to error.message
        });
    }
}



// const nodemailer = require("nodemailer"); 

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Change this line
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "naitikkherala47@gmail.com",
        pass: "kdmlvyiwgmhuhcdd",
    },
});
async function main(data) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <naitikkherala47@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: `Hello ✔ ${data.name} Success fully email send to natik kherala `, // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

exports.singupdata = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const data = await UserModal.create(req.body)
        res.status(200).json({
            status: "success",
            Message: 'user create succesfullly',
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            Message: error.Message
        })
    }
}