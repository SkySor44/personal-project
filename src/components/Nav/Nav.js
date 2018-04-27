import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }
    render() { 

     var renders =   this.props.user.role === 'employee' ? 
    <div className = 'nav-bar'>
        <img alt = 'logo'/>
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
            <div>
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