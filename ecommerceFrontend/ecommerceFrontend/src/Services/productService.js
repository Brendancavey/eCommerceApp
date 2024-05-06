import { AuthRequestOptions } from '../Constants/AuthConstants';

export async function getProductsByFilters(selectedCategories, maxPrice, sortOrder) {
    const url = new URL('http://localhost:8080/Product/get-products-by-filters')
    selectedCategories.forEach(categoryId => {
        url.searchParams.append('selectedCategoryIds', categoryId)
    })
    url.searchParams.append('filterPrice', maxPrice)
    url.searchParams.append('sortOrder', sortOrder)
    try {
        const response = await fetch(
            url, {
            method: 'GET'
        });
        if (response.ok) {
            console.log("Fetched data with filters successfully")
        }
        const data = await response.json()
        return data
    }
    catch (error) {
        console.error("Error fetching data with filters: ", error)
    }
}
export async function getProductById(id) {  
    const response = await fetch(`http://localhost:8080/Product/get-by-id/${id}`, {
        method: 'GET'
    })
    const data = await response.json()
    return data
}

export async function getProductImage(id) {
    const response = await fetch(`http://localhost:8080/Product/get-image-by-id/${id}`, {
        method: 'GET'
    });
    if (response.ok) {
        const data = await response.blob();
        return (URL.createObjectURL(data));
    }
    return null
    
}

export async function getProductImage2(id) {
    const response = await fetch(`http://localhost:8080/Product/get-image-by-id2/${id}`, {
        method: 'GET'
    });
    if (response.ok) {
        const data = await response.blob();
        return (URL.createObjectURL(data));
    }
    return null
    
}
export async function addProduct(formData) {
    const requestOptions = AuthRequestOptions('POST', formData);
    try {
        const response = await fetch('http://localhost:8080/Product/addProduct', requestOptions);
        if (response.ok) {
            console.log("Added product successfully");

        } else {
            console.error("Error happened", response.statusText);
        }
        return response
    } catch (error) {
        console.error("Error occured: ", error);
    }
}

export async function updateProduct(formData) {
    try {
        const requestOptions = AuthRequestOptions('PUT', formData);
        const response = await fetch('http://localhost:8080/Product/updateProduct', requestOptions)

        if (response.ok) {
            console.log("Product updated successfully")
        } else {
            console.error("Error happened", response.statusText);
        }
        return response
    } catch (error) {
        console.error("Error occured: ", error);
    }
}
export async function deleteProduct(id) {
    const requestOptions = AuthRequestOptions('DELETE')
    const response = await fetch(`http://localhost:8080/Product/deleteProduct/${id}`, requestOptions)
    if (response.ok) {
        console.log("successfully deleted product")
        window.location.reload(); //refresh page to rerender products list
    } else {
        console.log("failed to delete product")
    }
}