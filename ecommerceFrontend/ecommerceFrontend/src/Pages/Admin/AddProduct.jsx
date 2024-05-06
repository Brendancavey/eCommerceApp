import React from 'react';
import { useState } from 'react';
import Categories from '../../Components/Categories/Categories';
import "./AddProduct.scss"
import { useDispatch } from 'react-redux';
import { resetCategories } from "../../Redux/categoryReducer";
import { useSelector } from 'react-redux';
import AuthorizeView from "../../Components/AuthorizeView/AuthorizeView";
import { addProduct } from '../../Services/productService';

function AddProduct() {
    const selectedCategories = useSelector(state => state.categories.selectedCategories);
    const [productTitle, setTitle] = useState();
    const [productDesc, setDesc] = useState();
    const [isNew, setIsNew] = useState();
    const [productPrice, setPrice] = useState();
    const [productSalePrice, setSalePrice] = useState();
    const [selectedFile0, setSelectedFile0] = useState(null);
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [responseMessage, setResponseMessage] = useState();
    const dispatch = useDispatch();

    const handleFileChange0 = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile0(event.target.files[0]);
        }
    };
    const handleFileChange1 = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile1(event.target.files[0]);
        }
    };
    async function handleClickAddProduct() {
        const formData = new FormData();
        formData.append('title', productTitle);
        formData.append('description', productDesc);
        formData.append('isNew', isNew);
        formData.append('price', parseInt(productPrice));
        formData.append('salePrice', parseInt(productSalePrice));
        formData.append('file0', selectedFile0);
        formData.append('file1', selectedFile1);
        selectedCategories.forEach(id => {
            formData.append('selectedCategoryIds[]', id);
        });

        const response = await addProduct(formData)
        if (response.ok) {
            setResponseMessage(<h3 style={{ color: "green" }}>Added product successfully</h3>);
            //clear form fields
            setTitle('');
            setDesc('');
            setPrice('');
            setSalePrice('');
            dispatch(resetCategories());
        } else {
            setResponseMessage(<h3 style={{ color: "red" }}>Error Occured: {response.status}</h3>);
        }
    }
    return (
        <AuthorizeView>
            <div className='addproduct'>
                <div>
                    <h1>Add Product</h1>

                    <div>
                        <h3>Product Name</h3>
                        <input type='text' value={productTitle} placeholder="Product Name" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <h3>Description</h3>
                        <input type='text' value={productDesc} placeholder="Description" onChange={(e) => setDesc(e.target.value)} />
                    </div>

                    <input type='radio' id='new' value='new' name='isNewItem?' onChange={() => setIsNew(true)} />
                    <label htmlFor='new'>Is New</label>
                    <input type='radio' id='notNew' value='notNew' name='isNewItem?' onChange={() => setIsNew(false)} />
                    <label htmlFor="notNew">Is Not New</label>
                    <div>
                        <h3>Price</h3>
                        <input type='text' value={productPrice} placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div>
                        <h3>Sale Price</h3>
                        <input type='text' value={productSalePrice} placeholder="Sale Price" onChange={(e) => setSalePrice(e.target.value)} />
                    </div>
                    <div>
                        <Categories />
                    </div>
                    <div>
                        <h3>Image 1</h3>
                        <input type='file' onChange={handleFileChange0} />
                    </div>
                    <div>
                        <h3>Image 2</h3>
                        <input type='file' onChange={handleFileChange1} />
                    </div>
                    <div>
                        <button onClick={() => handleClickAddProduct()}>Add Product</button>
                        {responseMessage}
                    </div>


                </div>
            </div>
        </AuthorizeView>
    );
}

export default AddProduct;