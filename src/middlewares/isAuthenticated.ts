import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string;
}

export function isAthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
 // Receber o token
    const authToken = req.headers.authorization;

    //Se não receber token, não será autorizado
    if(!authToken){
        return res.status(401).end();
    }

    const[, token] = authToken.split(" ")

    try{
        //Validar token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;


        //Recuperar o id do token para colocar dentro de uma variável user_id dentro do req.
        req.user_id = sub;

        return next();

    }catch(err){
        return res.status(401).end();
    }
}