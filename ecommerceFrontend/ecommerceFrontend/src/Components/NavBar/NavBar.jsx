import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import LogoutLink from "../../Components/LogoutLink/LogoutLink"
import { setUserFirstName } from "../../Redux/userReducer";
import { useDispatch } from 'react-redux';
import { addToCart, setImage, setItemQuantity } from "../../Redux/cartReducer";
import Cart from '../Cart/Cart';
import "./NavBar.scss";
import { STORE_NAME, PRODUCTS_NAME } from '../../Constants/DesignConstants';
import { getAuthorizedUserData, getUserCart } from '../../Services/userService'
import { getProductById, getProductImage } from '../../Services/productService'

const NavBar = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const userFirstName = useSelector(state => state.user.firstName)
    const [cartOpen, setCartOpen] = useState(false)
    const products = useSelector(state => state.cart.products)
    const cartQuantity = products.length
    const [cartProductIdsMap, setCartProductIdsMap] = useState() //contains [productId : productQuantity]
    const [retrievedCartItems, setRetrievedCartItems] = useState(false)

    useEffect(() => {
        if (isLoggedIn && !retrievedCartItems) {
            getUserCartData()
            getUserFirstName()
        }
        else {
            console.log("not logged in to get cart or already retrieved cart items")
        }
        setCartOpen(false) //setCartOpen to false upon initial render because reactjs detects a change in cartQuantity upon initial render
        getProductImagesInCart()
    }, [])
    useEffect(() => {
        if (isLoggedIn) {
            getCartProductsData(cartProductIdsMap)
        }
    }, [cartProductIdsMap])
    useEffect(() => {
        setCartOpen(true)
    }, [cartQuantity])

    async function getUserCartData() {
        const cartData = await getUserCart()
        setCartProductIdsMap(cartData)
        setRetrievedCartItems(true)
    }
    async function getUserFirstName() {
        const userData = await getAuthorizedUserData()
        dispatch(setUserFirstName({ firstName: userData.firstName }))//save name to user redux state for persistance
    }
    async function getProductImagesInCart() {
        products.forEach(async product => {
            dispatch(setImage({
                id: product.id,
                img: await getProductImage(product.id)
            }))
        })
    }
    async function getCartProductsData(idsMap) {
        try {
            Object.keys(idsMap).forEach(async id => {
                try {
                    const productData = await getProductById(id)
                    const imageData = await getProductImage(id)
                    dispatch(addToCart({
                        id: productData.id,
                        title: productData.title,
                        description: productData.description,
                        price: productData.salePrice,
                        img: imageData,
                        //quantity   Do not add to quantity. Need to set quantity
                    }))
                    dispatch(setItemQuantity({
                        id: productData.id,
                        quantity: idsMap[id]
                    }))
                } catch (error) {
                    console.log(error)
                }
            })
        } catch {
            console.log("no product ids to retrieve product productData")
        }
    }

    
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="left">
                    <div className="item">
                        <img src="images/en.png" alt="" />
                        {/*<KeyboardArrowDownIcon />*/}
                    </div>
                    <div className="item">
                        <span>USD</span>
                        {/*<KeyboardArrowDownIcon />*/}
                    </div>
                    <div className="item">
                        {/*<Link className="link" to="/products/1">Dog Toys</Link>*/}
                    </div>
                    <div className="item">
                        <Link className="link" to="/products/2">{PRODUCTS_NAME}</Link>
                    </div>
                    <div className="item">
                        {/*<Link className="link" to="/products/3">Dog Food</Link>*/}
                    </div>
                </div> 
                <div className="center">
                    <div>
                        <Link className="link" to="/">{STORE_NAME}</Link>
                    </div>
                </div>
                <div className="right">
                    <div className="item"><Link className="link" to="/">Homepage</Link></div>
                    {/*<div className="item"><Link className="link" to="/">About</Link></div>*/}
                    {/*<div className="item"><Link className="link" to="/">Contact</Link></div>*/}
                    {/*<div className="item"><Link className="link" to="/">Stores</Link></div>*/ }
                    <div className="icons">
                        <span>
                        {isLoggedIn && <Link to="/useraccount">
                            <h3>Hello {userFirstName}</h3>
                        </Link>}
                        <LogoutLink >
                            Logout
                        </LogoutLink>
                            
                        </span>
                        {isLoggedIn===false && <Link className="link" to="/useraccount">
                            <PersonOutlineOutlinedIcon />
                        </Link>} 
                        {/*<FavoriteBorderOutlinedIcon />*/}
                        <div className="cartIcon" onClick={()=>setCartOpen(!cartOpen) }>
                            <ShoppingCartOutlinedIcon />
                            <span>{cartQuantity}</span>
                        </div>
                    </div>
                 </div>
            </div>
            {cartOpen && <Cart/>}
        </div>

    )
}
export default NavBar