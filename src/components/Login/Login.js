import React from 'react';
import './Login.css';
import Logo from './Job-Oversight-logo.png'

export default function Login(props){
    return (
        <div className = 'outer-login'>
            <img className = 'logo' src = {Logo} alt = 'img'/>
            <div>
                <a href = {process.env.REACT_APP_LOGIN}><button className = 'login-btn'>Login</button></a>
            </div>
            

        </div>
    )
}