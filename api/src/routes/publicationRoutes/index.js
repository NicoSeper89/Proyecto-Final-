const { Router } = require('express');
const { Publication, Property, Service, TypeOfProp, City, PropetyImage, Report } = require('../../db')
const router = Router();
const { getAll, filterByParam,sortByParam } = require('./controllers')

//para el home y para el searchbar get con query
router.get('/', async (req, res, next) => {
    try {
        let {
            filters,
            sorting
        } = req.body;
        let publications = await getAll();
        if (filters.length !== 0) {  //aca filtra las publicaciones
            publications = filterByParam(publications, filters)
        }
        let city = req.query.city;
        if(city){                   //aca filtra por searchbar(revisar si se quiere hacer independiente)
            city=city.toLowerCase(); //revisar como se guarda city en publications
            let cityFiltered = await publications.filter(el => el.city.toLowerCase().includes(city));
            cityFiltered.length ?
                publications=cityFiltered :
                res.status(404).send('No hay publicaciones en esa ciudad')
        }
        if (sorting !== 'default') { // aca las sortea
            publications = sortByParam(publications, sorting)
        }

        res.status(200).send(publications) // las envia
    }
    catch (error) {
       // next(error)
       res.status(404).send('No hay publicaciones')
    }
})



//para el detail
router.get('/:id', async (req, res, next) => {
    try {
       const {id} = req.params
        const info = await getAll();
        if (id) {
            let publications = await info.filter(el => el.id == id); //revisar como se guarda el id en publications
            publications.length ?
                res.status(200).send(publications) :
                res.status(404).send('No existe una casa con ese id')
        }
    } catch (error) {
        next(error)
    }

})