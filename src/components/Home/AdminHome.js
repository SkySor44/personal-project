import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';
import {Link} from 'react-router-dom';

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }

    componentDidMount(){
        this.props.getUser();
    }

    render() { 
        return ( 
            <div>
                <Nav />
                <h1>Welcome {this.props.user.displayname}!</h1>
                <Link to = '/projects'><button>Projects</button></Link>
            </div>
         )
    }
}
 
function mapStateToProps(state){
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {getUser})(AdminHome);