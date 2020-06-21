const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const { connect } = require("./configs/mongo");

connect((err) => {
  if (!err) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use("/", require("./route"));
    app.listen(port, () => {
      console.log(`server started on port ${port}`);
    });
  }
});
