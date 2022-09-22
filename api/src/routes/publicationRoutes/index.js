const { Router } = require("express");
const cloudinary = require("../../utils/cloudinary")
const {
  Publication,
  Property,
  Service,
  TypeOfProp,
  City,
  PropertyImage,
  Report,
} = require("../../db");
const router = Router();
const {
  getAll,
  getDetail,
  getFiltered,
  sortBy,
  //   cityArr,
  propTypArr,
  serviceTypes,
  getCity,
} = require("./controllers");

//para el home y para el searchbar get con query

router.post("/", async (req, res, next) => {
  try {
    let city = req.query.city;
    let { filters, sorting } = req.body;
    /* let filters = {
        publication: [{name:"status", value:"disponible"}],
        property: [{name:"pets", value:true},{name:"age", value:5}],
        typeOfProp:'',
        services:[{name: "luz"},{name: "agua"}]
        } */
    /*  let sorting ={ name: 'default', direccion: 'minMax' }; */
    let publications = await getAll(); /// me trae todas las casas con sus propiedades

    publications = await getFiltered(publications, filters); // envia todas las casas y un filtro

    if (city) {
      //aca filtra por searchbar(revisar si se quiere hacer independiente)
      city = city.toLowerCase(); //revisar como se guarda city en publications
      let cityFiltered = await publications.filter((el) =>
        el.property.city.dataValues.name.toLowerCase().includes(city)
      );
      cityFiltered.length
        ? (publications = cityFiltered)
        : res.status(404).send("No hay publicaciones en esa ciudad");
    }
    if (sorting.name !== "default") {
      // aca las sortea
      publications = await sortBy(publications, sorting);
    }

    res.status(200).send(publications); // las envia
  } catch (error) {
    next(error);
    /*  res.status(404).send('No hay publicaciones') */
  }
});

router.get("/city", async (req, res, next) => {
  try {
    let names = await getCity();
    names.map((c) => City.findOrCreate({ where: { name: c } }));
    let newCity = await City.findAll();
    res.send(newCity);
  } catch (error) {
    next(error);
  }
});

router.get("/serviceTypes", async (req, res, next) => {
  try {
    serviceTypes.map((c) => Service.findOrCreate({ where: { name: c } }));
    let newService = await Service.findAll();
    res.send(newService);
  } catch (error) {
    next(error);
  }
});

router.get("/propertyTypes", async (req, res, next) => {
  try {
    propTypArr.map((t) => TypeOfProp.findOrCreate({ where: { name: t } }));
    let type = await TypeOfProp.findAll();
    res.send(type);
  } catch (error) {
    next(error);
  }
});


//para el detail
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const publication = await getDetail(id);
    res.send(publication);
  } catch (error) {
    next(error);
  }
});

/* router.post('/createService', async (req, res, next) => {
    try {
        if (!req.body.name) res.status(404).send('no services')
        await Service.findOrCreate({
            where: { name: req.body.name }
        })
        res.send('created service')
    } catch (error) {
        next(error)
    }
}) */

router.post("/postReport", async (req, res, next) => {
  try {
    if (!req.body.name) res.status(404).send("no reports");
    await Report.create({
      name: req.body.name,
    });
    res.send("created report");
  } catch (error) {
    next(error);
  }
});


router.post("/image", async (req, res, next) => {
  const { url, cloudId } = req.body;
  try {
    if (!url) return res.status(404).send("no image to upload");
    await PropertyImage.create({
      url,
      cloudId
    });
    res.send("image upload successful");
  } catch (error) {
    next(error);
  }
});

router.post("/createProperty", async (req, res, next) => {
  const {
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
    city,
    service,
    typProp,
    propImg,
  } = req.body;
  try {
    if (
      (!address, !surface, !price, !environments, !bathrooms, !rooms, !garage, !yard, !pets, !age)
    ) {
      return res.status(404).send("fill out data");
    }
    if (!propImg) propImg = "https://res.cloudinary.com/lookhouse/image/upload/v1663619810/hiq8jpgr6wzmzgf5yjaq.png"
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
    });
    if (service) {
      let ser = await Service.findAll({
        where: { name: service },
      });
      property.addService(ser);
    }
    let location = await City.findOne({
      where: { name: city },
    });
    property.setCity(location);
    let type = await TypeOfProp.findOne({
      where: { name: typProp },
    });
    property.setTypeOfProp(type);

    let img = await PropertyImage.findAll({
      where: { url: propImg },
    });
    property.addPropertyImage(img);

    res.send(property.id);
  } catch (error) {
    next(error);
  }
});

router.post("/postProperty", async (req, res, next) => {
  const { description, status, premium, report, id } = req.body;
  try {
    if (!description) res.status(404).send("fill out description");

    let post = await Publication.create({
      description,
      status,
      premium,
    });
    if (report) {
      let rep = await Report.findAll({
        where: { name: report },
      });
      post.addReport(rep);
    }

    let property = await Property.findByPk(id);
    post.setProperty(property);

    res.send("post created");
  } catch (error) {
    next(error);
  }
});



router.put("/editProperty/:id", async (req, res, next) => {
  const { id } = req.params
  const {
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
    city,
    service,
    typProp,
    propImg
  } = req.body;
  const { description, status, premium, propertyId } = req.body;
  try {
    await Publication.upsert({
      id: id,
      description,
      status,
      premium,
    });
    let updatedProp = await Property.findByPk(propertyId)
    await Property.upsert({
      id: propertyId,
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
    });
    if (service) {
      let ser = await Service.findAll({
        where: { name: service },
      });
      updatedProp.addService(ser);
    }
    let location = await City.findOne({
      where: { name: city },
    });
    updatedProp.setCity(location);
    let type = await TypeOfProp.findOne({
      where: { name: typProp },
    });
    await PropertyImage.create({
      url: propImg
    });
    updatedProp.setTypeOfProp(type);
    let img = await PropertyImage.findAll({
      where: { url: propImg },
    });
    updatedProp.addPropertyImage(img);

    res.send('post updated')
  } catch (error) {
    next(error);
  }
});
router.put("/makePremium/:id", async (req, res, next) => {
  const { id } = req.params
  const { description, status, premium } = req.body;
  try {
    await Publication.upsert({
      id: id,
      description,
      status,
      premium,
    });
    res.send('premium')
  } catch (error) {
    next(error);
  }
});


router.post("/image/delete", async (req, res, next) => {
  const { id } = req.body;
  try {
    await cloudinary.uploader.destroy(id);
    await PropertyImage.destroy({ where: { cloudId: id } });
    res.send(`image cloudId ${id} was deleted from db and cloudinary`);
  } catch (error) {
    next(error);
  }
});



router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params
  try {
    const post = await Publication.findByPk(id)

    const deleteImg = await PropertyImage.findAll({where: {propertyId: post.propertyId}})
    await deleteImg.map(img => {
      cloudinary.uploader.destroy(img.cloudId)
      img.destroy()
    })
    await Property.destroy({where: {id: post.propertyId}})
    await Publication.destroy({where: {id: id}})

    res.send(`id ${id} was deleted`)
  } catch (error) {
    next(error)
  }
})



module.exports = router;
