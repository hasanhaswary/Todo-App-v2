import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

// New user register route
router.post('/register', (req, res) => {
    // Implementation for user registration
    const { username, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 8)

    try{
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPassword)
        
        const defaultTodo = `Hello ;) Add your first todo`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        const token = jwt.sign({ id: result.lastInsertRowid}, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({ token })
    }catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
    console.log(username, hashedPassword)
    console.log(username, password)
    res.sendStatus(201)
})

router.post('/login', (req,res) => {
    const {username, password} = req.body

    try{
        const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`)
        const user = getUser.get(username)

        if (!user) {return res.sendStatus(404).send({message: "User not found"})}

        const passwordValid = bcrypt.compareSync(password, user.password)
        if (!passwordValid) {return res.sendStatus(401).send({message: "Invalid password"})}

        console.log(user)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({ token })
    }catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
} )

export default router