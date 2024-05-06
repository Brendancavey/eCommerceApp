import React from 'react';
import './UserAccount.scss'
import AuthorizeView, { AuthorizedUser } from "../../Components/AuthorizeView/AuthorizeView"
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { ADMIN_NAME } from '../../Constants/AuthConstants'

function UserAccount() {
    const userRole = useSelector(state => state.user.role)

    return (
        <div className="useraccount">
            <h2>User Account Page</h2>
            <AuthorizeView >
                <span>
                    <h3>Email: <AuthorizedUser value="email" /></h3>
                </span>
                <span>
                    <h3>Role: <AuthorizedUser value="role" /></h3>
                </span>

                <div className="personalInfoPanel">
                    <h2 className="info">Personal Information</h2>
                    <span className="info">First Name: <AuthorizedUser value="firstName" /></span>
                    <span className="info">Last Name: <AuthorizedUser value="lastName" /></span>
                    <span className="info">Address: <AuthorizedUser value="address" /></span>
                    <span className="info">City: <AuthorizedUser value="city" /></span>
                    <span className="info">Zip Code: <AuthorizedUser value="zipCode" /></span>
                </div>
                {userRole == ADMIN_NAME && <div className="adminPanel">
                    {userRole === ADMIN_NAME && <h2>Admin Panel</h2>}
                    {userRole === ADMIN_NAME && <div className="item"><Link className="link" to="/addproduct">Add Product Role Test</Link></div>}
                    {userRole === ADMIN_NAME && <div className="item"><Link className="link" to="/addcategory">Add Category</Link></div>}
                    {userRole === ADMIN_NAME && <div className="item"><Link className="link" to="/products/2">Modify Products Page</Link></div>}
                </div>}  
            </AuthorizeView>
        </div>
  );
}

export default UserAccount;