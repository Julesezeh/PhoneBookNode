const express = require("express");
const app = express();
const { v4: uuid4 } = require("uuid")
const port = 3000;

app.use(express.json());

let contacts = [];

app.get("/", (req, res) => {
    res.status(200).send(contacts);
})

app.get("/:id", (req, res) => {
    const { phoneNumber } = req.params;
    const user = contacts.find((contact) => contact.phoneNumber === phoneNumber)
    if (user) {
        return res.status(200).send(`<h1>${user.id}---${user.phoneNumber}----${user.fullName} </h1>`)
    } else if (id) {
        return res.status(404).send(`Phone number "${phoneNumber}" does not exist`)
    }
})

app.post("/", (req, res) => {
    // const {phoneNumber,Name} = req.body;
    const id = uuid4();
    const body = req.body;
    const updated_body = { ...body, id: id }
    contacts.push(updated_body);
    res.status(201).send(contacts);
})



app.listen(port, () => {
    console.log(`Server is currently listening on localhost:${port}`)
})