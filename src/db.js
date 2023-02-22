require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/viator`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {User, Ticket, Flight, Airline} = sequelize.models;

// Aca vendrian las relaciones

// Flight.hasOne(Ticket);
// Ticket.belongsTo(Flight);

/* User.belongsToMany(Ticket,{through:'UserTickets'} );
Ticket.belongsToMany(User,{through:'UserTickets'} ); */

// User.hasMany(Ticket);
// Ticket.belongsTo(User);

// Airline.hasOne(Flight);
// Flight.belongsTo(Airline);

User.hasMany(Ticket,{
  foreignKey: "user_id",
  sourceKey: "id"
})
Ticket.belongsTo(User,{
  foreignKey: "user_id",
  targetKey:"id"
})
Flight.hasMany(Ticket,{
  foreignKey: "Fligths_id",
  sourceKey: "id"
})
Ticket.belongsTo(Flight,{
  foreignKey: "Fligths_id",
  targetKey:"id"
})
 Airline.hasMany(Flight,{
  foreignKey: "Aereolineas_id",
  sourceKey: "id"
}) 

Flight.belongsTo(Airline,{
  foreignKey: "Aereolineas_id",
  targetKey:"id"
})   



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};