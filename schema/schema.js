const graphql = require("graphql");

const {GraphQLObjectType,GraphQLInt,GraphQLSchema,GraphQLString,GraphQLList,GraphQLNonNull}=graphql;
const axios =require('axios');

const companyType = new GraphQLObjectType({
  name:'company',
  fields:()=>({
    id:{type:GraphQLString},
    name:{type:GraphQLString},
    description:{type:GraphQLString},
    user:{
      type:new GraphQLList(userType),
      resolve(parentValue,args){
        console.log(parentValue)
        return axios.get(`http://localhost:3000/company/${parentValue.id}/users`)
        .then(res=>{ console.log(res.data)
        return res.data})
      }
    }
    
  })
})

const userType = new GraphQLObjectType({
  name:'user',
  fields:{
      id:{type:GraphQLString},
      firstname:{type:GraphQLString},
      age:{type:GraphQLInt},
      company:{
        type:companyType,
        resolve(parentValue,args){                
          return axios.get(`http://localhost:3000/company/${parentValue.companyId}`)
          .then(res=>
             res.data)
        }
      }
  }
});

const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    users:{
      type:userType,
      args:{id:{type:GraphQLString}},
      resolve(parentValue,args){
        console.log(args )
       return axios.get(`http://localhost:3000/users/${args.id}`)
       .then(res=>res.data)
      }
    },
    company:{
      type:companyType,
      args:{id:{type:GraphQLString}},
      resolve(parentValue,args){
        console.log(args.id)
        return axios.get(`http://localhost:3000/company/${args.id}`)
        .then(res=> res.data)
      }
    }
  }
});
const mutation = new GraphQLObjectType({
  name:"Mutation",
  fields:{
    
    addUser:{type:userType,
      args:{
        firstname:{type:new GraphQLNonNull(GraphQLString)},
        age:{type:new GraphQLNonNull(GraphQLInt)},
        companyId:{type:GraphQLString}
    },
    resolve(parentValue,{firstname,age}){
      return axios.post(`http://localhost:3000/users`,{firstname,age})
      .then(res=>res.data)
    }
  },
  deleteUser:{
    type:userType,
    args:{
      id:{type:GraphQLString}
    },
    resolve(parentValue,args){
     return axios.delete(`http://localhost:3000/users/${args.id}`)
     .then(res=>res.data)
    }
  },
  editUser:{type:userType,
  args:{
    id:{type:GraphQLString},
    firstname:{type:GraphQLString},
    age:{type:GraphQLInt}
  },resolve(parentValue,args){
    return axios.patch(`http://localhost:3000/users/${args.id}`,args)
    .then(res=>res.data)
  }}
}}
)
module.exports = new GraphQLSchema({
  query:RootQuery,
  mutation
})
