const User = require("../model/myDataSchema.js");
const country_list = require("../data/data.js");
const authServices = require("../services/authServices");


//-------------------register-------------------
const user_reg_get = (req,res)=>{
  res.render("user/register", { country_list ,errors:[]})
}

const user_post = async (req, res) => {
  try {
    await authServices.registerUser(req.body);
    return res.redirect("/login");
  } catch (err) {
    const errors = [];

    if (err.code === 11000) {
      errors.push("Email is already registered");
    } else if (err.name === "ValidationError") {
      Object.values(err.errors).forEach((e) => errors.push(e.message));
    } else {
      errors.push("An unexpected server error occurred");
    }

    return res.status(400).render("user/register", {
      country_list,
      errors,
    });
  }
};

module.exports = { user_post };
//--------------------view the db--------------

const user_index_get = (req, res) => {
  const limit = 5;
  const lastId = req.query.lastId;
  const count = parseInt(req.query.count)||0;
  const query = lastId ? { _id: { $gt: lastId } } : {};
  let page=parseInt(req.query.page)||0
  page = page?++page:1;

  User.find(query)
    .sort({ _id: 1 })
    .limit(limit+1)
    .then((result) => {
      const hasNext = result.length>limit
      const arr = hasNext?result.slice(0,limit):result
      const newLastId= arr.length > 0 ? arr[arr.length - 1]._id : null; 
      res.render("index", { arr, newLastId, hasNext,count,lastId,page });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Enternal Server Error");
    });
  };
  



//--------------------view exact user in db--------------

const user_view_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result });
    })
    .catch((err) => {
      console.log(err);
        res.status(500).send("Enternal Server Error");

      
    });
};
//--------------------view & edit exact user in db--------------

const user_edit_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { obj: result, country_list });
    })
    .catch((err) => {
      console.log(err);
            res.status(500).send("Enternal Server Error");

    });
};
//--------------------delete exact user in db--------------

const user_delete = (req, res) => {
  /*also u can use:
    User.findByIdAndDelete(req.params.id)*/

  User.deleteOne({ _id: req.params.id })
    .then(() => {
      const {lastId,count}=req.query;
      const query=lastId ? `?lastId=${lastId}&count=${count}` : "";
      res.redirect(`/${query}`);
    })
    .catch((err) => {
      console.log(err);
            res.status(500).send("Enternal Server Error");

    });
};
//--------------------update exact user in db--------------

const user_put = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)

    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
            res.status(500).send("Enternal Server Error");

    });
};
//-------------------search into db-------------------

const user_search_get = (req, res) => {
  const text = req.query.search || "";
  const words = text.trim().split(/\s+/).filter(Boolean);
  

  const searchConditions = words.map((word) => ({
    $or: [
      { firstName: { $regex: word, $options: "i" } },
      { lastName: { $regex: word, $options: "i" } },
    ],
  }));

  const query = searchConditions.length ? { $and: searchConditions } : {};

  User.find(query)
    .then((result) => {
      res.render("user/search", { result });
    })
    .catch((err) => {
      console.log(err);
            res.status(500).send("Enternal Server Error");

    });
};
const failed=(req,res)=>{res.status(404).render("404");}


module.exports = {
  user_index_get,
  user_reg_get,
  user_post,
  user_view_get,
  user_edit_get,
  user_delete,
  user_put,
  user_search_get,
  failed
};
