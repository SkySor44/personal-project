import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Nav.css'
import Logo from '../Login/Job-Oversight-logo.png'


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }
    render() { 

     var renders =   this.props.user.role === 'employee' ? 
    <div className = 'nav-bar'>
        <img className = 'logo-menu' src = {require("/Users/skylersorensen/src/personal-project/personal-project/src/components/Login/Job-Oversight-logo.png")} alt = 'img'/>
        <nav>
            <ul className = 'links'>
                <Link to = {`/home/${this.props.user.role}`}>Home</Link>
                <Link to = '/projects'>Projects</Link>
                <a href = 'http://localhost:3006/logout'>Logout</a>
            </ul>
        </nav>
    </div> :
    <div className = 'nav-bar'>
        <img alt = 'logo'/>
        <nav>
            <ul className = 'links'>
                <Link to = {`/home/${this.props.user.role}`}>Home</Link>
                <Link to = '/projects'>Projects</Link>
                <Link to = '/employees'>Employees</Link>
                <a href = 'http://localhost:3006/logout'>Logout</a>
            </ul>
        </nav>
    </div>
        return ( 
            <div className = 'nav-bar'>
                {renders}
            </div>
         )
    }
}
 

function mapStateToProps(state){
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Nav);