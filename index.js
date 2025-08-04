import express from 'express';
import ProductsController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/uploadFile.middleware.js';
import UserController from './src/controllers/users.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';

const app = express();
const productsController =
  new ProductsController();

  const usersController=new UserController;

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret:'SecretKey',
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false},
})
);
app.use(cookieParser());
app.use(setLastVisit);

app.set('view engine', 'ejs');
app.set(
  'views',
  path.join(path.resolve(), 'src', 'views')
);

app.get('/', auth, productsController.getProducts);
app.get(
  '/add-product',auth,
  productsController.getAddProduct
);

app.get(
  '/update-product/:id',auth,
  productsController.getUpdateProductView
);
app.use(express.static('public'));
app.post('/delete-product/:id',auth,productsController.deleteProduct);

app.post(
  '/',auth,uploadFile.single('imageUrl'),
  validationMiddleware,
  productsController.postAddProduct
);

app.post(
  '/update-product',auth,
  productsController.postUpdateProduct
);

app.get("/register",usersController.getRegister);

app.get("/login",usersController.getLogin);

app.post("/register",usersController.postRegister);

app.post("/login",usersController.postLogin);

app.get("/logout",usersController.logout);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
