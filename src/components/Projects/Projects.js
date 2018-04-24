import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import {getProjects} from '../../ducks/reducer';
import {Link} from 'react-router-dom';

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
        console.log(this.props.projects)
        var mappedProjects = this.props.projects.map((project, i) => {
           return(
            <div key = {i}>
                <Link to = {`/project/:${project.project_id}`}><h1>{project.name}</h1></Link>
                <h2>{project.location}</h2>
            </div>
           ) 
        })
                
                
        return ( 
            <div>
                <Nav />
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