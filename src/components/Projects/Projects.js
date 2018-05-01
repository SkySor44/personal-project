import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import {getProjects} from '../../ducks/reducer';
import {Link} from 'react-router-dom';
import home from './Home-yello.png';
import './Projects.css'

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }

    componentDidMount(){
        this.props.getProjects()
    }

    render() { 
        var mappedProjects = this.props.projects.map((project, i) => {
           return(
            <div key = {i} className = 'project-contain'>
                <img className = 'home-icon' src = {home} alt = 'home'/>
                <Link className = 'project-link' to = {`/project/${project.project_id}`}><h1>{project.name}</h1></Link>
                <label className = 'location'>Location: </label>
                <h2 className = 'location'>{project.location}</h2>
            </div>
           ) 
        })
                
                
        return ( 
            <div className = 'projects-wrap'>
                <Nav />
                <div className = 'projects-header'>
                    <h1>Current Projects:</h1>
                </div>
                
                {mappedProjects}
            </div>
         )
    }
}
 

function mapStateToProps(state){
    return {
        projects: state.projects
    }
}
export default connect(mapStateToProps, {getProjects})(Projects);