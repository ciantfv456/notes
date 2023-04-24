import React, { useState } from 'react'
import {LoadingScreen} from './LoadingScreen'
import {Message} from './Message'
import {graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash';
import {getMessagesQuery, updateMessageQuery} from "../queries/queries"
import MessageForm from './MessageForm';

function Messages(props) {
    const [messageEdit, setMessageEdit] =  useState({})
    function readMessages() {
        console.log('a')
        if (props.getMessagesQuery.loading) {
            return <LoadingScreen/>
        }
        
        return (props.getMessagesQuery.messages.map(message => {
            return <Message onClick={setMessageEdit} message={message} getMessagesQuery={props.getMessagesQuery} updateMessageQuery={props.updateMessageQuery}/>
        }))
        
    }
    return <div>
        {readMessages()}
        { Object.keys(messageEdit).length === 0 ? "": <MessageForm message={messageEdit} />}
    </div>

}
export default compose(
    graphql(getMessagesQuery, {name: "getMessagesQuery", options: {
        fetchPolicy: 'no-cache' 
   }}),
    graphql(updateMessageQuery, {name: "updateMessageQuery"}),
)(Messages);