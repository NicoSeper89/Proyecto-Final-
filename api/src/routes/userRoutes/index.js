const { Router } = require("express");
const router = Router();
const { TypeOfUser, User, LoginInfo } = require("../../db");

const getDbInfo = async () => {
  return await User.findAll();
};
const getAllUsers = async () => {
  const dbInfo = await getDbInfo();
  return dbInfo;
};
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

router.post('/typeofusers', async(req,res)=>{
        try{
        const {
              name,
        }=req.body
        
        let typeOfUserCrea = await TypeOfUser.create({
            name,                     
        }) 
        res.status(200).send("Usuario adicionado con exito")
        }catch(error){
            res.status(404).send("error al crear tipo de usuario")
        }
           
        })
        //ok
        // router.post('/users', async(req,res)=>{
        //     try{
        //     const {
        //           name,
        //     }=req.body
            
        //     let typeOfUserCrea = await TypeOfUser.create({
        //         name,                     
        //     }) 
        //     res.status(200).send("Usuario adicionado con exito")
        //     }catch(error){
        //         res.status(404).send("error al crear tipo de usuario")
        //     }
               
        //     })
    router.post('/users', async(req,res)=>{
        const {
            name, 
            typUser
           // typeOfUserId,
            
    }=req.body
    
   
    try{

router.post("/typeofusers", async (req, res) => {
  try {
    const { name } = req.body;

    let typeOfUserCrea = await TypeOfUser.create({
      name,
    });
    res.status(200).send("Usuario adicionado con exito");
  } catch (error) {
    res.status(404).send("error al crear tipo de usuario");
  }
});
//ok
// router.post('/users', async(req,res)=>{
//     try{
//     const {
//           name,
//     }=req.body

//     let typeOfUserCrea = await TypeOfUser.create({
//         name,
//     })
//     res.status(200).send("Usuario adicionado con exito")
//     }catch(error){
//         res.status(404).send("error al crear tipo de usuario")
//     }

//     })
router.post("/users", async (req, res) => {
  const {
    name,
    typUser,
    // typeOfUserId,
  } = req.body;

  try {
    let userCrea = await User.create({
      name,
      //typeOfUserId,
    });
    let type = await TypeOfUser.findOne({
      where: { name: typUser },
    });
    //console.log(userCrea)
    userCrea.setTypeOfUser(type);

    res.status(200).send("Usuario adicionado correctamente");
  } catch (error) {
    res.status(400).send("error al crear usuario ");
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

    router.post('/LoginOrCreate', async(req,res)=>{
        const {name, mail, password, typUser }=req.body

       const user = await LoginInfo.findOne({
                 where: {mail: mail }
              
        })
        if(user && user.password !== password) return res.send({loguear: false,mensage:"Contraseña incorrecta"})

       if(user){
        let  nUser = await User.findOne({
            where: {id: user.userId }
      }) 
       res.send({loguear:true,mensage:"logueado Correctamente" ,userInfo:[nUser,user]})
    }
    else {
        let userCrea = await User.create({ name }) 
        let  type = await TypeOfUser.findOne({ where: {name: typUser }})
       const nUser2 = await userCrea.setTypeOfUser(type)

        let loginCrea = await LoginInfo.create({mail, password }) 
        let  nUser = await User.findOne({where: {name: name }})
        const user2 = await loginCrea.setUser(nUser)


        res.send({loguear: true,mensage:"logueado Correctamente",userInfo:[nUser2,user2]})
     
        
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
    })

  if (user2)
    user2.password !== password
      ? res.send({ mensaje: "Contraseña Incorrecto" })
      : res.status(200).send({ mensaje: "Logueado Exitosamente", user, user2 });
});

module.exports = router;
