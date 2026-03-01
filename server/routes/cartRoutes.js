const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
  checkoutCart
} = require("../controllers/cartController");

router.post("/add", addToCart);
router.get("/:customerId", getCart);
router.delete("/remove/:id", removeFromCart);
router.put("/update/:id", updateCartQuantity);
router.post("/checkout", checkoutCart);

module.exports = router;