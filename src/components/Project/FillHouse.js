import React, { Component } from 'react';
import home from '../Projects/Home-yello.png';
import ten from './Home10.png';
import twenty from './Home20.png';
import thirty from './Home30.png';
import forty from './Home40.png';
import fifty from './Home50.png';
import sixty from './Home60.png';
import seventy from './Home70.png';
import eighty from './Home80.png';
import ninety from './Home90.png';
import hundred from './Home100.png';
import './Project.css'



class FillHouse extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }
    render() { 
       var newPercent = Math.round(this.props.percentage / 10);
        var nearestTenth = newPercent * 10;
      var render =  nearestTenth === 10 ?
        <div>
            <img className = 'home-icon-2' src = {ten} alt = 'home'/>
        </div> : nearestTenth === 20 ?
        <div>
            <img className = 'home-icon-2' src = {twenty} alt = 'home'/>
        </div> : nearestTenth === 30 ?
        <div>
            <img className = 'home-icon-2' src = {thirty} alt = 'home'/>
        </div> : nearestTenth === 40 ?
        <div>
            <img className = 'home-icon-2' src = {forty} alt = 'home'/>
        </div> : nearestTenth === 50 ?
        <div>
            <img className = 'home-icon-2' src = {fifty} alt = 'home'/>
        </div> : nearestTenth === 60 ?
        <div>
            <img className = 'home-icon-2' src = {sixty} alt = 'home'/>
        </div> : nearestTenth === 70 ?
        <div>
            <img className = 'home-icon-2' src = {seventy} alt = 'home'/>
        </div> : nearestTenth === 80 ?
        <div>
            <img className = 'home-icon-2' src = {eighty} alt = 'home'/>
        </div> : nearestTenth === 90 ?
        <div>
            <img className = 'home-icon-2' src = {ninety} alt = 'home'/>
        </div> : nearestTenth === 100 ?
        <div>
            <img className = 'home-icon-2' src = {hundred} alt = 'home'/>
        </div> : null

        return ( 
            <div>
                {render}
            </div>
         )
    }
}
 
export default FillHouse;