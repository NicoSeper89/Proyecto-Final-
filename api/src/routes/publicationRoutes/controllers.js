const axios = require('axios');
const { Publication, Property, Service, TypeOfProp, City, PropertyImage, Report } = require('../../db')

//habria que agregar FilterByParams que recibe publicaciones y filtros y devuelve las
//publis correspondientes. Si no se puede hacer flexible, habria que hacer un Filter por criterio
// y en el llamado desde la ruta, hacer un loop que llame a todas.
//habria que agregar un sort que recibe las publicaciones y el criterio, y las ordena de 
//acuerdo a eso, de nuevo, revisar si se puede hacer flexible, sino un sort por criterio

// getAll devuelve todas las publicaciones(checkear con database)
const getAll = async () => {
    return await Publication.findAll({
        include: [{
            model: Property,
            where: {
                attributes: [],
            }
        },
       /*  {
            model: Report,
            attributes:['name'],
            where: {
                attributes: [],
            }
        },
        {
            model: TypeOfProp,
            attributes:['name'],
            where: {
                attributes: [],
            }
        },
        {
            model: City,
            attributes:['name'],
            where: {
                attributes: [],
            }
        },
        {
            model: TypeOfProp,
            attributes:['name'],
            where: {
                attributes: [],
            }
        }, */
        ]
    });
};

const cityArr = [
    "buenos aires",
    "mendoza",
    "rosario",
    "catamarca",
    "chaco",
    "jujuy",
    "la pampa",
    "rioja",
    "misiones",
    "salta",
    "san juan"
]
const propTypArr = [
    "house",
    "apartment",
    "flat",
    "castle",
    "mansion"
]


module.exports = {getAll, cityArr, propTypArr}