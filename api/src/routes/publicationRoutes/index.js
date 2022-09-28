const { Router } = require("express");
const cloudinary = require("../../utils/cloudinary");
const {
  Publication,
  Property,
  Service,
  TypeOfProp,
  City,
  PropertyImage,
  Report,
  User,
  PublicationComents,
} = require("../../db");
const router = Router();
const {
  getAll,
  getDetail,
  getFiltered,
  sortBy,
  propTypArr,
  serviceTypes,
  getCity,
  findAllReports,
  findReportById,
} = require("./controllers");
const { where } = require("sequelize");

//para el home y para el searchbar get con query
router.get("/allPublications", async (req, res, next) => {
  const allPubli = await getAll();
  res.send(allPubli);
});

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
    let allPublications = await getAll(); /// me trae todas las casas con sus propiedades
    let publications = allPublications.filter((p) => !p.deleted);
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

router.get("/premium", async (req, res, next) => {
  try {
    const publications = await getAll();
    const premium = await publications.filter((p) => p.premium);
    res.send(premium);
  } catch (error) {
    next(error);
  }
});
//apps a aprobar
router.get("/forApproval", async (req, res, next) => {
  try {
    const publications = await getAll();
    const notApproved = await publications.filter((p) => !p.approved);
    res.send(notApproved);
  } catch (error) {
    next(error);
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
//trae todos los reportes que existen
router.get("/reportList", async (req, res, next) => {
  try {
    let reportList = await findAllReports();
    res.send(reportList);
  } catch (error) {
    next(error);
  }
});
//trae todos los reportes de una publicacion
router.get("/reportList/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let reportList = await findReportById(id);
    res.send(reportList);
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
      cloudId,
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
  const { description, status, premium, report, id, userId } = req.body;
  try {
    if (!description) res.status(404).send("fill out description");
    let user = await User.findByPk(userId);
    if (user.approved) {
      let post = await Publication.create({
        description,
        status,
        premium,
        approved: true,
      });
    } else {
      let post = await Publication.create({
        description,
        status,
        premium,
      });
    }
    if (report) {
      let rep = await Report.findAll({
        where: { name: report },
      });
      post.addReport(rep);
    }
    let property = await Property.findByPk(id);
    post.setProperty(property);
    post.setUser(user);
    res.send(post.id);
  } catch (error) {
    next(error);
  }
});

router.put("/editProperty/:id", async (req, res, next) => {
  const { id } = req.params;
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
  const { description, status, premium, propertyId } = req.body;
  try {
    await Publication.upsert({
      id: id,
      description,
      status,
      premium,
    });
    let updatedProp = await Property.findByPk(propertyId);
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

    let allServices = await Service.findAll();
    let deleteSer = allServices.filter((s) => s !== service);
    updatedProp.removeService(deleteSer);
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
    updatedProp.setTypeOfProp(type);

    propImg?.map(async (i) => {
      let img = await PropertyImage.findAll({
        where: { url: i.url },
      });
      updatedProp.addPropertyImage(img);
    });

    res.send("post updated");
  } catch (error) {
    next(error);
  }
});
router.put("/makePremium/:id", async (req, res, next) => {
  const { id } = req.params;
  /* const { description, status, premium } = req.body; */
  try {
    let updatedPub = await Publication.findByPk(id);
    await Publication.upsert({
      id: id,
      description: updatedPub.description,
      status: updatedPub.status,
      premium: true,
    });
    res.send("premium");
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
  const { id } = req.params;
  try {
    const post = await Publication.findByPk(id);

    const deleteImg = await PropertyImage.findAll({ where: { propertyId: post.propertyId } });
    await deleteImg.map((img) => {
      cloudinary.uploader.destroy(img.cloudId);
      img.destroy();
    });
    await Property.destroy({ where: { id: post.propertyId } });
    await Publication.destroy({ where: { id: id } });

    res.send(`id ${id} was deleted`);
  } catch (error) {
    next(error);
  }
});

router.put("/unavailable/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let publi = await Publication.findByPk(id);

    await Publication.update({ deleted: !publi.deleted }, { where: { id: id } });
    res.send("publication availablity has changed");
  } catch (error) {
    next(error);
  }
});

router.get("/comment/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    console.log("soy el id:", id);
    const comments = await PublicationComents.findAll({ where: { publicationId: id } });
    console.log("soy comments:", comments);
    res.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});

router.get("/comment/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    console.log("soy el id:", id);
    const comments = await PublicationComents.findAll({ where: { publicationId: id } });
    console.log("soy comments:", comments);
    res.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});

router.post("/comment", async (req, res, next) => {
  const { message, publicationId } = req.body;
  try {
    let mensaje = await PublicationComents.create({
      message,
      publicationId,
    });
    res.status(200).send(mensaje);
  } catch (error) {
    next(error);
  }
});
// crea un reporte a la pblicacion por params, con la info de body
router.post("/report/:id", async (req, res, next) => {
  const { id } = req.params;
  const { type, info, userId } = req.body;
  try {
    let user = await User.findByPk(userId);
    let publi = await Publication.findByPk(id);
    if (type) {
      let report = await Report.create({
        type: type,
        info: info,
      });
      report.setUser(user);
      publi.addReport(report);
    }
    res.send("Se reporto la publicacion");
  } catch (error) {
    next(error);
  }
});

// borra un reporte a la pblicacion por params, con la info de body
router.delete("/report/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Report.destroy({ where: { id: id } });
    res.send("Se borro el reporte");
  } catch (error) {
    next(error);
  }
});

router.put("/approvePost/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Publication.update({ approved: true }, { where: { id: id } });
    res.send("Se aprobo la publicacion");
  } catch (error) {
    next(error);
  }
});
router.put("/approveUser/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.update({ approved: true }, { where: { id: id } });
    res.send("Se aprobo al usuario");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
