const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(express.json())

  const fakePostsDb = [];

  server.post('/api/guestbook', (req, res, next) => {
    fakePostsDb.push({
      name: req.body.name,
      message: req.body.message,
      addedAt: Date.now()
    })
    res.json(fakePostsDb)
  })

  server.get('/api/guestbook', (req, res, next) => {
    res.json(fakePostsDb)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
