import React from 'react';
import './Login.css';
import Logo from './Job-Oversight-logo.png'

export default function Login(props){
    return (
        <div className = 'outer-login'>
            <img className = 'logo' src = {Logo} alt = 'img'/>
            <div>
                <a href = 'http://localhost:3006/auth'><button className = 'login-btn'>Login</button></a>
            </div>
            

        </div>
    )
}