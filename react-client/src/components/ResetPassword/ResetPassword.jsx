import { Fragment } from "react";
const ResetPassword = ()=>{

    return (
        <Fragment>
            <div>
                <div>
                    <p>Enter your email:</p>
                    <input type="email"/>
                </div>
                <div>
                    <p>Enter your password</p>
                    <input type="password"/>
                </div>
                <div>
                    <p>Re-enter to confirm your password</p>
                    <input type="password"/>
                </div>
                <div>
                    <button>Reset Password</button>
                </div>
            </div>
        </Fragment>
    );
};

export default ResetPassword;