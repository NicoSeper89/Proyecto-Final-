const axios = require("axios");
const {
  Publication,
  Property,
  Service,
  TypeOfProp,
 /*  City, */
  PropertyImage,
  Report,
  User,
  ContactInfo,
} = require("../../db");

//habria que agregar FilterByParams que recibe publicaciones y filtros y devuelve las
//publis correspondientes. Si no se puede hacer flexible, habria que hacer un Filter por criterio
// y en el llamado desde la ruta, hacer un loop que llame a todas.
//habria que agregar un sort que recibe las publicaciones y el criterio, y las ordena de
//acuerdo a eso, de nuevo, revisar si se puede hacer flexible, sino un sort por criterio
// getAll devuelve todas las publicaciones(checkear con database)
const getAll = async () => {
  return await Publication.findAll({
    include: [
      {
        model: Property,
        include: [
        /*   {
            model: City,
            attributes: ["name"],
          }, */
          {
            model: TypeOfProp,
            attributes: ["name"],
          },
          {
            model: Service,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
          {
            model: PropertyImage,
            attributes: ["url", "cloudId"],
          }
        ],
      },
      {
        model: Report,
      },
    ],
  });
};
const getDetail = async (id) => {
  return await Publication.findOne({
    where: { id: id },
    include: [
      {
        model: Property,
        include: [
        /*   {
            model: City,
            attributes: ["name"],
          }, */
          {
            model: TypeOfProp,
            attributes: ["name"],
          },
          {
            model: Service,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
          {
            model: PropertyImage,
            attributes: ["url", "cloudId"],
          }
        ],
      },
      {
        model: Report,
      },
      {
        model: User,
        include: [
          {
            model: ContactInfo,
            attributes: ["mail", "whatsapp", "telegram", "facebook"],
          },
        ],
      },
    ],
  });
};
const getFiltered = async (publications, filters) => {
  let filtered = [];
  await publications.forEach(async function (publi) {
    let publiFiltered = [];

    await filters.publication.forEach((filter) => {
      /// preguntar com funciona IMPORRRTANNNTEEE
      if (publi[filter.name] === filter.value) {
        publiFiltered.push(publi);
      }
    });
    let propertyFiltered = [];
    await filters.property.forEach((filter) => {
      if (publi.property[filter.name] === filter.value) {
        propertyFiltered.push(publi);
      }
    });
    if (
      publiFiltered.length === filters.publication.length &&
      propertyFiltered.length === filters.property.length
    ) {
      if (
        publi.property.TypeOfProp.dataValues.name === filters.typeOfProp ||
        filters.typeOfProp === ""
      ) {
        filtered.push(publi);
      }
    }
  });
  return filtered;
};

const sortBy = async (publications, sorting) => {
  let result = [];
  if (sorting.direccion === "minMax") {
    result = await publications.sort(function (a, b) {
      if (a.property[sorting.name] > b.property[sorting.name]) return 1;
      else if (a.property[sorting.name] < b.property[sorting.name]) return -1;
      return 0;
    }); // preguntar qu me ordena este sort???
  } else if (sorting.direccion === "maxMin") {
    result = await publications.sort(function (a, b) {
      if (a.property[sorting.name] < b.property[sorting.name]) return 1;
      else if (a.property[sorting.name] > b.property[sorting.name]) return -1;
      return 0;
    });
  }
  return result;
};

/* const getCity = async () => {
  const info = await axios.get("https://apis.datos.gob.ar/georef/api/provincias");
  const names = await info.data.provincias.map((a) => {
    return a.nombre;
  });
  return names;
}; */
const findAllReports = async()=> {
  return await Report.findAll({
    include: [{
      model:Publication,
      include:[
        
      ]
    },
    {
      model:User,
      include:[

      ]
    }
    ]
  })
}
const findReportById = async(id)=> {
  return await Report.findAll({
    include: [{
      model:Publication,
      where:{id:id},
      include:[
      ]
    },
    {
      model:User,
      include:[
      ]
    }
    ]
  })
}

// const cityArr = [
//   "buenos aires",
//   "mendoza",
//   "rosario",
//   "catamarca",
//   "chaco",
//   "jujuy",
//   "la pampa",
//   "rioja",
//   "misiones",
//   "salta",
//   "san juan",
// ];
const propTypArr = [
  "Casa",
  "Departamento",
  "Local",
  "Estacionamiento",
  "Quincho",
  "Cabaña",
  "Duplex",
  "Oficina",
  "Garage",
  "Oficina",
];
const serviceTypes = ["Luz", "Agua", "Gas", "Internet", "Calefacción"];

let fakeProperties = [
  {
    "id": "a042f1f0-1e95-4208-8338-bbb701e3400e",
    "address": "Sta. Cruz, C1282 CABA, Argentina",
    "surface": 60,
    "price": 500000000,
    "environments": 2,
    "bathrooms": 1,
    "rooms": 1,
    "garage": 0,
    "yard": 0,
    "pets": false,
    "age": 50505,
    "propVideo": null,
    "createdAt": "2022-09-04T00:34:30.267Z",
    "updatedAt": "2022-09-04T00:34:30.321Z",
    "TypeOfPropId": 8,
  },
  {
    "id": "85d36d6f-839d-4e7b-9605-516a798b9ed6",
    "address": "Sta. Cruz, C1282 CABA, Argentina",
    "surface": 0,
    "price": 5,
    "environments": 2,
    "bathrooms": 0,
    "rooms": 0,
    "garage": 0,
    "yard": 0,
    "pets": false,
    "age": 0,
    "propVideo": null,
    "createdAt": "2022-09-03T22:57:16.857Z",
    "updatedAt": "2022-09-03T22:57:16.916Z",
    "TypeOfPropId": 2,
  },
  {
    "id": "0e188976-787f-4607-86cf-d39623024e5f",
    "address": "Perú 1264, M5539 Las Heras, Mendoza, Argentina",
    "surface": 111,
    "price": 1,
    "environments": 11,
    "bathrooms": 1,
    "rooms": 11,
    "garage": 1,
    "yard": 1,
    "pets": false,
    "age": 1,
    "propVideo": null,
    "createdAt": "2022-08-28T23:09:31.254Z",
    "updatedAt": "2022-08-28T23:09:31.328Z",
    "TypeOfPropId": 1,
  },
  {
    "id": "92938e2c-6c68-4127-a1c3-d36bf346401d",
    "address": "Perú 126, C1067AAC CABA, Argentina",
    "surface": 11,
    "price": 1,
    "environments": 1,
    "bathrooms": 1,
    "rooms": 1,
    "garage": 11,
    "yard": 1,
    "pets": false,
    "age": 1,
    "propVideo": null,
    "createdAt": "2022-08-03T22:44:43.871Z",
    "updatedAt": "2022-08-03T22:44:43.940Z",
    "TypeOfPropId": 1,
  },
  {
    "id": "a126ce11-88e0-4b9e-a22f-60554b4bbb82",
    "address": "Las Heras, Mendoza Province, Argentina",
    "surface": 1,
    "price": 1,
    "environments": 1,
    "bathrooms": 1,
    "rooms": 1,
    "garage": 1,
    "yard": 1,
    "pets": false,
    "age": 11,
    "propVideo": null,
    "createdAt": "2022-09-03T22:49:59.616Z",
    "updatedAt": "2022-09-03T22:49:59.687Z",
    "TypeOfPropId": 1,
  },
  {
    "id": "3df16ca9-8e3a-4b41-80cf-de5a97d95183",
    "address": "New York, NY, USA",
    "surface": 1,
    "price": 1,
    "environments": 1,
    "bathrooms": 1,
    "rooms": 1,
    "garage": 1,
    "yard": 1,
    "pets": false,
    "age": 1,
    "propVideo": null,
    "createdAt": "2022-09-29T23:42:18.101Z",
    "updatedAt": "2022-09-29T23:42:18.160Z",
    "TypeOfPropId": 4,
  },
  {
    "id": "9ab59f2b-e955-48bb-a187-33301164d72c",
    "address": "Las Vegas, NV, USA",
    "surface": 1,
    "price": 1,
    "environments": 1,
    "bathrooms": 1,
    "rooms": 1,
    "garage": 11,
    "yard": 4,
    "pets": false,
    "age": 1,
    "propVideo": null,
    "createdAt": "2022-09-29T23:42:42.902Z",
    "updatedAt": "2022-09-29T23:42:42.964Z",
    "TypeOfPropId": 3,
  },
  {
    "id": "5b80eaff-1955-4a0c-9dc9-1e7338e75a3b",
    "address": "SMATA, Córdoba, Argentina",
    "surface": 1,
    "price": 1,
    "environments": 11,
    "bathrooms": 1,
    "rooms": 11,
    "garage": 11,
    "yard": 11,
    "pets": false,
    "age": 1,
    "propVideo": null,
    "createdAt": "2022-07-30T14:28:23.395Z",
    "updatedAt": "2022-07-30T14:28:23.455Z",
    "TypeOfPropId": 7,
  },
  {
    "id": "d03df643-095b-4c63-bbbe-9ee847a6187d",
    "address": "20 Convention Centre Pl, South Wharf VIC 3006, Australia",
    "surface": 1,
    "price": 1,
    "environments": 1,
    "bathrooms": 1,
    "rooms": 11,
    "garage": 1,
    "yard": 1,
    "pets": false,
    "age": 1,
    "propVideo": null,
    "createdAt": "2022-09-29T23:41:56.729Z",
    "updatedAt": "2022-09-03T18:03:13.838Z",
    "TypeOfPropId": 3,
  }
]
let fakePub = [
  {
    "id": "44150414-b5a9-4e99-8140-c4b9494d6c3e",
    "description": "fbcbcfbcbcb",
    "status": "",
    "premium": false,
    "deleted": false,
    "approved": true,
    "createdAt": "2022-09-04T00:34:30.417Z",
    "updatedAt": "2022-09-04T00:34:30.420Z",
    "userId": 1,
    "propertyId": "a042f1f0-1e95-4208-8338-bbb701e3400e",
  },
  {
    "id": "7ccd3c12-3348-4b00-aed9-def8d4bb068b",
    "description": "fghfgfgfgfgfgfgfg",
    "status": "",
    "premium": false,
    "deleted": false,
    "approved": true,
    "createdAt": "2022-09-03T22:57:17.011Z",
    "updatedAt": "2022-09-03T22:57:17.017Z",
    "userId": 1,
    "propertyId": "85d36d6f-839d-4e7b-9605-516a798b9ed6",
  },
  {
    "id": "b2190fe6-f211-409c-8b89-02c9d8c2132a",
    "description": "fgdfgfdgdgd",
    "status": "",
    "premium": true,
    "deleted": true,
    "approved": true,
    "createdAt": "2022-08-28T23:09:31.346Z",
    "updatedAt": "2022-08-04T01:10:02.437Z",
    "userId": 1,
    "propertyId": "0e188976-787f-4607-86cf-d39623024e5f"
  },
  {
    "id": "3f3ed2aa-40af-439c-ad10-fabba17112cf",
    "description": "gdfgdfd",
    "status": "",
    "premium": false,
    "deleted": false,
    "approved": true,
    "createdAt": "2022-08-03T22:44:44.018Z",
    "updatedAt": "2022-08-03T22:44:44.022Z",
    "userId": 1,
    "propertyId": "92938e2c-6c68-4127-a1c3-d36bf346401d",
  },
  {
    "id": "07dbc802-8ea4-4ee4-83f7-74b6f670ead9",
    "description": "yjgyjgyj",
    "status": "",
    "premium": false,
    "deleted": false,
    "approved": true,
    "createdAt": "2022-09-03T22:49:59.787Z",
    "updatedAt": "2022-09-03T22:49:59.812Z",
    "userId": 1,
    "propertyId": "a126ce11-88e0-4b9e-a22f-60554b4bbb82",
  },
  {
    "id": "ed44992e-c193-40ea-a1cb-659c4f551a99",
    "description": "thfgthgfhgfh",
    "status": "",
    "premium": false,
    "deleted": false,
    "approved": true,
    "createdAt": "2022-09-29T23:42:18.197Z",
    "updatedAt": "2022-09-29T23:42:18.245Z",
    "userId": 1,
    "propertyId": "3df16ca9-8e3a-4b41-80cf-de5a97d95183",
  },
  {
    "id": "485049fd-3544-4709-8347-28c13ca9c914",
    "description": "fbdfb",
    "status": "",
    "premium": true,
    "deleted": false,
    "approved": true,
    "createdAt": "2022-09-29T23:42:42.981Z",
    "updatedAt": "2022-09-29T23:42:43.018Z",
    "userId": 1,
    "propertyId": "9ab59f2b-e955-48bb-a187-33301164d72c",
  },
  {
    "id": "08d2e33c-e7db-4886-9f1c-bf06401a8b5d",
    "description": "dgd",
    "status": "",
    "premium": true,
    "deleted": false,
    "approved": true,
    "createdAt": "2022-07-30T14:28:23.502Z",
    "updatedAt": "2022-07-30T14:28:23.526Z",
    "userId": 1,
    "propertyId": "5b80eaff-1955-4a0c-9dc9-1e7338e75a3b",
  },
  {
    "id": "09577cc9-6e03-46e5-b751-7d7fa00de766",
    "description": "ghf",
    "status": "",
    "premium": true,
    "deleted": false,
    "approved": true,
    "createdAt": "2022-09-29T23:41:56.829Z",
    "updatedAt": "2022-09-03T18:03:13.807Z",
    "userId": 1,
    "propertyId": "d03df643-095b-4c63-bbbe-9ee847a6187d",
  }
]


module.exports = {
  getAll,
  getDetail,
  getFiltered,
  sortBy,
  //   cityArr,
  propTypArr,
  serviceTypes,
/*   getCity,
 */  findAllReports,
  findReportById,
  fakeProperties,
  fakePub
};
