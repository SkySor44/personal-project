import React, { Component } from 'react';
import {connect} from 'react-redux';
import {finishCreation, getUser2} from '../../ducks/reducer';
import {Link} from 'react-router-dom';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            company: '',
            role: ''
         }
    }

    componentDidMount(){
        this.props.getUser2()
    }

    updateAdmin(){
        this.setState({
            role: 'admin'
        })
    }

    updateEmployee(){
        this.setState({
            role: 'employee'
        })
    }

    updateCompany(e){
        this.setState({
            company: e
        })
    }

    finishCreationFn(){
        const {id, user_id, displayname} = this.props.user
        const {company, role} = this.state
        this.props.finishCreation(company, role, id, user_id, displayname)
    }

    render() { 
        return ( 
            <div>
                <h1>Almost Done...</h1>
                <label>Company Name: </label>
                <input type = 'text' value = {this.state.company} onChange = {(e) => this.updateCompany(e.target.value)}/>
                <label>Role: </label>
                <button onClick = {() => this.updateAdmin()}>Admin</button>
                <button onClick = {() => this.updateEmployee()}>Employee</button>
                <Link to = {`/home/${this.state.role}`}><button onClick = {() => this.finishCreationFn()}>SUBMIT</button></Link>
            </div>
         )
    }
}
 

function mapStateToProps(state){
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {finishCreation, getUser2})(CreateUser);