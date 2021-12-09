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