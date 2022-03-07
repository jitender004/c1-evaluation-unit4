const express = require("express");
const app = express();

app.use(logger);

app.get("/books", (req, res) => {
  return res.send({ route: "/books" });
});

app.get("/libraries", checkPermission("librarian"), (req, res) => {
  return res.send({ route: "/libraries", permission: true });
});

app.get("/authors",checkPermission("author"),(req, res) => {
  return res.send({ route: "/authors", permission: true });
});

function logger(req, res, next) {
  if (req.path == "/libraries") {
    req.permission = "true";
  } else if ((req.path = "/authors")) {
    req.permission = "true";
  }
  next();
}

function checkPermission(add) {
  return function logger(req, res, next) {
      if(add=="librarian"){
          return next();
      }
      else if(add=="author"){
          return next();
      }
      return req.send("Not librarian");
  };
}

app.listen(3000, () => {
  console.log("HII BROWSER");
});
