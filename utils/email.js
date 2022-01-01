const nodemailer = require('nodemailer');

exports.sendPass=async (newpass,email)=>{

    const transport =nodemailer.createTransport({
        
        host: 'smtp.gmail.com',
        port:465,
        secure: true,
        auth:{
            user: 'hethongquanliweb@gmail.com',
            pass: 'lethanhkhoi123',
        },
        tls:{
            rejectUnauthorized: false,
        }
    });
    const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: '<hethongquanliweb@gmail.com>',
        to: email,
        subject: 'Test Nodemailer',
        text: newpass,
    }
    transport.sendMail(mainOptions,(error)=>{
        if(error){
            return console.log(error);
        }
    });
    
}

exports.verify=async (host,email)=>{
    const transport =nodemailer.createTransport({
        
        host: 'smtp.gmail.com',
        port:465,
        secure: true,
        auth:{
            user: 'hethongquanliweb@gmail.com',
            pass: 'lethanhkhoi123',
        },
        tls:{
            rejectUnauthorized: false,
        }
    });
    const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: '<hethongquanliweb@gmail.com>',
        to: email,
        subject: 'Email Verification',
        html:   `<div style="background-color: #ea562dda; padding: 2em 2em;">
                    <h1 style="text-align: center;">Thank you for registering on our web</h1>
                    <h4 style="text-align: center;">Please click <a href="http://${host}/login/verify/${email}">here</a> to activate your account</h4>
                </div>`
    }
    transport.sendMail(mainOptions,(error)=>{
        if(error){
            return console.log(error);
        }
    });
}