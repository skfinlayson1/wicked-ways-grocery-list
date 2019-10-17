const express = require("express");
const router = express.Router();

const groceryItemController = require("../controller/grocery_item_controller");
const validation = require("./validations");

router.post("/grocery-item/create-item", validation.signedInValidator,
                            validation.createEditNewGroceryItemValidations,
                            validation.validator,
                            groceryItemController.createItem);

router.post("/grocery-item/update/:groceryListName/:itemName", validation.signedInValidator,
                                                       validation.createEditNewGroceryItemValidations,
                                                       validation.validator,
                                                       groceryItemController.updateItem);

router.post("/grocery-item/update-checkbox/:groceryListName/:itemName", validation.signedInValidator, groceryItemController.updateCheckbox)

router.get("/grocery-item/find/:groceryListName/:itemName", validation.signedInValidator, groceryItemController.findItem);

router.get("/grocery-item/delete/:groceryListName/:itemName", validation.signedInValidator, groceryItemController.deleteItem);

module.exports = router;