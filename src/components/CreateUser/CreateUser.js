import React, { Component } from 'react';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            company: '',
            role: ''
         }
    }

    updateAdmin(){
        this.setState({
            role: 'Admin'
        })
    }

    updateEmployee(){
        this.setState({
            role: 'Employee'
        })
    }

    updateCompany(e){
        this.setState({
            company: e
        })
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
                <button>SUBMIT</button>
            </div>
         )
    }
}
 
export default CreateUser;