const User = require("../model/myDataSchema.js");
const country_list = require("../data/data.js");
//--------------------view the db--------------

const user_index_get = (req, res) => {
  const limit = 5;
  const lastId = req.query.lastId;
  const count = parseInt(req.query.count)||0;
  const query = lastId ? { _id: { $gt: lastId } } : {};
  

  User.find(query)
    .sort({ _id: 1 })
    .limit(limit)
    .then((result) => {
      const newLastId=result.length>0 ? result[result.length-1]._id : null
      res.render("index", { arr: result, newLastId, hasNext:result.length===limit,count });
    })
    .catch((err) => {
      console.log(err);
    });
};
//--------------------requsets handling--------------

const user_add_get = (req, res) => {
  res.render("user/add", { country_list });
};

//-------------------Add into db-------------------

const user_post = (req, res) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/user/add.html");
    })
    .catch((err) => {
      console.log(err);
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
    });
};
//--------------------delete exact user in db--------------

const user_delete = (req, res) => {
  /*also u can use:
    User.findByIdAndDelete(req.params.id)*/

  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
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
    });
};
module.exports = {
  user_index_get,
  user_add_get,
  user_post,
  user_view_get,
  user_edit_get,
  user_delete,
  user_put,
  user_search_get,
};
