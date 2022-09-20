const { Router } = require('express');
const router = Router();
const { TypeOfUser,User,LoginInfo } = require('../../db')

const getDbInfo = async () => {
     return await User.findAll( ) 
}
const getAllUsers = async ()=> {
    const dbInfo= await getDbInfo();
    return dbInfo;
}
router.get('/users',async(req,res)=>{
    const name=req.query.name
    //const {name}=req.params
    const usersTotal = await getAllUsers();
     if (name){
       
            let userName = await usersTotal.filter(elem => elem.name.toLowerCase().includes(name.toLowerCase())) 
            userName.length ?
             res.status(200).send(userName) :
             res.status(404).send('User not found');
        
            
     }else{
        res.status(200).send(usersTotal)
    }
})
router.get('/users/:name',async(req,res)=>{
    const {name}=req.params
    const usersTotal = await getAllUsers();
     if (name){
       
            let userName = await usersTotal.filter(elem => elem.name.toLowerCase().includes(name.toLowerCase())) 
            userName.length ?
             res.status(200).send(userName) :
             res.status(404).send('User not found');
        
            
     }else{
        res.status(200).send(usersTotal)
    }
})

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
            description, 
            rating,
            typUser,
           // typeOfUserId,
            
    }=req.body
   
    try{

    let userCrea = await User.create({
        name, 
        description, 
        rating
        //typeOfUserId,
       
    }) 
      let  type = await TypeOfUser.findOne({
          where: {name: typUser }
     })
     //console.log(userCrea)
     userCrea.setTypeOfUser(type)
     res.status(200).send('Usuario adicionado correctamente')
    }catch(error){
        res.status(400).send("error al crear usuario ")
    }
       
    })
      
    router.post('/login', async(req,res)=>{
        const {
            mail, 
            password, 
            namUser
           // typeOfUserId,
            
    }=req.body
    try{

    let loginCrea = await LoginInfo.create({
        mail, 
        password, 
        
       
    }) 
      let  nUser = await User.findOne({
          where: {name: namUser }
     })
     //console.log(userCrea)
     loginCrea.setUser(nUser)
     res.status(200).send('Login de usuario adicionado correctamente')
    }catch(error){
        res.status(400).send("error al crear login de usuario ")
    }
       
    })
   





module.exports = router;