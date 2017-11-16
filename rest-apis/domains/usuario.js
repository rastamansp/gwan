/**
 * @file Classe usuario.
 * @author @douglaspands / @pedroalmeida
 * @since 2017-11-01
 */
'use strict';

// Modulos
const _ = require('lodash');
// moment
const moment = require('moment');
// mongoose
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Mongoose schema
const Schema = mongoose.Schema;

/**
 * Classe Usuario.
 * @param {string} id id do usuario.
 * @param {string} nome Nome completo.
 * @param {number} idade Idade.
 * @param {string} sexo Orientação sexual.
 * @return {Usuario}
 * - masculino
 * - feminino
 */
function Usuario(id, nome, idade, sexo) {
    this.id = (_.isString(id) && _.size(id) > 0) ?
        id :
        moment().format('YYYYMMDDHHmmss');
    this.nome = (_.isString(nome) && _.size(nome) > 0) ?
        nome :
        undefined;
    this.idade = (_.isNumber(idade) && idade > 0) ?
        idade :
        undefined;
    this.sexo = (_.isString(sexo) && _.includes(['MASCULINO', 'FEMININO'], sexo.toUpperCase())) ?
        sexo.toLowerCase() :
        undefined;
}

///// logins de acesso a usuario
const SchemaPassLogin = new Schema({
    login: String, // login
    email: String, // emai,
    senha: String, // senha
    ultimoLogin: Date, // data do ultimo login
    loginErros: Number, // quantidade de erros no login
    roleID: Number // tipo de conta
});

const SchemaSubscriber = new Schema({
    first_name: String, // Nome
    last_name: String, // Sobrenome
    image: String, // Foto do perfil
    locale: String, // Localização / Idioma do usuário no Facebook
    timezone: String, // Fuso horário, número relativo ao GMT
    gender: String, // genero,
    id: String, // imagem
    is_payment_enabled: String, // O usuário é elegível para receber mensagens de pagamento da plataforma do messenger
    last_ad_referral: String // Detalhes do último Anúncio de conversa do Messenger do qual o usuário foi encaminhado
});

///// logins de acesso a usuario
const SchemaPage = new Schema({
    id: String, // id da pagina
    name: String, // nome da pagina
    category: String, // categoria,
    description: String, // descricao,
    link: String, // link da pagina
    picture: String, // imagem da pagina
    activeSubscribers: Number, // Usuarios ativos
    amountSubscribers: Number, // Quantidade ativos
    unsubscribers: Number, // Usuarios desinscritos
    netSubscribers: Number, // Usuarios inscritos atraves de site
    subscribers: [SchemaSubscriber] // inscritos
});

///// Schema Conta de usuario do Gwan Pass
const _schema = {
    id: String,
    nome: String,
    imagem: String,
    dataNascimento: String,
    sexo: String,
    whatsapp: String,
    pais: String,
    estado: String,
    cidade: String,
    email: String,
    loginsAcesso: [SchemaPassLogin],
    lastSystemUpdate: Date,
    pages: [SchemaPage]
};

const userSchema = new Schema(_schema);

module.exports = mongoose.model('MsgUser', userSchema);
module.exports = Usuario;