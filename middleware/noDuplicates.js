function noDuplicates(req, res, next, contacts) {
    const { fullName, phoneNumber } = req.body
    const contact = contacts.find((entry) => entry.phoneNumber === phoneNumber)

    next();
}