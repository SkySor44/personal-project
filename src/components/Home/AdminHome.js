import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';

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