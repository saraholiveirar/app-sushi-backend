import { Request, Response } from "express";
import { CreateCategoryService } from '../../services/category/CreateCategoryService'

class CreateCategoryController{
    async handle(req: Request, res: Response){

        const { name } = req.body;

        const createCartegoryService = new CreateCategoryService();

        const category = await createCartegoryService.execute({
            name
        });

        return res.json(category);
    }
}

export { CreateCategoryController }