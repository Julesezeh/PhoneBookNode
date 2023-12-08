const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let contacts = [];

app.get("/", (req, res) => {
    res.status(200).send(contacts);
})

app.post("/", (req, res) => {
    // const {phoneNumber,Name} = req.body;
    contacts.push(req.body);
    res.status(201).send(contacts);
})


app.listen(port, () => {
    console.log(`Server is currently listening on localhost:${port}`)
})