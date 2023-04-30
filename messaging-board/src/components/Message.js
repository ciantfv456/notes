import './Message.css'
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Draggable from 'react-draggable';
import MessageForm from './MessageForm'
import { Card, CardHeader, CardBody, CardFooter, Text, Box, Button, Flex, Heading, HStack, Divider, VStack } from '@chakra-ui/react'


export function Message(props){
    const [details, setDetails] = useState({
        id: "",
        title: "",
        content: "",
        color: "",
        user: {
            username: ""
        },
        position: {
            x: 0,
            y: 0
        }
    })
    const [messageForm, setForm] = useState(false)
    
    function startDraggingEvent(e){
        var prevtouchElement = document.querySelector(".touch");
        var touchElement = document.querySelector(`#${details.id}`);
        if(prevtouchElement)
            prevtouchElement.classList.remove("touch");
        touchElement.firstChild.classList.add("touch");
    }
    
    function stopDraggingEvent(e, dragElement) {
        props.updateMessageQuery({
            variables: {
                id: details.id,
                title: details.title,
                content: details.content,
                color: details.color,
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
        message.content !== details.content ||
        message.color !== details.color
    ) {
        setDetails((prevState) => ({
            ...prevState, 
            id: message.id, title: message.title, content: message.content, color: message.color, user: {username: message.user.username}, position: {x: message.position.x, y: message.position.y}
        }))
        
    } 
    return (
    <Draggable key={details.id} onStop={stopDraggingEvent} onStart={startDraggingEvent}>
        <div className='message' id={details.id} >
            <Card colorScheme="red" key={details.id} 
            position="absolute"
            left={`${details.position.x}px`}
            top={`${details.position.y}px`}
            border="4px"
            borderColor={details.color}
            >
                <CardHeader bgColor={`${details.color}.500`}>
                    <Box>
                        <Heading size="sm" as="h3" fontWeight="bold">{details.title}</Heading>
                    </Box>
                </CardHeader>
                <CardBody bgColor={details.color}>
                <VStack alignItems="flex-start" gap={5}>
                    <Box>
                        {details.content.split("%f2n").map((val,key) => {
                            return <Text fontSize="1.1em" key={key}>{val}</Text>;
                        })}
                    </Box>
                    <Text fontSize="0.8em" color="gray.200">~by <Link to={`/profile?id=${details.id}`}>{details.user.username}</Link></Text>
                </VStack>
                </CardBody>
                <Divider color={"black"}/>
                <CardFooter bgColor={details.color}>
                    <HStack spacing="10px">
                        <Button colorScheme={details.color !== 'blue' ? 'blue' : 'linkedin'}>
                            Edit Note
                        </Button>
                        <Button colorScheme={details.color !== 'blue' ? 'blue' : 'linkedin'}>
                            Comments
                        </Button>
                    </HStack>
                </CardFooter>
            </Card>
        </div>
        
        
    </Draggable>
    )   
}
