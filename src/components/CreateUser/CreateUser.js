import React, { Component } from 'react';
import {connect} from 'react-redux';
import {finishCreation, getUser2} from '../../ducks/reducer';
import {Link} from 'react-router-dom';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            company: '',
            role: '',
            employee: null
         }
    }

    componentDidMount(){
        this.props.getUser2()
    }

    updateAdmin(){
        this.setState({
            role: 'admin',
            employee: false
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
      var rendering =  
      
      this.state.role === 'employee' ? <div>
            <label>Company Code (given to you by your employer): </label>
            <input type = 'text' value = {this.state.company} onChange = {(e) => this.updateCompany(e.target.value)}/>
            <Link to = {`/home/${this.state.role}`}><button onClick = {() => this.finishCreationFn()}>SUBMIT</button></Link>
        </div> : 

        this.state.role === 'admin' ?
        <div> 
            <label>Company Name: </label>
            <input type = 'text' value = {this.state.company} onChange = {(e) => this.updateCompany(e.target.value)}/>
            <Link to = {`/home/${this.state.role}`}><button onClick = {() => this.finishCreationFn()}>SUBMIT</button></Link>
        </div> : 
        
        this.state.role === '' ? 
        <div>
            <h1>Almost Done...</h1>
                <label>Role: </label>
                <button onClick = {() => this.updateAdmin()}>Admin</button>
                <button onClick = {() => this.updateEmployee()}>Employee</button>
        </div> : null
        return ( 
            <div>
               {rendering}
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