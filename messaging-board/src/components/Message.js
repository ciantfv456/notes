import React, {Component, useState} from 'react'
import Draggable, {DraggableCore} from 'react-draggable';


function startDraggingEvent(e){
    var prevtouchElement = document.querySelector(".touch");
    var touchElement = document.querySelector(`#${this.id}`);
    console.log(prevtouchElement);
    if(prevtouchElement)
        prevtouchElement.classList.remove("touch");
    touchElement.classList.add("touch");
}

function stopDraggingEvent(e, dragElement) { 
    this.props.updateMessageQuery({
        variables: {
            id: this.details.id,
            position: {
                x: this.details.position.x + dragElement.x,
                y: this.details.position.y + dragElement.y,
            }, 
        }
    })
}

export function Message(props){
    console.log(props)
    const [details, setDetails] = useState({
        id: "",
        title: "",
        content: "",
        user: {
            username: ""
        },
        position: {
            x: 0,
            y: 0
        }
    })
    const message = props.message;
    
    if(message.id !== details.id || message.position.x !== details.position.x || message.position.y !== details.position.y || message.title !== details.title || message.content !== details.content)
        setDetails(prevState => ({
            ...prevState, 
            id: message.id, title: message.title, content: message.content, user: {username: message.user.username}, position: {x: message.position.x, y: message.position.y}
        }))
    const newStyle = {
        position: "absolute",
        left: `${details.position.x}px`,
        top: `${details.position.y}px`,
    };

    const getMessages = props.messages
        
    return (
    <Draggable key={details.id} onStop={stopDraggingEvent.bind({props: props, details: details})} onStart={startDraggingEvent.bind({id: details.id})}>
        <div>
        <div id={details.id}>
            <div style={newStyle} className='message' key={details.id}>
                <div className='title'>
                    {details.title}
                </div>
                <div className='content'>
                    <p>
                        {details.content}
                    </p>
                    <p className='writer'>- {details.user.username}</p>
                </div>
            </div>
        </div>
        </div>
    </Draggable>
    )   
}
