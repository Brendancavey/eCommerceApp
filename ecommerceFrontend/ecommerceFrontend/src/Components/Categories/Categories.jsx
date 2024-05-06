import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { addToCategories, removeCategory, resetCategories } from "../../Redux/categoryReducer";
import { deleteCategory, getAllCategories } from '../../Services/categoryService';

function Categories() {
    const selectedCategories = useSelector(state => state.categories.selectedCategories)
    const userRole = useSelector(state => state.user.role)
    const [categories, setCategories] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        getCategoriesData()
        resetSelectedCategories()
    }, [])
    async function getCategoriesData() {
        const categoriesData = await getAllCategories()
        setCategories(categoriesData)
    }
    async function handleClickDelete(id) {
        await deleteCategory(id)
    }
    function resetSelectedCategories() {
        dispatch(resetCategories())
    }
    const handleCategoryChange = (catId) => {
        selectedCategories.includes(catId)
            ? dispatch(removeCategory({
                id: catId
            }))
            : dispatch(addToCategories({
                id: catId
            }))
    }
    return (
        <div>
            <h3>Category</h3>
            {categories?.map(cat => (
                <div className='categories' key={cat.id}>
                    <input
                        type='checkbox'
                        id={cat.id}
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => handleCategoryChange(cat.id)} />
                    <label htmlFor={cat.id}>{cat.name}</label>
                    {userRole === 'Admin' && <button onClick={() => handleClickDelete(cat.id)}>Delete</button>}
                </div>
            ))}
        </div>
    )
}
export default Categories