import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getProgress, getUser2} from '../../ducks/reducer';
import Nav from '../Nav/Nav';
import './Progress.css';
import {Link} from 'react-router-dom';

class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }

    componentDidMount(){
        this.props.getUser2()
        this.props.getProgress(this.props.user.supervisor_id)
    }

    render() { 
        let renders = this.props.progress.map((log, i) => {
           return log.show_client ?
            <div className = 'log-contain'>
                <h2>{log.content}</h2>
                <img src = {log.image_url} alt = 'img'/>
                <h3>{log.time_stamp}</h3>
            </div> : null
        })
        return ( 
            <div>
                <Nav />
                <div className = 'client-contain'>
                    {/* <div className = 'main-img'>
                        <Parallax className = 'parallax' bgImage = {image} strength = {500} bgImageSize = {"cover"}><div>
                            <h1 className = 'main-text' >Progress</h1>
                        </div></Parallax>
                    </div> */}
                    <div className = 'my-progress-btns'>
                    <Link to = '/home/client'><button className = 'two-btns'>Back</button></Link>
                    <Link to = '/chat'><button className = 'two-btns'>Chat</button></Link>
                    </div>
                    <h1 className = 'recent-updates'>Recent Updates: </h1>
                    
                    {renders}
                </div>
                
            </div>
         )
    }
}
 

function mapStateToProps(state){
    return {
        progress: state.progress,
        user: state.user
    }
}
export default connect(mapStateToProps, {getProgress, getUser2})(Progress);