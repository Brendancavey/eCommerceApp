import React from 'react'
import { useState, useEffect } from 'react'
import "./Product.scss"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BalanceIcon from '@mui/icons-material/Balance';
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToCart } from "../../Redux/cartReducer";
import { getProductImage, getProductImage2 } from "../../Services/productService"
import { getProductById } from '../../Services/productService';
import { getCategoriesByProductId } from '../../Services/categoryService';

const Product = () => {
    const productId = parseInt(useParams().id);
    const [quantity, setQuantity] = useState(1)
    const [item, setItem] = useState({})
    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [selectedImg, setSelectedImg] = useState()
    const [productCategories, setProductCategories] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        getProductData(productId);
        getImageData(productId)
        getCategoriesData(productId)
    }, [])
    async function getImageData(id) {
        const imageUrl = await getProductImage(id);
        setImage1(imageUrl)
        setSelectedImg(imageUrl)

        const imageUrl2 = await getProductImage2(id)
        setImage2(imageUrl2)
    }

    async function getProductData(id) {
        const productData = await getProductById(id)
        setItem(productData);
    }
    async function getCategoriesData(productId) {
        const categoriesData = await getCategoriesByProductId(productId)
        setProductCategories(categoriesData);
    }
    function img1() {
        if (image1 != null) {
            return <img src={image1} alt="" onClick={() => setSelectedImg(image1)} />

        }
        return
    }
    function img2() {
        if (image2 != null) {
            return <img src={image2} alt="" onClick={() => setSelectedImg(image2)} />

        }
        return
    }
    return (
        <div>
                <div className='product' key={item.id}>
                    <div className='left'>
                        <div className="images">
                        {img1() } 
                        {img2() }
                        </div>
                        <div className="mainImg">
                            <img src={selectedImg} alt="" />
                        </div>
                    </div>
                    <div className='right'>
                        <h1>{item.title}</h1>
                        <div className='price'>
                            <span>${item.price}</span>
                            <span>${item.salePrice}</span>
                        </div>
                        <p>
                            {item.description}
                        </p>
                        <div className='quantity'>
                            <button onClick={() => setQuantity(prev => prev === 1 ? 1 : prev - 1)}>-</button>
                            {quantity}
                            <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                        </div>
                    <button className='addToCart' onClick={() => dispatch(addToCart({
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        price: item.salePrice,
                        img: image1,
                        quantity,
                    }))}>
                            <AddShoppingCartIcon /> ADD TO CART
                        </button>
                        <div className='links'>
                            <div className='item'>
                                <FavoriteBorderIcon /> ADD TO WISH LIST
                            </div>
                            <div className='item'>
                                <BalanceIcon /> ADD TO TO COMPARE
                            </div>
                        </div>
                        <div className='info'>
                            <span>Tags: {productCategories?.map(category => (
                                <span key={category.id} className='tags'>{category.name}</span>
                                ))}
                            </span>
                        
                        </div>
                        <hr />
                        <div className='info'>
                            <span>DESCRIPTION</span>
                            <hr />
                            <span>ADDITIONAL INFORMATION</span>
                            <hr />
                            <span>FAQ</span>
                        </div>
                    </div>
                </div>
        </div>
    )    
}
export default Product