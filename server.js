const express = require("express");
const hbs = require("express-handlebars");
const fs = require("fs");
const routes = require("./routes/nickname");
// const adRoutes = require('./routes/adventure')
const server = express();
// const server2 = express()

// Server configuration
server.use(express.static("public"));
server.use(express.urlencoded({ extended: false }));
// server2.use(express.static('public'))
// server2.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine("hbs", hbs({ extname: "hbs" }));
server.set("view engine", "hbs");
// server2.engine('hbs', hbs({ extname: 'hbs' }))
// server2.set('view engine', 'hbs')

// routes/router(s) should go here

server.use("/nickname", routes);
// server2.use("/adventure",adRoutes)
// server.use("/adventure",adRoutes)

server.get("/", (req, res) => {
  res.render("home");
});

server.get("/adventure", (req, res) => {
  fs.readFile("./image.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const newData = {
        ...JSON.parse(data),
      };
      console.log(newData);
      res.render("adventureView", newData);
    }
  });
});

server.get("/adventure/:id", (req, res) => {
  let prop = {
    propID: "",
    imageURL: "",
    comments: "",
  };

  fs.readFile("./image.json", "utf8", (err, data) => {
    if (err) {
      console.log("there is an error ", err);
    } else {
      let newData = {
        ...JSON.parse(data),
      };
      // console.log(newData);
      // let id = req.params.id;
      // propID = id
      prop = newData.images.find((image) => image.id == req.params.id);
      // res.render("details", viewData)
      res.render("pictures", prop);
      // imageURL = newdata.images.find()
    }
  });
});

server.post("/adventure/:id", (req, res) => {
  // let prop = {
  //   propID: "",
  //   imageURL: "",
  //   comments: "",
  // };

  fs.readFile("./image.json", "utf8", (err, data) => {
    if (err) {
      console.log("there is an error ", err);
    } else {
      let newData = {
        ...JSON.parse(data),
      };
      // prop = newData.images.find((image) => image.id == req.params.id);
      
      newData.images = newData.images.map((image) => {
        if(image.id == req.params.id) {
          image.comments += ", "+req.body.comment
        }
        return image
      })

      // prop.comments += ", "+req.body.comment

      fs.writeFile("./image.json", JSON.stringify(newData, null, 2), "utf8", (err) => {
        if(err) {
          console.log("there was an error ", err)
        } else {
          res.redirect("/adventure/"+req.params.id)
          
        }
      })
    }
  });
});

module.exports = server;
