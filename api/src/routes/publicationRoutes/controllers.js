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
            include: [{
                model: City,
                attributes: ['name'],
            },
            {
                model: TypeOfProp,
                attributes: ['name'],
            },
            {
                model: Service,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }]
        },
        {
            model: Report,
        }
        ],

    });
};
const getDetail = async (id) => {
    return await Publication.findOne({
        where: { id: id },
        include: [{
            model: Property,
            include: [{
                model: City,
                attributes: ['name'],
            },
            {
                model: TypeOfProp,
                attributes: ['name'],
            },
            {
                model: Service,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }]
        },
        {
            model: Report,
        }
        ]
    });
};
const getFiltered = async (publications, filters) => {
    let filtered = [];
    await publications.forEach(async function (publi) {
        let publiFiltered = [];
        await filters.publication.forEach(filter => {
            if (publi[filter.name] === filter.value) { publiFiltered.push(publi); };
        }
        )
        let propertyFiltered = [];
        await filters.property.forEach(filter => {
            if (publi.property[filter.name] === filter.value) {
                propertyFiltered.push(publi);
            };
        })
        if (publiFiltered.length === filters.publication.length && propertyFiltered.length === filters.property.length) {
            if (publi.property.TypeOfProp.dataValues.name === filters.TypeOfProp || filters.TypeOfProp === '') { filtered.push(publi) }
        }
    })
    return filtered
}

const sortBy = async (publications, sorting) => {
    let result=[]
    if (sorting.direccion === 'minMax') {
         result = await publications.sort(function (a, b) {
            if (a.property[sorting.name] > b.property[sorting.name]) return 1;
            else if (a.property[sorting.name] < b.property[sorting.name]) return -1;
            return 0;
        });
    }
    else if (sorting.direccion === 'maxMin') {
         result = await publications.sort(function (a, b) {
            if (a.property[sorting.name] < b.property[sorting.name]) return 1;
            else if (a.property[sorting.name] > b.property[sorting.name]) return -1;
            return 0;
        });
    }
    return result
}

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


module.exports = { getAll, getDetail, getFiltered, sortBy, cityArr, propTypArr }