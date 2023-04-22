import React from 'react'
import {createSignal} from 'solid-js'
import {LoadingScreen} from './LoadingScreen'
import {Message} from './Message'
import {graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash';
import {getMessagesQuery, updateMessageQuery} from "../queries/queries"


function Messages(props) {
    const [getMessages, setMessages] = createSignal([])
    function readMessages() {
        console.log(props)
        if (props.getMessagesQuery.loading) {
            return <LoadingScreen/>
        }
        if(getMessages().length == 0) {
            setMessages(props.getMessagesQuery.messages.map(message => {
                return <Message message={message} messages={getMessages} setMessages={setMessages} updateMessageQuery={props.updateMessageQuery}/>
            }))
        }
        return getMessages()
    }
    return <div>
        {readMessages()}
    </div>

}
export default compose(
    graphql(getMessagesQuery, {name: "getMessagesQuery"}),
    graphql(updateMessageQuery, {name: "updateMessageQuery"}),
)(Messages);