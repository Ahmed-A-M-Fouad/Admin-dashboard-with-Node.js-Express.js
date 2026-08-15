const express = require('express');
const router = express.Router();
const User = require("../model/myDataSchema.js");
const country_list = require("../data/data.js");




//--------------------view the db--------------
router.get("/", (req, res) => {

  User.find().then((result) => {
    res.render("index", { arr: result })
  }).catch((err) => {
    console.log(err)
  })

})
//--------------------requsets handling--------------

router.get("/user/add.html", (req, res) => {
  res.render("user/add", {country_list});
})

router.get("/user/view.html", (req, res) => {
  res.render("user/view", {});
})

//-------------------Add into db-------------------
router.post("/user/add.html", (req, res) => {
  User
    .create(req.body)
    .then(() => {
      res.redirect("/user/add.html");
    })
    .catch((err) => {
      console.log(err);
    });
});

//--------------------view exact user in db--------------
router.get("/view/:id", (req, res) => {
  
User.findById(req.params.id).then((result) => {
res.render("user/view", { obj: result })
}).catch((err) => {
console.log(err)
})
})
//--------------------view & edit exact user in db--------------
router.get("/edit/:id", (req, res) => {
  
  User.findById(req.params.id).then((result) => {
    res.render("user/edit", { obj: result , country_list})
  }).catch((err) => {
    console.log(err)
  })
})

//--------------------delete exact user in db--------------
router.delete("/delete/:id", (req, res) => {


/*also u can use:
User.findByIdAndDelete(req.params.id)*/


User.deleteOne({ _id: req.params.id }).then(() => {
res.redirect("/")
}).catch((err) => {
console.log(err)
})
})
//--------------------update exact user in db--------------

router.put("/edit/:id",(req,res)=>{
User.updateOne({_id:req.params.id},req.body)

.then(()=>{res.redirect("/")})
.catch((err) => {
console.log(err)

})
})

//-------------------search into db-------------------
router.get("/search", (req, res) => {
const text = req.query.search || "";
User
.find({ $or:[{ firstName: { $regex: text, $options: "i" } },
{ lastName: { $regex: text, $options: "i" } }] })
.then((result) => {
res.render("user/search", {result});
})
.catch((err) => {
console.log(err);
});
});


module.exports=router;
