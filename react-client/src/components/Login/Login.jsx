import { useState, Fragment } from "react";
import {Link} from 'react-router-dom';

const Login = () =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Fragment>
            <div>
                <div>
                    <label htmlFor="userName">Username:</label>
                    <input type="text" id="userName"/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="text" id="password"/>
                </div>
                <div>
                    <button>Login</button>
                </div>
                <div>
                    <label htmlFor="linkToRegister">Dont have an account?</label>
                    <Link to={"/Register"} id="linkToRegister"> Click here to register</Link>
                </div>
                <div>
                    <label htmlFor="linkToReset">Forgot your password?</label>
                    <Link to={"/ResetPassword"} id="linkToReset"> Click here to Reset Password</Link>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;