const express = require('express');
const router = express.Router();
const controller = require("../controller/userController.js")




//--------------------view the db--------------
router.get("/", controller.user_index_get)
//--------------------requsets handling--------------

router.get("/user/add.html",controller.user_add_get )


//-------------------Add into db-------------------
router.post("/user/add.html",controller.user_post );

//--------------------view exact user in db--------------
router.get("/view/:id",controller.user_view_get )
//--------------------view & edit exact user in db--------------
router.get("/edit/:id",controller.user_edit_get )

//--------------------delete exact user in db--------------
router.delete("/delete/:id",controller.user_delete )
//--------------------update exact user in db--------------

router.put("/edit/:id",controller.user_put)

//-------------------search into db-------------------
router.get("/search",controller.user_search_get );

router.use(controller.failed);


module.exports=router;
