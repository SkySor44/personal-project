import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Nav.css'
import Logo from './Job-Oversight-logo-2.png'
import FaBars from 'react-icons/lib/fa/bars'


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            open: false
         }
    }

    toggle_menu(){
        this.setState({
            open: !this.state.open
        })
    }

    render() { 

     var renders =   this.props.user.role === 'employee' && this.state.open === true ? 
     <div className = 'nav-bar-open'>
     <div className = 'open-menu'>
         <FaBars className = 'invisible'/>
         <Link to = '/home/employee'><img className = 'logo-menu' src = {Logo} alt = 'img'/></Link>
         <button className = 'invisible-btn' onClick = {() => this.toggle_menu()}><FaBars className = 'menu-bars'/></button>
     </div>
     
     <nav className = 'nav-2'>
         <ul className = 'links'>
             <div className = 'link-contain'>
                 <Link className = 'link' to = {`/home/${this.props.user.role}`}><p>Home</p></Link>
             </div>
             <div className = 'link-contain'>
                 <Link className = 'link' to = '/projects'><p>Projects</p></Link>
             </div>
             <div className = 'link-contain'>
                 <a className = 'link' href = {process.env.REACT_APP_LOGOUT}>Logout</a>
             </div>
             
         </ul>
     </nav>
 </div> 
    : this.props.user.role === 'admin' && this.state.open === true ?
    <div className = 'nav-bar-open'>
        <div className = 'open-menu'>
            <FaBars className = 'invisible'/>
            <Link to = '/home/admin'><img className = 'logo-menu' src = {Logo} alt = 'img'/></Link>
            <button className = 'invisible-btn' onClick = {() => this.toggle_menu()}><FaBars className = 'menu-bars'/></button>
        </div>
        
        <nav className = 'nav-2'>
            <ul className = 'links'>
                <div className = 'link-contain'>
                    <Link className = 'link' to = {`/home/${this.props.user.role}`}><p>Home</p></Link>
                </div>
                <div className = 'link-contain'>
                    <Link className = 'link' to = '/projects'><p>Projects</p></Link>
                </div>
                <div className = 'link-contain'>
                    <Link className = 'link' to = '/employees'><p>Employees</p></Link>
                </div>
                <div className = 'link-contain'>
                    <a className = 'link' href = {process.env.REACT_APP_LOGOUT}>Logout</a>
                </div>
                
            </ul>
        </nav>
    </div> 
    : this.props.user.role === 'client' ?
            <div className = 'nav-bar'>
                <FaBars className = 'invisible'/>
                <Link to = '/home/client'><img className = 'logo-menu' src = {Logo} alt = 'img'/></Link>
            <nav>
                <div className = 'link-contain1'>
                    <a className = 'link' href = {`${process.env.REACT_APP_LOGOUT}`}>Logout</a>
                </div>           
            </nav> 
            </div> :
    
    this.props.user.role === 'employee' && this.state.open === false ?
    <div className = 'nav-bar'>
        <FaBars className = 'invisible'/>
        <Link to = '/home/employee'><img className = 'logo-menu' src = {Logo} alt = 'img'/></Link>
        <nav>
            <button className = 'invisible-btn' onClick = {() => this.toggle_menu()}><FaBars className = 'menu-bars'/></button>
        </nav> 
    </div> : this.props.user.role === 'admin' && this.state.open === false ?
    <div className = 'nav-bar'>
        <FaBars className = 'invisible'/>
        <Link to = '/home/admin'><img className = 'logo-menu' src = {Logo} alt = 'img'/></Link>
        <nav>
            <button className = 'invisible-btn' onClick = {() => this.toggle_menu()}><FaBars className = 'menu-bars'/></button>
        </nav> 
    </div> : null
        return ( 
            <div className = 'nav-bar-1 '>
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