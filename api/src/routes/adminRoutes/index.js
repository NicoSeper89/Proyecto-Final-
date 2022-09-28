const { Router } = require("express");
const {  User } = require("../../db")

const router = Router()

router.put("/acces", async (req, res) => {
 const id = req.query.id

 try{
    await User.update(
        { admin: true },
        { where: { id: id } }
      )
    res.send("todo bien")
 }catch(e){
    console.log(e) 
    req.send("todo mal")
 }
    
})

module.exports = router