const { Router } = require("express");
const { User, UserImage, LoginInfo } = require("../../db");
const { getAllUsers } = require("../userRoutes/controllers");

const router = Router();

// esta ruta me convierte en admin a un usuario

router.put("/acces", async (req, res) => {
  const id = req.query.id;

  try {
    await User.update({ admin: true }, { where: { id: id } });
    res.send("todo bien");
  } catch (e) {
    console.log(e);
    req.send("todo mal");
  }
});

router.get("/totalUsers", async (req, res) => {
  const user = await getAllUsers();
  res.send(user);
});

module.exports = router;
