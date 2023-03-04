const express = require('express')
const path = require('path')
const app = express()
const db = require('./DBconnection')
const port = 3000

// #############################################################################
// Logs all request paths and method
app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now())
  res.set('x-powered-by', 'cyclic.sh')
  console.log(
    `[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`
  )
  next()
})

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false,
}
app.use(express.static('public', options))

// #############################################################################
// Catch all handler for all other request.
app.use('*', (req, res) => {
  res
    .json({
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params,
    })
    .end()
})

app.get('/getcomment', (req, res) => {
  var conn = db.getconnection()
  conn.query(
    'SELECT * FROM comments.comments',
    function (error, results, fields) {
      if (error) throw error
      const comments = JSON.stringify(results)

      res.end(comments)
    }
  )
  conn.end()
})

app.post('/insert', (req, res) => {
  req.on('data', function (data) {
    var content = ''
    content += data
    var conn = db.getconnection()
    var obj = JSON.parse(content)
    const collected = []
    const commentClientsIds = []
    conn.query(
      'SELECT * FROM comments.comments',
      function (error, results, fields) {
        if (error) throw error
        const savevIds = JSON.stringify(results)
        const jsonIds = JSON.parse(savevIds)
        jsonIds.map((id) => {
          commentClientsIds.push(id.clientID)
        })
      }
    )
    conn.query(
      'SELECT * FROM comments.client_id',
      function (error, results, fields) {
        if (error) throw error

        let client_id = JSON.stringify(results)
        const IDarr = JSON.parse(client_id)
        // console.log(IDarr)
        IDarr.map((id) => {
          collected.push(id.clientID)
        })
        // console.log(collected)
        // console.log(obj)
        // console.log(collected.includes(obj.clientID))

        if (
          collected.includes(obj.clientID) &&
          commentClientsIds.includes(obj.clientID) != true
        ) {
          conn.query(
            'INSERT INTO comments.comments (comments.userName, comments.comment, comments.Rating, comments.clientID) VALUES(?,?,?,?)',
            [obj.name, obj.msg, obj.star, obj.clientID],
            function (error) {
              if (error) throw error
              // console.log('found')
            }
          )
        } else {
          // console.log('not found')
        }
        // console.log(collected)

        // res.end(client_id);
      }
    )

    res.end('working')
  })
  conn.end()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
