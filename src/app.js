// write your code here
const {data} = require('./data');
const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 3000;
const fs = require("fs");
app.use(express.json()); // parse json bodies
app.use(express.urlencoded({extended:true}));

// testing my app
app.get('/', function(req, res) {
    res.send("Get data!");
    res.json(data);
})
// get data
app.get('/data/:id', function(req, res) {
    //Getting id param from data.js file
    const data_id = req.params.id;
    console.log(data_id);
    //Getting my id parameter from data.js file
    const single_data = data.find(({id}) => id == data_id)
    //Checking for data and returning it
    if (!single_data) {
        console.log("Data not found");
        res.send("Data does not exist on server")
    }
    else {
        //console.log(single_data);
        res.json(single_data);
    }
});
// create data(POST)
app.post('/data', function(req, res) {
    //getting req body
    const data_body = req.body;
    data.push(data_body);
    console.log(data_body);
    res.json(data);
});
//Update all properties of data and create in its absence
app.put('/data/:id', function(req, res) {
    // get req body
    const body = req.body;
    console.log(body);
    //get data id from params
    const my_id = req.params.id;
    //Get data from database
    const check_data = data.find(({id}) => id == my_id)
    //Checking for the existence of data
    if (!check_data)
    {
        console.log("Data not found!");
        res.send("Data does not exist");
    }
    else
    {
        //Perform PUT method
        //const data_copy = [... data];
        //find index of item to be deleted
        const target_data = data.findIndex(d => d.id == my_id)
        console.log(target_data);
        //replace array with req body
        data[target_data] = body;
        //Return data to user
        res.json(data[target_data])
    }
})

app.delete('/data/:id', function(req, res) {
    //get data id from req param
    const del_id = req.params.id;
    //Get data from database
    const delete_data = data.find(({id}) => id == del_id);
    //Check for data in db
    if (!delete_data) {
        console.log("data not found")
        res.send("data does not exist")
        return
    }
    const data_delete = data.filter(content => content.id != del_id);
    res.json(data_delete);
});
//client side error(404 error)
app.use((req, res) =>
        res.status(404).send(`404 Error Page`)
)

app.listen(port, () => {
    console.log(`Working ${port}`)
})