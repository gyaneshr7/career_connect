import { Avatar } from '@material-ui/core'
import React, { useContext } from 'react'
import './Message.css'
import ThreeDotDropdown from './ThreeDotDropdown'
import { Context } from '../../context/Context'

const Message = ({ timestamp, user, message,id,onDelete }) => {
// const Message = ({ message }) => {

    // console.log(message)

    // const filteredMessage = message.split(" ").filter((s) => {return s != ""})

    const loggedInUser = useContext(Context);
    const processedMessage = message && message.split('\n').join(`<br>`)

    return (
        <div className='message' >
            <div className='message__content'> 
            <Avatar />
            <div className="message__info">

                <h4>{user && user.username}
                    <span className="message__timestamp">{new Date(timestamp?.toDate()).toUTCString()}</span>
                </h4>

                <p dangerouslySetInnerHTML={{__html: processedMessage}}>{}</p> 
        </div>
            </div>
         {user && loggedInUser.user.username === user.username && <ThreeDotDropdown id={id} onDelete={onDelete}/>}
        </div >
    )
}

export default Message
