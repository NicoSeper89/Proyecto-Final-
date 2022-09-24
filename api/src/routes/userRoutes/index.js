const { Router } = require("express");
const router = Router();
const { TypeOfUser, User, LoginInfo, UserImage, ContactInfo, Publication } = require("../../db");
const { getAllUsers, getPubs, getPublications } = require("./controllers");
var Sequelize = require("sequelize");

router.get("/users", async (req, res) => {
  const name = req.query.name;
  //const {name}=req.params
  const usersTotal = await getAllUsers();
  if (name) {
    let userName = await usersTotal.filter((elem) =>
      elem.name.toLowerCase().includes(name.toLowerCase())
    );
    userName.length ? res.status(200).send(userName) : res.status(404).send("User not found");
  } else {
    res.status(200).send(usersTotal);
  }
});

router.post("/typeofusers", async (req, res) => {
  try {
    const { name } = req.body;
    await TypeOfUser.create({
      name,
    });

    res.status(200).send("Usuario adicionado con exito");
  } catch (error) {
    res.status(404).send("error al crear tipo de usuario");
  }
});

router.post("/login", async (req, res) => {
  const {
    mail,
    password,
    name,
    // typeOfUserId,
  } = req.body;

  try {
    let loginCrea = await LoginInfo.create({
      mail,
      password,
    });
    let nUser = await User.findOne({
      where: { name: name },
    });
    console.log();
    loginCrea.setUser(nUser);

    res.status(200).send("Login de usuario adicionado correctamente");
  } catch (error) {
    res.status(400).send("error al crear login de usuario ");
  }
});

////////// rutas agregadas \\\\\\\\\\
//me verifica si mi usuario existe y si la contraseña es la de ese usuario

// router.post('/logueado', async(req,res)=>{
//     const {name,password} = req.body

//     var user = await User.findOne({
//         where: {name: name }
//    })

//    !user && res.send({mensaje:"Este Usuario No Existe", loguear: false})

//    if(user) var user2 = await LoginInfo.findOne({
//     where: {id: user.id }
//   })

//     if(user2) user2.password !== password ?
//     res.send({mensaje:"Contraseña Incorrecto", loguear: false}):
//     (res.status(200).send({mensaje: "Logueado Exitosamente",userInfo:[user,user2],loguear: true}))

// })

////// super ruta para loguear un usuario y si no tiene una cuenta creada la crea y loguea \\\\\\

router.post("/LoginOrCreate", async (req, res) => {
  const { name, mail, password, typUser } = req.body;

  const user = await LoginInfo.findOne({
    where: { mail: mail },
  });
  if (user && user.password !== password)
    return res.send({ loguear: false, mensage: "Contraseña incorrecta" });

  if (user) {
    let nUser = await User.findOne({
      where: { id: user.userId },
    });
    res.send({ loguear: true, mensage: "logueado Correctamente", userInfo: [nUser, user] });
  } else {
    let userCrea = await User.create({ name });
    let type = await TypeOfUser.findOne({ where: { name: typUser } });
    const nUser2 = await userCrea.setTypeOfUser(type);

    let loginCrea = await LoginInfo.create({ mail, password });
    let nUser = await User.findOne({ where: { name: name } });
    const user2 = await loginCrea.setUser(nUser);

    const infoUser = await ContactInfo.create({ mail });
    await infoUser.setUser(nUser);

    res.send({ loguear: true, mensage: "logueado Correctamente", userInfo: [nUser2, user2] });
  }

  // try{
  // let userCrea = await User.create({
  //     name,
  // })
  //   let  type = await TypeOfUser.findOne({
  //       where: {name: typUser }
  //  })
  //  //console.log(userCrea)
  //  userCrea.setTypeOfUser(type)

  //  res.status(200).send('Usuario adicionado correctamente')
  // }catch(error){
  //     res.status(400).send("error al crear usuario ")
  // }
});

//   if (user2)
//     user2.password !== password
//       ? res.send({ mensaje: "Contraseña Incorrecto" })
//       : res.status(200).send({ mensaje: "Logueado Exitosamente", user, user2 });
// });

//Esta ruta sirve para cargar una imagen de perfil
router.post("/imageUser", async (req, res, next) => {
  const { url, cloudId, userId } = req.body;
  try {
    if (!url) return res.status(404).send("no image to upload");
    let user = await User.findByPk(userId);
    let img = await UserImage.create({
      url,
      cloudId,
    });
    user.setUserImage(img);
    res.send("image upload successful");
  } catch (error) {
    next(error);
  }
});

//Esta ruta sirve para editar el perfil de cualquier usuario
router.put("/editUser/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, typUser, city, description } = req.body;
  try {
    await User.upsert({
      id: id,
      name,
      city,
      description,
    });
    res.send("updated name");
  } catch (error) {
    next(error);
  }
});

//este recibe el id de la persona rankeada, y el rating que se le va a poner
router.put("/rate", async (req, res, next) => {
  const { id, rating } = req.query;
  const user = await User.findByPk(id);
  let currentRating = rating + user.rating * user.ratingAmount;
  let currentAmount = user.ratingAmount + 1;
  let futureRating = (currentRating / currentAmount).toFixed(2);
  await User.upsert({
    id: id,
    rating: rating,
    ratingAmount: futureRating,
  });
  return res.send("updated rating");
});

//Esta ruta es para ver las publicaciones que hizo el mismo usuario
router.get("/getPubs/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const publications = await getPubs(id);
    res.send(publications);
  } catch (error) {
    next(error);
  }
});

//El mismo id de getpubsuser, pubId es el id de la publicacion(cards) que se le da fav
//
router.put("/setFav", async (req, res, next) => {
  try {
    let { userId, pubId } = req.query;
    await User.update(
      {
        favorites: Sequelize.fn("array_append", Sequelize.col("favorites"), pubId),
      },
      {
        where: {
          id: userId,
        },
      }
    );
    res.send(`añadido ${pubId} a ${userId}`);
  } catch (error) {
    next(error);
  }
});

//este me trae los favoritos del mismo usuario
router.get("/getFavs/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    let favoritos = user.favorites;
    let favoritos2 = [];
    if (favoritos) {
      for (let i = 0; i < favoritos.length; i++) {
        favoritos2.push(await getPublications(favoritos[i]));
        console.log("fav2", favoritos2);
      }
    }
    res.send(favoritos2);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
