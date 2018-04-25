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
        return ( 
            <div className = 'nav-bar'>
            <img alt = 'logo'/>
            <nav>
                <ul className = 'links'>
                    <Link to = {`/home/${this.props.user.role}`}>Home</Link>
                    <Link to = '/projects'>Projects</Link>
                    <a href = 'http://localhost:3006/logout'>Logout</a>
                </ul>
            </nav>
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