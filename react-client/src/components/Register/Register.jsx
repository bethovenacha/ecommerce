import {useState,useEffect,Fragment} from 'react';
import { v4 as uuidv4 } from 'uuid';


const Register = ()=>{

    const onRegister = ({})=>{
        const id = uuidv4();
        console.log(id);
    };
    
    return (
        <Fragment>
            <div>
                <div>
                    <label htmlFor="fullName">Full Name: </label>
                    <input type="text" id="fullName" name="fullName" />
                </div>
                <div>
                    <label htmlFor="address">Address: </label>
                    <input type="text" id="address" name="address"/>
                </div>
                <div>
                    <label htmlFor="contact">Contact Number: </label>
                    <input type="text" id="contact" name="contact"/>
                </div>
                <div>
                    <button onClick={onRegister}>Register</button>
                </div>
            </div>
        </Fragment>
    );
};

export default Register;