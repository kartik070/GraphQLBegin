const express = require('express');
const express_graphQL = require('express-graphql')
const app = express();
const bodyParser = require('body-parser');  
const schema = require('./schema/schema');

app.use(bodyParser.json())
app.use('/graphql',express_graphQL({
  schema,
  graphiql:true
}));

app.use('/signup',(req,res)=>{
  let {name,username,password} = req.body;
   name = typeof(name)==="string"&&name.trim().length>0?name:false;

console.log(name,'jk')
})

module.exports = app;