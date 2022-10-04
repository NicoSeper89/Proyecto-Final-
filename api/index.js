const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.

conn.sync({ force:false}).then(() => {

  server.listen(process.env.PORT, () => {
    console.log(`server listening at port ${process.env.PORT}`);
  });
});
