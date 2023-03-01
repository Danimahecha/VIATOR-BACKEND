const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const port = process.env.PORT || 4000

// Syncing all the models at once.
conn.sync({ force: false}).then(() => {
  server.listen(port, () => {
    console.log(`%s listening at port ${port}`); // eslint-disable-line no-console
  });
}); 