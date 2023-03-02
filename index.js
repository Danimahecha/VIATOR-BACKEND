const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { CreateModels } = require('./src/utils/utils.js');


const port = process.env.PORT || 4000

// Syncing all the models at once.
conn.sync({ force: true}).then(() => {
  server.listen(port, () => {
    CreateModels()
    console.log(`%s listening at port ${port}`); // eslint-disable-line no-console
  });
});