import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser2} from '../../ducks/reducer';
import axios from 'axios';
import io from 'socket.io-client';
const socket = io();



class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            newMessage: '',
            messages: []
         }
    }

    componentDidMount(){
        this.props.getUser2()
        let body = {
            project_id: this.props.user.supervisor_id
        }
        axios.post(process.env.REACT_APP_GET_CLIENT_MESSAGES, body).then(res => {
            this.setState({
                messages: res.data
            })
        })
        socket.on(`client${this.props.user.supervisor_id}`, data => {
            const messages = [...this.state.messages, data];
            this.setState({
                messages: messages
            })
        })
    }

    updateNewMessage(e){
        this.setState({
            newMessage: e
        })
    }

    sendMessage(message, type){
        var currentDate = new Date()
        var time_stamp = (currentDate.getMonth()+1) + "/"
        + currentDate.getDate() + "/" 
        + currentDate.getFullYear() + " @ "  
        + currentDate.getHours() + ":"  
        + currentDate.getMinutes();

        let clientObj = {
            message: message,
            displayname: this.props.user.displayname,
            time_stamp: time_stamp,
            project_id: this.props.user.supervisor_id,
            user_id: this.props.user.id,
            type: 'client'
        }
        socket.emit(`${type} message`, clientObj)
        this.setState({
          newMessage: ''
        })
        let newMessBod = {
            message: message,
            user_id: this.props.user.id,
            project_id: this.props.user.supervisor_id,
            time_stamp: time_stamp,
            type: 'client'
        }
        axios.post(REACT_APP_ADD_CLIENT_MESSAGE, newMessBod).then(res => {
            return res.data
        })
      }

    render() { 

        const mappedMessages = this.state.messages.map((e, i)=> {
            return e.user_id === this.props.user.id ?
             <div className = 'myMessages' key = {i}>
                 <div className = 'message-title'>
                     <h3>{e.displayname}</h3>
                     <p>{e.time_stamp}</p>
                 </div>
                 <div className = 'mytranslators'>
                     <button onClick = {() => this.translateToSpanish(e.message, i)}>Spanish</button>
                     <button onClick = {() => this.translateToEnglish(e.message, i)}>English</button>
                 </div>
                 <p>{e.message}</p>
             </div> :
             <div className = 'messages' key = {i}>
                 <div className = 'message-title'>
                     <h3>{e.displayname}</h3>
                     <p>{e.time_stamp}</p>
                 </div>
                 <div className = 'translators'>
                     <button onClick = {() => this.translateToSpanish(e.message, i)}>Spanish</button>
                     <button onClick = {() => this.translateToEnglish(e.message, i)}>English</button>
                 </div>
                 <p>{e.message}</p>
                 
             </div>
             
           })

        return ( 
            <div>
                <Nav />
                <div className = 'chat-whole-contain'>
                    <div className = 'my-progress-btns'>
                        <Link to = '/home/client'><button className = 'two-btns'>Back</button></Link>
                        <Link to = '/progress'><button className = 'two-btns'>Progress</button></Link>
                    </div>
                    <h1 className = 'recent-updates'>Chat: </h1>
                    <div className = 'chat-box'>
                        {mappedMessages}
                    </div>
                    <div className = 'new-message'>
                        <input type = 'text' placeholder = 'Enter New Message' value = {this.state.newMessage} onChange = {(e) => this.updateNewMessage(e.target.value)}/>
                        <button className = 'two-btns' onClick = {() => {this.sendMessage(this.state.newMessage, 'client')}}>Post Message</button>
                
                    </div>
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
export default connect(mapStateToProps, {getUser2})(Chat);