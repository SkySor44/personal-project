import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';
import CreateUser from '../CreateUser/CreateUser'

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount(){
        this.props.getUser();
    }

    render() { 
        var info = this.props.user.company && this.props.user.role ? <div>
       Loading...
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
export default connect(mapStateToProps, {getUser})(Loading);