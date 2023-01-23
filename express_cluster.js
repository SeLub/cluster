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
            console.log(`worker ${worker.process.pid} died: `)
            
            if (signal) {
                  console.log(` killed by signal: ${signal}`)
                } else if (code !== 0) {
                  console.log(` exited with error code: ${code}`) // message after exit in setTimeout
                }

            cluster.fork()
      })
} else {
      setTimeout((function() { 
            return process.exit(1); //process exited with code 1 nodejs 
            }), 5000);

      app.listen(3000, () => console.log(`Server ${process.pid} started...`))
}