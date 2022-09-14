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
async function postReport(req, res, next){
    try {
        if(!req.body.name) res.status(404).send('no reports')
        await Report.create({
            name: req.body.name
        })
        res.send('created report')
    } catch (error) {
        next(error)
    }
}
async function createService(req, res, next){
    try {
        if(!req.body.name) res.status(404).send('no services')
        await Service.create({
            name: req.body.name
        })
        res.send('created service')
    } catch (error) {
        next(error)
    }
}
async function createProperty(req, res, next){
    const { address, surface, price, environments, bathrooms, rooms, garage, yard, pets, age, city, service, typProp, propImg } = req.body
    try {
        if(!address, !surface, !price, !environments, !bathrooms, !rooms, !garage, !yard, !pets, !age, !city, !typProp) res.status(404).send('fill out data')
        let property = await Property.create({
            address,
            surface,
            price,
            environments,
            bathrooms,
            rooms,
            garage,
            yard,
            pets,
            age,
            propertyImages: [{ url: propImg }],
            city: [{ name: city }],
            typeOfProp: [{ name: typProp }]
        }, {include: [ PropertyImage ]},
            { include: [ City ] },
            { include: [ TypeOfProp ] }
        )
        let ser = await Service.findAll({
            where: { name: service}
        })
        property.addService(ser)
        return property
    } catch (error) {
        next(err)
    }
}
async function postPorperty(req, res, next){
    const { description, status, premium, reports } = req.body
    try {
        if(!description) res.status(404).send('fill out description')
        let property = await createProperty(req, res, next)
        let post = await Publication.create({
            description,
            status,
            premium,
            property: property
        }, { include: [ Property ] })
        let rep = await Report.findAll({
            where:{ name: reports }
        })
        post.addReport(rep)
        res.send('property post successful')
    } catch (error) {
        next(error)
    }
}


module.exports = {getAll, postPorperty}