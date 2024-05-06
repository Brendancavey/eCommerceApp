import React from 'react'
import {useState} from 'react'
import "./AddCategory.scss"
import { addCategory } from '../../Services/categoryService'
function AddCategory() {
    const [categoryName, setName] = useState()
    const [responseMessage, setResponseMessage] = useState()

    async function handleClickAddCategory()
    {
        const formData = new FormData();
        formData.append('name', categoryName)
        formData.append('products', null)

        const response = await addCategory(formData)

        if (response.ok) {
            setResponseMessage(<h3 style={{ color: "green" }}>Added Category successfully</h3>)
            //reset fields
            setName('')
        } else {
            setResponseMessage(<h3 style={{ color: "red" }}>Failed to add category</h3>)
        }

    }
    return (
        <div className='addcategory'>
            <div>
                <h1>Add Category</h1>
                
                    <div>
                        <h3>Category Name</h3>
                    <input type='text' value={categoryName} placeholder="Category Name" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <button onClick={() => handleClickAddCategory()}>Add Category</button>
                        {responseMessage}  
                    </div>
            </div>
        </div>
    )
}
export default AddCategory