const express = require('express');
const app = express();
const PORT=2008;
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const prompt=require('prompt-sync')();

app.use(express.static(__dirname + '/public'));




const dbService = require('./dbService');

app.get('/get',function(res,res){
    res.sendFile(__dirname + '/public/register.html');   
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

//create 
app.post('/insert', (request, response) => {
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(name);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

//read 
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})


  
//update 
app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});
//delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});
//search 
app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});
//run server
app.listen(process.env.PORT, () => console.log('app is running...'));