const fs = require("fs");
const express = require("express");
const router = express.Router();
const image = "../middleware/image";

// Step 7 - the GET request handler that provides the HTML UI

app.get("/", (req, res) => {
  imgModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("ImagesPage", { items: items });
    }
  });
});

// Step 8 - the POST handler for processing the uploaded file

app.post("/", upload.single("Image"), (req, res, next) => {
  var obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "Image/png",
    },
  };
  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.redirect("/");
    }
  });
});

// exports.router=router;
