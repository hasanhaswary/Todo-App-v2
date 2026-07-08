import express from 'express'
// import db from '../db.js'
import prisma from '../prismaClient.js'

const router = express.Router()

router.get('/', async (req, res) => {
    // const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
    // const todos = getTodos.all(req.userID)

    await prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    })

    res.json(todos)
})


router.post('/', async (req, res) => {
    const { task } = req.body
    // const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
    // const result = insertTodo.run(req.userID, task)

    await prisma.todo.create({
        data: {
            task: task,
            userId: req.userId
        }
    })

    res.json(todo)
})

router.put('/:id', async (req, res) => {
    const {completed} = req.body
    const {id} = req.params
    // const updateTodo = db.prepare(`UPDATE todos SET completed = ? WHERE id = ? AND user_id = ?`)
    // const result = updateTodo.run(completed, id)

    const updateTodo = await prisma.todo.update({
        where: {
            id: parseInt(id),
            userId: req.userId
        },
        data: {
            completed: !!completed    //converts to boolean
        }
    })
        

    res.json({message: "Todo updated successfully"})
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    const userId = req.userId
    // const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`)
    // deleteTodo.run(id, userID)
    await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId: userId
        }
    })

    res.json({message: "Todo deleted successfully"})
})

export default router