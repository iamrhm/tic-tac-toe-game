const express = require('express')
const app = express();
const path = require('path')
const bodyPraser = require('body-parser')
const PORT = 4000;

app.use(express.static(path.join(__dirname, 'client')))
app.use(bodyPraser.json())

app.get('/',(req,res)=>{
  res.send('index.html')
})
app.post('/login',(req,res)=>{
  console.log(req.body)
  res.send(true)
})
app.post('/signup',(req,res)=>{
  console.log(req.body)
  res.send(true)
})

app.listen(PORT, () => {
  console.log('server running on port ' + PORT)
  console.log(__dirname)
})