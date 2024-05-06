import { AuthRequestOptions } from '../Constants/AuthConstants';

export async function getAllCategories() {
    try {
        const response = await fetch('http://localhost:8080/Category/getAll', {
            method: 'GET'
        })
        const data = await response.json()
        return data
    }
    catch (error) {
        console.error("Error occured: ", error);
    }
}
export async function getCategoriesByProductId(productId) {
    try {
        const response = await fetch(`http://localhost:8080/Category/get-categories-by-product/${productId}`, {
            method: 'GET'
        });
        if (response.ok) {
            console.log("Fetched product categories data successfully")
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.error("Error fetching product categories data: ", error)
    }
}

export async function addCategory(formData) {
    try {
        const requestOptions = AuthRequestOptions('POST', formData)
        const response = await fetch('http://localhost:8080/Category/addCategory', requestOptions)

        if (response.ok) {
            console.log("Added Category successfully")
        } else {
            console.error("Failed to add category", response.statusText);
        }
        return response
    } catch (error) {
        console.error("Error occured: ", error);
    }
}

export async function deleteCategory(id) {
    try {
        const requestOptions = AuthRequestOptions('DELETE')
        const response = await fetch(`http://localhost:8080/Category/deleteCategory/${id}`, requestOptions)
        if (response.ok) {
            console.log("Successfully deleted category")
            window.location.reload(); //refresh page to rerender categories list
        } else {
            console.log("Error deleting category")
        }
    } catch (error) {
        console.error("Error occured while deleting category: ", error);
    }
}
