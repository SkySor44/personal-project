import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getEmployees} from '../../ducks/reducer';
import Nav from '../Nav/Nav';
import {Link} from 'react-router-dom';
import './Employees.css';
import IoAndroidPerson from 'react-icons/lib/io/android-person';
import {Parallax} from 'react-parallax';
import image from './crop-construction-workers.jpg'

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
                <div className = 'employees-contain' key = {i}>
                    <IoAndroidPerson className = 'person'/>
                    <div className = 'person-info'>
                        <h2>{value.displayname}</h2>
                        <h4>{value.company}</h4>
                        <Link to = {`/employee/${value.id}`}><button>View Projects</button></Link>
                    </div>
                    
                </div>
            )
        })
        return ( 
            <div>
                <Nav />
                <div className = 'employees-header'>
                    <Parallax className = 'parallax-emp' bgImage = {image} strength = {500} bgImageSize = {"cover"}><div>
                        <h1>My Employees:</h1>
                    </div></Parallax>
                </div>
                <div className = 'employees-control'>
                    {renders}
                </div>
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