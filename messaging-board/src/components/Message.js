import './Message.css'
import React, {useState} from 'react'
import Draggable from 'react-draggable';


export function Message(props){
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
    function startDraggingEvent(e){
        var prevtouchElement = document.querySelector(".touch");
        var touchElement = document.querySelector(`#${details.id}`);
        if(prevtouchElement)
            prevtouchElement.classList.remove("touch");
        touchElement.classList.add("touch");
    }
    
    function stopDraggingEvent(e, dragElement) {
        props.updateMessageQuery({
            variables: {
                id: details.id,
                title: details.title,
                content: details.content,
                position: {
                    x: details.position.x + dragElement.x,
                    y: details.position.y + dragElement.y,
                }, 
            }
        })
    }

    const message = props.message;
    if (
        message.id !== details.id || 
        message.position.x !== details.position.x || 
        message.position.y !== details.position.y || 
        message.title !== details.title || 
        message.content !== details.content
    ) {
        setDetails((prevState) => ({
            ...prevState, 
            id: message.id, title: message.title, content: message.content, user: {username: message.user.username}, position: {x: message.position.x, y: message.position.y}
        }))
        
    } 
    return (
    <Draggable key={details.id} onStop={stopDraggingEvent} onStart={startDraggingEvent}>
        <div>
        <div id={details.id}>
            <div style={{
                position: "absolute",
                left: `${details.position.x}px`,
                top: `${details.position.y}px`,
                }} 
                className='message' 
                key={details.id}
            >
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
