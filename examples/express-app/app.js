const express = require('express')
const logit = require('logit')
const path = require('path')
const app = express()
const port = 3000

const logger = logit.createLogger()

// Add middleware to parse JSON bodies
app.use(express.json())

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Create a specific endpoint for logs
app.post('/logs', (req, res) => {
    const success = logger.processLog(req.body)
    res.status(success ? 200 : 400).json({
        status: success ? 'ok' : 'error'
    })
})

app.listen(port, () => {
    console.log(`\n\nExample app listening on port ${port}`)
    console.log(`Open http://localhost:${port} in your browser to test the logger\n\n`)
})