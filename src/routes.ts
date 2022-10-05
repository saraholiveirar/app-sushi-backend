import {Router} from 'express';
import multer from 'multer';

//---- Importando Usuários ----
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

//---- Importando Categorias ----
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

//---- Importando Produtos ----
import { CreateProducController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

//---- Importando Ordens ----
import { CreateOrderController } from './controllers/order/CreateOrderController';


//---- Importando Upload---
import uploadConfig from './config/multer'

import { isAthenticated  } from './middlewares/isAuthenticated';

const router = Router ();

const upload = multer(uploadConfig.upload("./tmp"))

//----Rotas de Usuários----

router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

//--Autenticação, verificar se o usuário ta logado e prosseguir
router.get('/userinfo', isAthenticated, new DetailUserController().handle) 


//----Rotas de Categoria----

router.post('/category', isAthenticated, new CreateCategoryController().handle)

router.get('/category', isAthenticated, new ListCategoryController().handle)

//----Rotas de Produto----

router.post('/product', isAthenticated, upload.single('file'), new CreateProducController().handle)

router.get('/category/product', isAthenticated, new ListByCategoryController().handle)

//---- Rotas de Ordem ----

router.post('/order', isAthenticated, new CreateOrderController().handle)

export { router };

