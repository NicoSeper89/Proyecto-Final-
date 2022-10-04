const { Router } = require("express");
const { User, UserImage, LoginInfo, Publication } = require("../../db");
const { getAllUsers } = require("../userRoutes/controllers");

const router = Router();

// esta ruta me convierte en admin a un usuario

router.put("/acces", async (req, res) => {
  const id = req.query.id;

  try {
    await User.update({ admin: true }, { where: { id: id } });
    res.send("todo bien");
  } catch (e) {
    req.send("todo mal");
  }
});

router.get("/totalUsers", async (req, res) => {
  const user = await getAllUsers();
  res.send(user);
});

router.get("/pubDates", async(req,res,next)=>{
  try {
    let pub = await Publication.findAll()
    let allDates = pub.map(a => a.createdAt.getMonth()+1+'-'+a.createdAt.getFullYear())
    res.send(allDates)
  } catch (error) {
    next(error)
  }
})

router.get("/userDates", async(req,res,next)=>{
  try {
    let user = await User.findAll()
    let allDates = user.map(a => a.createdAt.getMonth()+1+'-'+a.createdAt.getFullYear())
    res.send(allDates)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
