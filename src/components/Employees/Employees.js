import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getEmployees} from '../../ducks/reducer';
import Nav from '../Nav/Nav';
import {Link} from 'react-router-dom';

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
         }
    }

    componentDidMount(){
        this.props.getEmployees(this.props.user.id);
    }

    render() { 
        var renders = this.props.employees.map((value, i) => {
            return (
                <div key = {i}>
                    <h2>{value.displayname}</h2>
                    <h4>{value.company}</h4>
                    <Link to = {`/employee/${value.id}`}><button>View/Add Assigned Projects</button></Link>
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
        user: state.user,
        projects: state.projects
    }
}
export default connect(mapStateToProps, {getEmployees})(Employees);