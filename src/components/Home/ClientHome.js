import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {Parallax} from 'react-parallax';
import image from './home.jpg';
import {Link} from 'react-router-dom';


class ClientHome extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }
    render() { 
        return ( 
            <div>
                <Nav />
                <div className = 'main-img'>
                    <Parallax className = 'parallax' bgImage = {image} strength = {500} bgImageSize = {"cover"}><div>
                        <h1 className = 'main-text' >Check On Your Home</h1>
                    </div></Parallax>
                </div>

                <div className = 'get-started'>
                    <h2>Get Started</h2>
                    <p>Click Below to View Progress or Chat</p>
                </div>

                <div className = 'pages-div'>
                <Link className = 'projects-div' to = '/progress'><div>
                    <h1 className = 'section-2'>Progress</h1>
                </div></Link>
                <Link className = 'employees-div' to = '/chat'><div>
                    <h1 className = 'section-1'>Chat</h1>
                </div></Link>
                </div>
            </div>
         )
    }
}
 
export default ClientHome;