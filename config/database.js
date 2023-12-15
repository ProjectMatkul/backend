const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/warmindo_app')

module.exports =  sequelize;