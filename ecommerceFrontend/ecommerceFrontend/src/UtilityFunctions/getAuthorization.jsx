import React from 'react';
import { STORAGE_KEY } from '../Constants/AuthConstants'

function getAuthorization() {
    let authenticationToken = sessionStorage.getItem(STORAGE_KEY)

    return authenticationToken
}

export default getAuthorization;