'use client'
import { useState } from 'react'
import { Box, Stack, Button, TextField, Typography } from '@mui/material'

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      parts: [{ text: "Hi I'm your ChatBot Assistant! How may I help you?" }]
    }
  ])
  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    setMessage('')
    const updatedMessages = [
      ...messages,
      { role: "user", parts: [{ text: message }] },
    ];
    setMessages((messages) => [
      ...updatedMessages,
      { role: 'model', parts: [{ text: '' }] }
    ]);

    const response = await fetch('/api/chat', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ history: updatedMessages })
    });
    
    const data = await response.json();
    setMessages((messages) =>
      messages.map((msg, index) =>
        index === messages.length - 1
          ? { ...msg, parts: [{ text: data.message }] }
          : msg
      )
    );
  };

  return (
    <Box
      width='100vw'
      height='100vh'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      sx={{
        backgroundImage:'url(https://i.pinimg.com/736x/2a/a7/8a/2aa78a2c8fbe91b37bfed0fbb32fae82.jpg)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }} // Light grey background for the entire page
    >
      <Typography 
          variant="h4" 
          align="center" 
          fontWeight="bold"
          color='#e3f2fd'
          justifyContent='center'
          mb={2}
        >
          Welcome to Customer Support AI
        </Typography>
      <Stack
        direction='column'
        width='600px'
        height='500px'
        borderRadius={8}
        bgcolor='#ffffff' // White background for the chat window
        boxShadow='0px 4px 20px rgba(0, 0, 0, 0.1)' // Subtle shadow for depth
        p={2}
        spacing={2}
      >
        
        <Stack
          direction='column'
          spacing={2}
          flexGrow={1}
          overflow='auto'
          maxHeight='100%'
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display='flex'
              justifyContent={
                message.role === 'model' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={message.role === 'model' ? '#0d47a1' : '#00bcd4'} // Model message: Purple; User message: Teal
                color='white'
                borderRadius={16}
                p={3}
                maxWidth='80%'
              >
                {message.parts[0].text}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction='row' spacing={2}>
          <TextField
            label='Type your message...'
            fullWidth
            variant='outlined'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              bgcolor: '#e0e0e0', // Light grey input background
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#64b5f6' // Purple border for the input field
                },
                '&:hover fieldset': {
                  borderColor: '#64b5f6'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#64b5f6'
                }
              }
            }}
          />
          <Button
            variant='contained'
            onClick={sendMessage}
            sx={{
              bgcolor: '#1976d2', // Purple button background
              color: 'white',
              '&:hover': {
                bgcolor: '#64b5f6' // Darker purple on hover
              }
            }}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
