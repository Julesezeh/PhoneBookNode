function noDuplicates(req, res, next, contacts) {
    const { fullName, phoneNumber } = req.body
    const contact = contacts.find((entry) => entry.phoneNumber === phoneNumber)


    console.log("from the middleware")
    console.log("contact", contact)
    if (contact) {
        return res.status(400).send("<h1>Duplicate Entry</h1>")
    }
    next();
}

module.exports = noDuplicates;