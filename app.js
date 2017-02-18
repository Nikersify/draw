const http = require('http')
const express = require('express')
const serveStatic = require('serve-static')
let app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => {
	res.render('index')
})

app.use(serveStatic('static'))

let l = app.listen(8080, () => {
	console.log(`listening on port ${l.address().port}`)
})
