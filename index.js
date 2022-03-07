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


function checkPermission(check){
  return function loggerIn(req,res,next){
        if(check =="librarian"){
            if(req.path == "/libraries"){
                return next();
            }else{
                return res.send({permission:false});
            }

        }
       else if(check =="author"){
          if(req.path == "/authors"){
             return next();
          }else{
             return res.send({permission:false})
          }

      }else{
          return res.send("Not Allowed...");
      }
  }

}

app.listen(3000, () => {
  console.log("HII BROWSER");
});
