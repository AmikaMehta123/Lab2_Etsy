import Login from './../components/Login/Login';
import ShoppingPageOverview from './../components/ShoppingPageOverview';
import Cart from './../components/Cart';
import Dashboard from './../components/Dashboard';
import UpdateProfile from '../components/UpdateProfile';
import AddShop from '../components/AddShop';
import AddItems from '../components/AddItems';
import EditItems from '../components/EditItems';
import ViewShop from '../components/ViewShop';
import { CheckName } from '../components/CheckName';
import PopUpForm from '../components/PopUpForm';
import { ViewItem } from '../components/ViewItem';
// import { ImageUpload } from '../components/ImageUpload';
import { PurchasePage } from '../components/PurchasePage';
import { FavPage } from '../components/FavPage';
import FileUpload from '../components/FileUpload';
import MyPurchase from '../components/MyPurchase';


const routes = [
    {
      path: '/',
      component: Dashboard,
      title: "Dashboard",
    },
    {
      path: '/cart',
      component: Cart,
      title: "Cart",
    },

    {
      path: '/login',
      component: Login,
      title: "Login",
    },
    {
      path: '/shoppingPageOverview',
      component: ShoppingPageOverview,
      title: "shoppingPageOverview",
    },
    {
      path: '/updateProfile',
      component: UpdateProfile,
      title: "updateProfile",
    },
    {
      path: '/addShop',
      component: AddShop,
      title: "addShop",
    },
    {
      path: '/addItems',
      component: AddItems,
      title: "addItems",
    },
    {
      path: '/editItems',
      component: EditItems,
      title: "editItems",
    },
    {
      path: '/checkname',
      component: CheckName,
      title: "checkname",
    },
    {
      path: '/viewshop',
      component: ViewShop,
      title: "viewshop",
    },
    {
      path: '/viewitem',
      component: ViewItem,
      title: "viewitem",
    },
    // {
    //   path: '/imageupload',
    //   component: ImageUpload,
    //   title: "imageupload",
    // },
    {
      path: '/purchasepage',
      component: PurchasePage,
      title: "purchasepage",
    },
    {
      path: '/favpage',
      component: FavPage,
      title: "favpage",
    },
    {
      path: '/fileUpload',
      component: FileUpload,
      title: "fileUpload",
    },
    {
      path: '/mypurchase',
      component: MyPurchase,
      title: "mypurchase",
    },
];

export default routes;