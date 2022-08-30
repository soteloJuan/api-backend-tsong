import  nodemailer  from 'nodemailer';

export const sendEmailService = async(correo: string, token: string, who: string) => {
    
    try{

        const link = `${process.env.Email_Validate_Base_Url}/api/auth${who}/confirmarCorreo/${token}`;
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.Email_USER,
                pass: process.env.Email_PASS,
            },
        });

        const mailOptions = {
            from: 'Verificar Correo Electronico <jts.uno.usoVariado@gmail.com>',
            to: `${correo}`,
            subject: '¡ Hola, somos TSong !',
            html: `
            <body>
            <h1>Por favor da click en el siguiente link para finalizar tu registro en TSong</h1>
            <a href="${link}"> Click Aqui</a>
            </body>
            `,
        };

        transport.verify().then();
        const result = await transport.sendMail(mailOptions);
        return result;

    }
    catch(error){
        return error;
    }

};
