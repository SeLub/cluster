const express = require('express')
const cluster = require("cluster")
const os = require("os")

const numCPU = os.cpus().length

const app = express()

app.get('/', (req, res) => {
      for (let i = 0; i < 1e8; i++) {

      }

      res.send(`Server ${process.pid} send response OK`)
      cluster.worker.kill()
})

if (cluster.isMaster) {
      for (let i = 1; i <= numCPU; i++) {
            cluster.fork()
      }
      cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`)
      })
} else {
      app.listen(3000, () => console.log(`Server ${process.pid} started...`))
}