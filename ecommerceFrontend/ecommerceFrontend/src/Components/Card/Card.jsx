import React from 'react'
import './Card.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getProductImage, getProductImage2 } from '../../Services/productService'
import { ADMIN_NAME } from '../../Constants/AuthConstants'
import { deleteProduct } from '../../Services/productService'

const Card = ({ item }) => {

    const userRole = useSelector(state => state.user.role)
    const [image, setImage1] = useState()
    const [image2, setImage2] = useState()
    useEffect(() => {
        getImageData(item.id)
    }, [])
    async function getImageData(id) {
        const imageUrl = await getProductImage(id);
        setImage1(imageUrl)

        const imageUrl2 = await getProductImage2(id)
        setImage2(imageUrl2)
    }
    async function handleClickDelete(id) {
        await deleteProduct(id)
    }
    return (
        <div>
        <Link className='link' to={`/product/${item.id}`}>
            <div className='card'>
                <div className='image'>
                    {item.isNew && <span>New Item!</span>}
                    <img src={image} alt="" className="mainImg" />
                    <img src={image2} alt="" className="secondImg" />
                </div>
                <h2>{item.title}</h2>
                <div className='prices'>
                    <h3>${item.price}</h3>
                    <h3>${item.salePrice}</h3>
                </div>
            </div>
            </Link >
            {userRole === ADMIN_NAME && <Link to={`/edit/${item.id}`}>Edit</Link>}
            {userRole === ADMIN_NAME && <button onClick={() => handleClickDelete(item.id)}>Delete</button>}
        </div>
    )
}
export default Card