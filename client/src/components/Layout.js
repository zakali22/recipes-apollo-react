import React from 'react';
import {Link} from "react-router-dom"

const Layout = props => {
    return (
        <div>
            <nav className="nav">
                <div class="container">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/search">Search</Link></li>
                        <li><Link to="/signin">Signin</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
};

export default Layout