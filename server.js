const http =require('http');
const app =require('./app');
const port=4000;
let rugu =/^[a-zA-Z0-9 !@#$%^&*{|}~]+@[a-zA-Z0-9]/

let server = http.createServer(app)





server.listen(port,()=>{
  console.log(`listning to port ${port}`)
})