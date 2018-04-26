import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getEmployees} from '../../ducks/reducer';
import Nav from '../Nav/Nav';

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
         }
    }

    componentDidMount(){
        this.props.getEmployees(this.props.user.id)
    }

    render() { 
        var renders = this.props.employees.map((value, i) => {
            return (
                <div key = {i}>
                    <h1>{value.displayname}</h1>
                </div>
            )
        })
        return ( 
            <div>
                <Nav />
                {renders}
            </div>
         )
    }
}
 

function mapStateToProps(state){
    return {
        employees: state.employees,
        user: state.user
    }
}
export default connect(mapStateToProps, {getEmployees})(Employees);