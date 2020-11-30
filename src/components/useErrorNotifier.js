import { useEffect, useRef, useState } from 'react'
import socketIOClient from 'socket.io-client'

const NEW_MESSAGE_EVENT = 'clientErrorNotification'
const SOCKET_SERVER_URL = 'http://localhost:8000'

const useErrorNotifier = () => {
  const [messages, setMessages] = useState([])
  const socketRef = useRef()

  useEffect(() => {
    
    socketRef.current = socketIOClient(SOCKET_SERVER_URL)//Puede llevar un segundo parametro query 
    
    socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      }
      setMessages((messages) => [...messages, incomingMessage])
    })
    
    return () => {
      socketRef.current.disconnect()
    }
  }, [])
  
  const sendMessage = (messageBody) => {//puede recibir el evento como parametro para hacerlo dinamico
    socketRef.current.emit(NEW_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    })
  }

  return { messages, sendMessage }
}

export default useErrorNotifier