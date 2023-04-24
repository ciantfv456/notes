import React, {Component} from 'react'
import loader from "../loading.gif"


export class LoadingScreen extends Component {
    render(){
        return <div className="loader" style={{height:'100vh', width:"100%"}}>
        <center>
            <img src={loader} height="50%" width="50%" alt=""/>
        </center>
         </div>
    }
}