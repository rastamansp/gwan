/**
 * @file Model Usuario.
 * @author @douglaspands
 * @since 2017-11-01
 */
'use strict';
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

/*
// Hardcoded data
const customers = [
    {id:'1', name:'John Doe', email:'jdoe@gmail.com', age:35},
    {id:'2', name:'Steve Smith', email:'steve@gmail.com', age:25},
    {id:'3', name:'Sara Williams', email:'sara@gmail.com', age:32},
];
*/

// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        nome: { type: GraphQLString },
        imagem: { type: GraphQLString },
        dataNascimento: { type: GraphQLString },
        sexo: { type: GraphQLString },
        whatsapp: { type: GraphQLString },
        pais: { type: GraphQLString },
        estado: { type: GraphQLString },
        cidade: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

// User Type
const UserTypeDelete = new GraphQLObjectType({
    name: 'UserDelete',
    fields: () => ({
        removed: { type: GraphQLBoolean }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                /*
                for(let i = 0;i < customers.length;i++){
                    if(customers[i].id == args.id){
                        return customers[i];
                    }
                }
                */
                return axios.get('http://localhost:3000/v1/usuarios/' + args.id)
                    .then(function(response) {
                        console.log('=========================');
                        console.log('response');
                        console.log(response.data.data);
                        return response.data.data;
                    });

            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                console.log('=========================');
                console.log('users resolve:');
                console.log('=========================');
                return axios.get('http://localhost:3000/v1/usuarios/')
                    .then(res => res.data.data);
            }
        }
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                nome: { type: new GraphQLNonNull(GraphQLString) },
                imagem: { type: new GraphQLNonNull(GraphQLString) },
                dataNascimento: { type: new GraphQLNonNull(GraphQLString) },
                sexo: { type: new GraphQLNonNull(GraphQLString) },
                pais: { type: GraphQLString },
                estado: { type: GraphQLString },
                cidade: { type: GraphQLString },
                whatsapp: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, args) {
                return axios.post('http://localhost:3000/v1/usuarios', {
                        id: args.id,
                        nome: args.nome,
                        imagem: args.imagem,
                        dataNascimento: args.dataNascimento,
                        sexo: args.sexo,
                        pais: args.pais,
                        estado: args.estado,
                        cidade: args.cidade,
                        whatsapp: args.whatsapp,
                        email: args.email
                    })
                    .then(function(response) {
                        return response.data.data;
                    });
            }
        },
        editUser: {
            type: UserType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                id: { type: new GraphQLNonNull(GraphQLString) },
                nome: { type: new GraphQLNonNull(GraphQLString) },
                imagem: { type: new GraphQLNonNull(GraphQLString) },
                dataNascimento: { type: new GraphQLNonNull(GraphQLString) },
                sexo: { type: new GraphQLNonNull(GraphQLString) },
                pais: { type: GraphQLString },
                estado: { type: GraphQLString },
                cidade: { type: GraphQLString },
                whatsapp: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, args) {
                return axios.patch('http://localhost:3000/customers/' + args.id, args)
                    .then(res => res.data);
            }
        },
        deleteUser: {
            type: UserTypeDelete,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                return axios.delete('http://localhost:3000/v1/usuarios/' + args.id)
                    .then(res => res.data.data);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});