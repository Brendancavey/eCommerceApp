import React from 'react'
import "./List.scss"
import Card from "../Card/Card"
import { useState, useEffect } from 'react'
import { getProductsByFilters } from '../../Services/productService'

const List = (params) => {
    const [products, setProducts] = useState()
    const [selectedCategories, setSelectedCategories] = useState()
    const [maxPrice, setMaxPrice] = useState()
    const [responseMessage, setResponseMessage] = useState(<h3></h3>)
    const [sortOrder, setSortOrder] = useState()

    useEffect(() => {
        setMaxPrice(params.maxPrice)
    }, [params.maxPrice])
    useEffect(() => {
        setSelectedCategories(params.selectedCategories)
    }, [params.selectedCategories])
    useEffect(() => {
        setSortOrder(params.sort)
    }, [params.sort])
    useEffect(() => {
        getProductData()
    }, [selectedCategories, maxPrice, sortOrder])

    async function getProductData() {
        const filteredProducts = await getProductsByFilters(selectedCategories, maxPrice, sortOrder)
        if (filteredProducts.length === 0) {
            setResponseMessage(<h3>Hmm..No products seem to exist with your selected filters.</h3>)
        }
        else {
            setResponseMessage(<h3></h3>)
        }
        setProducts(filteredProducts);
    }
    return (
        <div className='list'>
            {responseMessage}
            {products?.map((item) => (
                <Card item={item} key={item.id} />
            ))}  
        </div>
    )
}
export default List