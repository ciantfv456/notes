import {gql} from 'apollo-boost'

const getMessagesQuery = gql`
    {
        messages {
            title
            content
            color
            id
            user {
                username
                id
            }
            position {
                x
                y
            }
        }
    }
`
const updateMessageQuery = gql`
    mutation($id: ID!, $title: String, $content: String, $position: PositionInput) {
        updateMessage(id: $id, title: $title, content: $content, position: $position) {
            id
            title
            content
            color
            position {
                x
                y
            }
        }
    }
`
export {updateMessageQuery, getMessagesQuery}