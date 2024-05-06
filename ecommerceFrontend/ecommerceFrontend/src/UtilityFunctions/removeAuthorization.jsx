import React from 'react';
import { STORAGE_KEY } from '../Constants/AuthConstants'


function removeAuthorization() {
    sessionStorage.removeItem(STORAGE_KEY)
    return null
}

export default removeAuthorization;