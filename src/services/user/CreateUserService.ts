import prismaClient from '../../Prisma'
import { hash } from 'bcryptjs'


interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){
        
        // Verificar se o e-mail foi enviado
        if(!email){
            throw new Error("E-mail Incorreto")
        }

        // Verificar se o e-mail está cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("O usuário já está cadastrado")
        }

        const passwordHash = await hash(password, 8)


        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            select:{
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}

export { CreateUserService }