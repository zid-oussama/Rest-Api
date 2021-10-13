const mongoose = require('mongoose')
const express = require('express')
const Connect = require('./config/ConnectDB')
const User = require('./Models/User')
const app = express()

Connect()
app.use(express.json())
app.listen(5000, () => { console.log('Listening on PORT 500') })

const users = [
    { name: 'user1', phone: 111111111, email: 'user1@gmail.com', bestFood: 'rice' },
    { name: 'user2', phone: 222222222, email: 'user2@gmail.com', bestFood: 'psata' },
    { name: 'user3', phone: 333333333, email: 'user3@gmail.com', bestFood: 'couscous' }
]
//Adding users 
const addUsers = () => {
    try {
        User.create(users)
    } catch (error) {
        console.log(error)
    }
}

//GET 
app.get('/all_users', async (req, res) => {
    try {
        const all_users = await User.find()
        res.status(201).json(all_users)

    } catch (error) {
        res.status(400);
        console.log(error.message)
    }
})

//POST
app.post('/add_user', async (req, res) => {
    try {
        // const newUser = new User({ name: 'user4', phone: 444444444, email: 'user4@gmail.com' })
        const newUser = new User(req.body);
        const response = await newUser.save()
        res.send(response)
    } catch (error) {
        res.status(400);
        console.log(error.message)
    }
})


//PUT
app.put('/update/:name', async (req, res) => {
    try {
        //const updatedUser = await User.findByIdAndUpdate(req.params.id, { bestFood: "new food" }, { new: true })
        const updatedUser = await User.findOneAndUpdate({ name: req.params.name }, { bestFood: 'second update' }, { new: true })
        res.send(updatedUser)
    } catch (error) {
        res.status(400);
        console.log(error.message)
    }
})



//Delete
app.delete('/delete/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.send(deletedUser)
    } catch (error) {
        res.status(400);
        console.log(error.message)
    }
})