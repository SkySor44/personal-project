import React, { Component } from 'react';
import {connect} from 'react-redux';
import {finishCreation, getUser2, finishEmployee} from '../../ducks/reducer';
import {Link} from 'react-router-dom';
import './CreateUser.css';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            company: '',
            role: '',
            employee: null,
            supervisor: ''
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

    updateSupervisor(e){
        this.setState({
            supervisor: e
        })
    }


    finishCreationAdmin(){
        const {id, user_id, displayname} = this.props.user
        const {company, role} = this.state
        this.props.finishCreation(company, role, id, user_id, displayname)
        this.setState({
            company: '',
            role: '',
            supervisor: ''
        })
    }

    finishCreationEmp(){
        const {id} = this.props.user;
        const {company, role, supervisor} = this.state;
        this.props.finishEmployee(company, role, supervisor, id)
        this.setState({
            company: '',
            role: '',
            supervisor: ''
        })
    }

    updateClient(){
        this.setState({
            role: 'client',
            company: 'none'
        })
    }

    render() { 
      var rendering =  
      
      this.state.role === 'employee' ? <div className = 'createuser-contain'>
            <label>Company: </label>
            <input type = '' value = {this.state.company} onChange = {(e) => this.updateCompany(e.target.value)}/>
            <label>Supervisor Code (given to you by your employer): </label>
            <input type = 'text' value = {this.state.supervisor} onChange = {(e) => this.updateSupervisor(e.target.value)}/>
            <Link to = {`/home/${this.state.role}`}><button onClick = {() => this.finishCreationEmp()}>SUBMIT</button></Link>
        </div> : 

        this.state.role === 'admin' ?
        <div className = 'createuser-contain'> 
            <label>Company Name: </label>
            <input type = 'text' value = {this.state.company} onChange = {(e) => this.updateCompany(e.target.value)}/>
            <Link to = {`/home/${this.state.role}`}><button onClick = {() => this.finishCreationAdmin()}>SUBMIT</button></Link>
        </div> : 
        this.state.role === 'client' ?
        <div className = 'createuser-contain'>
            <label>Home Code (given to you by your contractor): </label>
            <input type = 'text' value = {this.state.supervisor} onChange = {(e) => this.updateSupervisor(e.target.value)}/>
            <Link to = {`/home/${this.state.role}`}><button className = 'two-btns' onClick = {() => this.finishCreationEmp()}>SUBMIT</button></Link>
        </div> :
        
        this.state.role === '' ? 
        <div className = 'createuser-contain'>
            <h1>Almost Done...</h1>
                <label>Select Role: </label>
                <div className = 'createuser-btns'>
                    <button className = 'two-btns' onClick = {() => this.updateAdmin()}>Admin</button>
                    <button className = 'two-btns' onClick = {() => this.updateEmployee()}>Employee</button>
                    <button className = 'two-btns' onClick = {() => this.updateClient()}>Client</button>
                </div>
                
        </div> : null
        return ( 
            <div className = 'createuser-control'>
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
export default connect(mapStateToProps, {finishCreation, getUser2, finishEmployee})(CreateUser);