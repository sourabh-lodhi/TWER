const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongooseParanoidPlugin = require('mongoose-paranoid-plugin');

const { initial } = require("./helpers");
const message = require("./constant");
const routes = require("./routes");
const { sendMailByCron } = require("./helpers");

const corsOptions = {
  origin: process.env.FRONTEND_PORT,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/assets', express.static('assets/images'));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
mongoose.plugin(mongooseParanoidPlugin, { field: 'deletedAt' })
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.info(message.successMessages.MONG0_CONN_SUCCESS);
    initial();
  })
  .catch((err) => {
    console.log("🚀 ~ file: index.js:35 ~ err", err)
    process.exit(1);
  });
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.use("/api", routes);

app.use((req, res, next) => {
  res.status(404).send(message.errorMessages.SORRY_CAN_NOT_FIND_THAT);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
});
