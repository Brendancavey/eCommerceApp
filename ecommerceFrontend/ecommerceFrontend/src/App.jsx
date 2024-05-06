import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from "react-router-dom"
import Home from "./Pages/Home/Home"
import Product from "./Pages/Product/Product"
import Products from "./Pages/Products/Products"
import AddProduct from "./Pages/Admin/AddProduct"
import Edit from "./Pages/Admin/Edit"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import UserAccount from "./Pages/UserAccount/UserAccount"
import AddCategory from "./Pages/Admin/AddCategory"
import NavBar from "./Components/NavBar/NavBar"
import Footer from "./Components/Footer/Footer"
import './App.scss'

const LayOut = () => {
    return (
        <div className='app'>
            <NavBar />
            <Outlet/>
            <Footer/>
        </div>
    )
}
const router = createBrowserRouter([
{
    path: "/",
    element: <LayOut />,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/products/:id",
                element: <Products />
            },
            {
                path: "/product/:id",
                element: <Product />
            },
            {
                path: "/addproduct",
                element: <AddProduct/>
            },
            {
                path: "/edit/:id",
                element: <Edit/>
            },
            {
                path: "/addcategory",
                element: <AddCategory/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "/useraccount",
                element: <UserAccount/>
            },
        ]
},
])

function App() {
  return (
    <>
          <RouterProvider router={router } />
    </>
  )
}

export default App
