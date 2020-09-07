import * as functions from "firebase-functions";
import * as cors from "cors";
import * as nodemailer from "nodemailer";
import * as express from "express";

const transportador = nodemailer.createTransport({
    service : "gmail",
    auth:{
        user: "emanuelob7@gmail.com",
        pass: "amfsterdamromeo"
    }
});

const endPointExpress = express();

const corsVal = cors({origin:true});
endPointExpress.options("*",corsVal);
endPointExpress.use(corsVal);

endPointExpress.use(express.json);
endPointExpress.post('*', (req, res)=>{
    const _email= req.body.email;
    const _titulo = req.body.titulo;
    const _mensaje= req.body.mensaje;
    
    const emailOpciones = {
        from: 'emanuelob7@gmail.com',
        to: _email,
        subject : _titulo,
        html: '<p>' + _mensaje + '</p>'

    }
    transportador.sendMail(emailOpciones, function(err, info){
        if(err){
            res.send(err);
        }else{
            res.send('el email fue enviado correctamente');

        }

    })
})

export = module.exports = functions.https.onRequest((request, response)=>{
    return endPointExpress(request, response);
})