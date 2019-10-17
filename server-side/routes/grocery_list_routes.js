const express = require("express");
const router = express.Router();

const groceryListController = require("../controller/grocery_list_controller");
const validation = require("./validations");

router.get("/grocery-list/check", groceryListController.checkForChange);
router.get("/grocery-list/show/:name", validation.signedInValidator, groceryListController.find);
router.get("/grocery-list/edit/:name", validation.signedInValidator, groceryListController.find);

router.post("/grocery-list/create-list", validation.signedInValidator,
                            validation.createEditNewGroceryListValidations,
                            validation.validator,
                            groceryListController.createList);

router.post("/grocery-list/delete-list", validation.signedInValidator, groceryListController.deleteList);

router.post("/grocery-list/update/:name",   validation.signedInValidator,
                                            validation.createEditNewGroceryListValidations,
                                            validation.validator,
                                            groceryListController.update);

module.exports = router;