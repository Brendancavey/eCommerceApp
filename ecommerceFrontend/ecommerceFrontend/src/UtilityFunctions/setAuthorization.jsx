import React from 'react';
import { STORAGE_KEY } from '../Constants/AuthConstants'

function setAuthorization(value) {
    sessionStorage.setItem(STORAGE_KEY, value)
    return null
}

export default setAuthorization;