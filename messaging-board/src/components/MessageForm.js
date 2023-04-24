import './MessageForm.css'
export default function MessageForm(props) {
    const title = props.message.title ? props.message.title : "";
    const content = props.message.content ? props.message.content : "";
    return (
        <div className="messageForm">
            <textarea maxLength={30} className='messageFormtext' placeholder='Enter Title' defaultValue={title}/>
            <textarea className='messageFormtext' placeholder='Enter Content' defaultValue={content}/>
        </div>
    )
}
