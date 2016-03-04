'use strict'

const express = require('express')

const app = express()

app.get('/', (request,response)=>{
  response.send('Hello World')
})
.get('/blocks', (request, response)=>{
  response.redirect('/parts')
  /* redirecting /blocks page to /parts page */
})
.get('/parts', (request,response)=>{
  var blocks = ['Fixed', 'Movable', 'Rotating']
  response.send(blocks)
})

app.listen(2000, ()=>{
  console.log("Listening on port 2000")
})
