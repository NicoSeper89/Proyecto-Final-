require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { receiveMessageOnPort } = require("worker_threads");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/lookHouse`, {
        logging: false,
        native: false,
      });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models/publicationModels"))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models/publicationModels", file)));
  });
fs.readdirSync(path.join(__dirname, "/models/userModels"))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models/userModels", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  City,
  Property,
  Publication,
  PublicationComents,
  PropertyImage,
  Report,
  Service,
  TypeOfProp,
  LoginInfo,
  TypeOfUser,
  User,
  UserImage,
  ContactInfo,
  PropertyVideo
} = sequelize.models;

// //Relaciones usario
User.hasOne(ContactInfo); // 1 a 1
ContactInfo.belongsTo(User); // 1 a 1
User.hasOne(LoginInfo); // 1 a 1
LoginInfo.belongsTo(User); // 1 a 1
User.hasOne(UserImage); // 1 a 1
UserImage.belongsTo(User); // 1 a 1
User.belongsTo(TypeOfUser); // N a 1
TypeOfUser.hasMany(User); // 1 a N
User.hasMany(Publication); //1 a N
User.hasMany(Report);
Report.belongsTo(User); 
// //Relaciones publicación
Publication.belongsTo(User); // N a 1
Publication.belongsToMany(Report, { through: "reportsPublications" }); // N a N
Report.belongsToMany(Publication, { through: "reportsPublications" }); // N a N
Publication.belongsTo(Property); // 1 a 1
User.hasMany(PublicationComents);
PublicationComents.belongsTo(User);

// //Relaciones propiedad
Property.hasOne(Publication); // 1 a 1
Property.hasMany(PropertyImage); // 1 a N
PropertyImage.belongsTo(Property); // N a 1
Property.belongsToMany(Service, { through: "PropertyServices" }); //N a N
Service.belongsToMany(Property, { through: "PropertyServices" }); //N a N
Property.belongsTo(City); //N a 1
City.hasMany(Property); //1 a N
Property.belongsTo(TypeOfProp); //N a 1
TypeOfProp.hasMany(Property); //1 a N
PropertyVideo.belongsTo(Property);
Property.hasOne(PropertyVideo); 



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
