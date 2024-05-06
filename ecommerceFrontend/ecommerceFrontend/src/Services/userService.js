import { AuthRequestOptions } from '../Constants/AuthConstants';


export async function getAuthorizedUserData() {
    const requestOptions = AuthRequestOptions("GET")
    const response = await fetch("http://localhost:8080/pingauth", requestOptions)
    const data = await response.json()
    return data
}

export async function getUserCart() { //retrieves a map of [productId : productQuantity]
    const requestOptions = AuthRequestOptions("GET")
    const response = await fetch("http://localhost:8080/api/Cart/getcart", requestOptions)
    const data = await response.json()
    return data
}

export async function updateUserCart(formData) {
    const requestOptions = AuthRequestOptions("PUT", formData)
    const response = await fetch("http://localhost:8080/api/Cart/updatecart", requestOptions)
    if (response.ok) {
        console.log("Cart saved succesfully")
    }
    else {
        console.log("Cart did not save successfully")
    }
}