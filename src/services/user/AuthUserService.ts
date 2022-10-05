import prismaClient from "../../Prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest{
    email: string;
    password: string;
}


class AuthUserService{
    async execute({email, password}: AuthRequest){
        //Verificar se o e-mail existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("Usuário/Senha incorreta")
        }

        // Verificar se a senha está incorreta

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Usuário/Senha incorreta")
        }

        //Gerar token JWT e devolver dados do usuário

        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET, 
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )


        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }