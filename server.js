import express from 'express'
import path from 'path'


const __dirname = import.meta.dirname
const PORT = 7000
const app = express()

app.use(express.static( path.join(__dirname,'/public')) )

app.get('/',(_,res)=>{
    // res.send('Hello')
    res.sendFile( path.join(__dirname,'public','index.html') )
})

app.listen(PORT,()=>{
    console.log('Listening on ',PORT);
    
})