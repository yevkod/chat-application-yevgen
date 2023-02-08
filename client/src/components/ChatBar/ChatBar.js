import React, {useState, useEffect} from 'react'

export const ChatBar = ({socket}) => {
    const [users, setUsers] = useState([]);
    const [newUserName, setNewUserName] = useState('')
    const [userWebSocketId, setUserWebSocketId] = useState('')


    const changeName = (userObj) => {
        
        socket.emit("changeUser", {userInitialName:userObj[0].userName, userNewName:newUserName, socketID: userObj[0].socketID})       
    }

    useEffect(() => {
        socket.on("newUserName", data => {
            setUsers(data)
            console.log('n412412421',data[0].userName)
            localStorage.removeItem('userName')
            localStorage.setItem('userName',data[0].userName)
        })
    }, [socket, users])

    useEffect(() => {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])

    useEffect(() => {
        const socketId = localStorage.getItem('socket.id')
        setUserWebSocketId(socketId)
    }, [])

    console.log('users.filter((user) => user.socketID === userWebSocketId',users.filter((user) => user.socketID === userWebSocketId))
    return (
        <div className='chat__sidebar'>
            <h2>Chat</h2>
            <div>
                <h4 className='chat__header'>ACTIVE USERS</h4>
                <div className='chat__users'>
                    {users.map(user => <p key={user.socketID}>{user.userName}</p>)}
                    <div>
                      
                            <input type="text" placeholder="Your new name.." onChange={(e) => {
                                setNewUserName(e.target.value)
                            }}/>
                            <button onClick={() => changeName(users.filter((user) => user.socketID === userWebSocketId))}>changeName</button>
        
                    </div>
                </div>
            </div>
        </div>
    )
}
