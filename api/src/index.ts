import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.urlencoded())

interface Person {
    name: string;
    location: string;
    age?: number;
}

const data: Person[] = [
    { name: 'Adam', location: 'Swindon', age: 33},
    { name: 'Mike', location: 'Swindon'},
    { name: 'Lauren', location: 'Out somewhere'},
]

app.get('/people', (req: Request, res: Response) => {
    const limit = req.query.limit || 100

    res.json( data.splice(0, parseInt(limit as string) as number ) )
})

app.get('/people/:name',
    (req, res) => res.json(
        data.find(person => person.name === req.params.name)
    )
)


app.get('/', (req, res) => {
    res.send(`
    <form method="POST" action="/search">
        <input type="text" name="name" />
        <button>Search</button>
    </form>
    `)
})

app.post('/search', (req, res) => {
    // Get the name
    const name = req.body.name

    // Look in the db for the name
    const person = data.find(person => person.name == name)

    res.json(person)
})



app.listen(3000, () => console.log('Listening on http://localhost:3000/'))

