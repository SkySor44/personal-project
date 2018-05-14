import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import {getUser2} from '../../ducks/reducer';
import './Home.css';
import {Link} from 'react-router-dom';
import {Parallax} from 'react-parallax';
import image from './construction-site-darker.png';

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }

    componentDidMount(){
        this.props.getUser2();
    }

    render() { 
        return ( 
            <div>
                <Nav />
                <div className = 'main-img'>
                    <Parallax className = 'parallax' bgImage = {image} strength = {500} bgImageSize = {"cover"}><div>
                        <h1 className = 'main-text' >Saving Time and Money</h1>
                        <h2 className = 'sub-main-text'>With Construction Job Site Management</h2>
                    </div></Parallax>
                </div>
                
                <div className = 'get-started'>
                    <h2>MY ID: {this.props.user.id}</h2>
                    <p>(Give ID to Employees when they register)</p>
                    <h2>Get Started</h2>
                    <p>Click Below to Manage Employees and Projects</p>
                </div>
                <div className = 'pages-div'>
                <Link className = 'projects-div' to = '/projects'><div>
                    <h1 className = 'section-2'>Projects</h1>
                </div></Link>
                <Link className = 'employees-div' to = '/employees'><div>
                    <h1 className = 'section-1'>Employees</h1>
                </div></Link>
                </div>
            </div>
         )
    }
}
 
function mapStateToProps(state){
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {getUser2})(AdminHome);