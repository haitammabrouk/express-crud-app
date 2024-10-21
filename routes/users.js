const express = require('express')
const router = express.Router()

router.use(express.json());

const users = []

router.route("/")
    .post((req, res) => {
        const newUser = req.body
        users.push(newUser)
        res.status(201).json(`The user : ${newUser.name} has been added succesfully`)
    })
    .get((req, res) => {
        if (users.length > 0) {
            return res.status(200).json(users)
        }
        res.status(404).json(`There is no User Yet !`)
    })

router.route("/:id")
    .get((req, res) => {
        const id = parseInt(req.params.id)
        for (user of users) {
            if (user.id === id) {
                return res.status(200).json(`The User that you are looking for : ${JSON.stringify(user)}`)
            }
        }
        res.status(404).json(`User Not Found`)
    })
    .put((req, res) => {
        const id = parseInt(req.params.id)
        const { name } = req.body
        for (user of users) {
            if (user.id === id) {
                user.name = name
                return res.status(200).json(`The User has been updated succesfully : ${JSON.stringify(user)}`)
            }
        }
        res.status(404).json(`User Not Found`)
    })
    .delete((req, res) => {
        const id = parseInt(req.params.id)
        for(user of users) {
            if(user.id === id) {
                const index = users.findIndex(user => user.id === id)
                users.splice(index, 1)
                return res.status(200).json(`The user with the Id : ${id} has been deleted`)
            }
            res.status(404).json(`User Not Found`)
        }
    })

module.exports = router