import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import {getUser2} from '../../ducks/reducer';
import {Link} from 'react-router-dom';

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }

    componentDidMount(){
        this.props.getUser2();
    }

    render() { 
        return ( 
            <div>
                <Nav />
                <h1>Welcome {this.props.user.displayname}!</h1>
            </div>
         )
    }
}
 
function mapStateToProps(state){
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {getUser2})(AdminHome);