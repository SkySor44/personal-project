import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';
import CreateUser from '../CreateUser/CreateUser';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }
    
    componentDidMount(){
        
        this.props.getUser();
        
    }

    render() { 
       var info = this.props.user.company && this.props.user.role ? <div>
       <Nav />
       <img /> 
       <h2>PROJECTS</h2>
       <p>3 Random Projects this User is a part of</p>
   </div> : 
            <div>
            <CreateUser />
        </div>
        return ( 
            <div>
                {info}
            </div>
            
         )
    }
}
 

function mapStateToProps(state){
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {getUser})(Home);