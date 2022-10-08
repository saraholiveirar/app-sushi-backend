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
import { RemoveOrderController } from './controllers/order/RemoveOrderController';

//---- Importando Itens
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';

import { ListOrdersController } from './controllers/order/ListOrderController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';
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

router
router.get('/category', isAthenticated, new ListCategoryController().handle)

//----Rotas de Produto----

router.post('/product', isAthenticated, upload.single('file'), new CreateProducController().handle)
router.get('/category/product', isAthenticated, new ListByCategoryController().handle)

//---- Rotas de Ordem ----

router.post('/order', isAthenticated, new CreateOrderController().handle)
router.delete('/order', isAthenticated, new RemoveOrderController().handle)

router.post('/order/add', isAthenticated, new AddItemController().handle)
router.delete('/order/remove', isAthenticated, new RemoveItemController().handle)

router.put('/order/send', isAthenticated, new SendOrderController().handle)

router.get('/orders', isAthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAthenticated, new DetailOrderController().handle)

router.put('/order/finish', isAthenticated, new FinishOrderController().handle)

export { router };

