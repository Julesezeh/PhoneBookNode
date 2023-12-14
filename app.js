const express = require("express");
const morgan = require("morgan");



const app = express();
const { v4: uuid4 } = require("uuid")
const port = 3000;

app.use(express.json());

app.use(morgan("common"));


let contacts = [];


app.get("/", (req, res) => {
    res.status(200).send(contacts);
})

app.get("/:phoneNumber", (req, res) => {
    const { phoneNumber } = req.params;

    const user = contacts.find((contact) => contact.phoneNumber === phoneNumber)
    if (user) {
        return res.status(200).send(`<h1>${user.id}---${user.phoneNumber}----${user.fullName} </h1>`)
    } else if (phoneNumber) {
        return res.status(404).send(`Phone number "${phoneNumber}" does not exist`)
    } else {
        return res.status(400).send("<h1> Bad Request </h1>")
    }
})

app.post("/", (req, res) => {
    // const {phoneNumber,Name} = req.body;
    const id = uuid4();
    const body = req.body;
    const contact = contacts.find((entry) => entry.phoneNumber === body.phoneNumber)
    if (contact) {
        return res.status(400).send("<h1>Duplicate Entry</h1>")
    } else {
        const updated_body = { ...body, id: id }
        contacts.push(updated_body);
        return res.status(201).send(contacts);
    }

})


app.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { phoneNumber, name } = req.body;
    const contact = contacts.find((contact) => contact.id === id)
    if (contact) {
        if (phoneNumber) {
            contact.phoneNumber = phoneNumber
        } else if (name) {
            contact.name = name
        }

        return res.status(200).send(contact)


    } else {
        return res.status(400).send("<h3>Bad request</h3>")
    }
})

app.listen(port, () => {
    console.log(`Server is currently listening on localhost:${port}`)
})