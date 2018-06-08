import React, { Component } from 'react';
import axios from 'axios';
import './FileUpload.css'

function sendToback(photo){
    return axios.post('/api/photoUpload', photo)
}

export default class FileUpload extends Component {
    constructor(){
        super()

        this.state={
            file: '',
            filename: '',
            filetype: '',
            location: '',
            content: ''
        }
        this.handlePhoto=this.handlePhoto.bind(this)
        this.sendPhoto=this.sendPhoto.bind(this)
    }

    handlePhoto(event){
        const reader = new FileReader()
            , file = event.target.files[0]
        
        reader.onload = photo => {
            this.setState({
                file: photo.target.result,
                filename: file.name,
                filetype: file.type
            })
        }
        reader.readAsDataURL(file)
    }

    sendPhoto(event){
        event.preventDefault()
        sendToback(this.state).then(response => {
            this.setState({
                location: response.data.Location
            })
            console.log(response.data.Location)
            this.props.newLogFn(response.data.Location, this.state.content)
        })
    }

    updateContent(e){
        this.setState({
            content: e
        })
    }

    render(){
        this.state.file && console.log(this.state.photo)
        return (
            <div className="FileUpload">
                <input name = 'file' className = 'inputfile' type="file" onChange={this.handlePhoto}/>
                <br/>
                {
                this.state.file &&
                <div className= 'preview-div'>
                    <img src={this.state.file} alt="" className="file-preview"/>  
                </div>
                }
                <label>Today's Log Description: </label>
                <input className = 'description desc-background' type = 'text' value = {this.state.content} onChange = {(e) => this.updateContent(e.target.value)}/>
                <button className = 'two-btns' onClick={this.sendPhoto}>Upload</button>
            </div>
        )
    }
}