const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./model/myDataSchema.js");
app.set("view engine", "ejs");
app.use(express.static('public'));

//                 auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
})
var methodOverride = require('method-override')
app.use(methodOverride('_method'))




//--------------------view the db--------------
app.get("/", (req, res) => {

  User.find().then((result) => {
    res.render("index", { arr: result })
  }).catch((err) => {
    console.log(err)
  })

})




//--------------------requsets handling--------------

app.get("/user/add.html", (req, res) => {
  res.render("user/add", {country_list});
})
//  
// app.get("/user/search.html", (req, res) => {
//   res.render("user/search", {});
// })
app.get("/user/view.html", (req, res) => {
  res.render("user/view", {});
})

//-------------------put into db-------------------
app.post("/user/add.html", (req, res) => {
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
app.get("/view/:id", (req, res) => {
  
  User.findById(req.params.id).then((result) => {
    res.render("user/view", { obj: result })
  }).catch((err) => {
    console.log(err)
  })
})
//--------------------view & edit exact user in db--------------
app.get("/edit/:id", (req, res) => {
  
  User.findById(req.params.id).then((result) => {
    res.render("user/edit", { obj: result , country_list})
  }).catch((err) => {
    console.log(err)
  })
})

      //--------------------delete exact user in db--------------
      app.delete("/delete/:id", (req, res) => {
        
        
        /*also u can use:
        User.findByIdAndDelete(req.params.id)*/
        
        
        User.deleteOne({ _id: req.params.id }).then(() => {
          res.redirect("/")
        }).catch((err) => {
          console.log(err)
        })
      })
      //--------------------update exact user in db--------------
      
      app.put("/edit/:id",(req,res)=>{
        User.updateOne({_id:req.params.id},req.body)
        
        .then(()=>{res.redirect("/")})
        .catch((err) => {
          console.log(err)
          
        })
      })
      
      //-------------------search into db-------------------
      app.get("/search", (req, res) => {
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
      
      
      
      
      //--------------------database connection---------------
      mongoose
      .connect(
        "mongodb+srv://arj181612_db_user:QJIppnzJcKkxZUkj@cluster0.y2nuaxh.mongodb.net/all-dataa?appName=Cluster0",
      )
      .then(() => {
        app.listen(port, () => {
          console.log(`http://localhost:3000/ ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

  // All countries
const country_list = [
  "Afghanistan",
  "Åland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Caribbean Netherlands",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo, Democratic Republic of the",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czech Republic",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (Swaziland)",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and Mcdonald Islands",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Macedonia North",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn Islands",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Barthelemy",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey (Türkiye)",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "U.S. Outlying Islands",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City Holy See",
  "Venezuela",
  "Vietnam",
  "Virgin Islands, British",
  "Virgin Islands, U.S",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];


module.exports=country_list