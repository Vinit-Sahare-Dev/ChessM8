import React, { useState, useEffect } from 'react';

const replies = {
  hello: ['Hii there!', 'Hi!', 'Hello!', 'Hey!'],
  goodbye: ['Goodbye!', 'See you later!', 'Farewell!'],
  thanks: ['You\'re welcome!', 'No problem!', 'Anytime!'],
  how: ['I\'m doing well, thanks!', 'I\'m good, thanks!', 'I\'m great, thanks!'],
  what: ['I\'m a chess chatbot!', 'I\'m a chatbot that loves chess!', 'I\'m a chatbot designed to talk about chess!'],
  default: ['That\'s a great point!', 'I see what you mean...', 'Interesting...'],
};

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('Anonymous');

  useEffect(() => {
    // Initialize chat with some default messages
    setMessages([
      { text: 'Welcome to the chess chat!', username: 'ChessM8', timestamp: new Date() },
    ]);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([
        ...messages,
        { text: newMessage, username, timestamp: new Date() },
      ]);

      // Reply to the message
      const reply = getReply(newMessage.toLowerCase());
      setTimeout(() => {
        setMessages([
          ...messages,
          { text: newMessage, username, timestamp: new Date() },
          { text: reply, username: 'ChessM8', timestamp: new Date() },
        ]);
      }, 1000); // wait 1 second before replying
    }
  };

  const getReply = (message) => {
    if (message.includes('hello') || message.includes('hii')) {
      return getRandomReply(replies.hello);
    } else if (message.includes('goodbye')) {
      return getRandomReply(replies.goodbye);
    } else if (message.includes('thanks')) {
      return getRandomReply(replies.thanks);
    } else if (message.includes('how are you')) {
      return getRandomReply(replies.how);
    } else if (message.includes('what are you')) {
      return getRandomReply(replies.what);
    } else {
      return getRandomReply(replies.default);
    }
  };

  const getRandomReply = (replies) => {
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="chat-box">
      <ul className="message-list">
        {messages.map((message, index) => (
          <li key={index}>
            <span className="username">{message.username}</span>
            <span className="message">{message.text}</span>
            <span className="timestamp">{message.timestamp.toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        className="message-input"
      />
      <button onClick={handleSendMessage} className="send-button">
        Send
      </button>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Username"
        className="username-input"
      />
    </div>
  );
};

export default ChatBox;