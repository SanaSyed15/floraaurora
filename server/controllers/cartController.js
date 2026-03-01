const pool = require("../db");

/* =========================
   ADD TO CART
========================= */

const addToCart = async (req, res) => {
  try {
    const { customer_id, flower_id, quantity } = req.body;

    if (!customer_id || !flower_id) {
      return res.status(400).json({ success: false });
    }

    // 1️⃣ Check if cart order exists
    let cartOrder = await pool.query(
      "SELECT * FROM orders WHERE customer_id=$1 AND status='Cart'",
      [customer_id]
    );

    let orderId;

    if (cartOrder.rows.length === 0) {
      // create new cart order
      const newOrder = await pool.query(
        "INSERT INTO orders (customer_id, order_type, status) VALUES ($1, $2, $3) RETURNING id",
        [customer_id, "Online", "Cart"]
      );

      orderId = newOrder.rows[0].id;
    } else {
      orderId = cartOrder.rows[0].id;
    }

    // 2️⃣ Get flower price
    const flower = await pool.query(
      "SELECT * FROM flowers WHERE id=$1",
      [flower_id]
    );

    if (flower.rows.length === 0) {
      return res.status(404).json({ success: false });
    }

    const price = flower.rows[0].price;

    // 3️⃣ Insert into order_items
    // Check if flower already in cart
const existingItem = await pool.query(
  "SELECT * FROM order_items WHERE order_id=$1 AND flower_id=$2",
  [orderId, flower_id]
);

if (existingItem.rows.length > 0) {
  await pool.query(
    "UPDATE order_items SET quantity = quantity + $1 WHERE id=$2",
    [quantity || 1, existingItem.rows[0].id]
  );
} else {
  await pool.query(
    "INSERT INTO order_items (order_id, flower_id, quantity, price) VALUES ($1,$2,$3,$4)",
    [orderId, flower_id, quantity || 1, price]
  );
}

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};


/* =========================
   GET CART
========================= */

const getCart = async (req, res) => {
  try {
    const { customerId } = req.params;

    const cart = await pool.query(
      `
      SELECT oi.*, f.name, f.image_url
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      JOIN flowers f ON oi.flower_id = f.id
      WHERE o.customer_id=$1 AND o.status='Cart'
      `,
      [customerId]
    );

    res.json(cart.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
};


/* =========================
   REMOVE ITEM
========================= */

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM order_items WHERE id = $1",
      [id]
    );

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};


/* =========================
   UPDATE QUANTITY
========================= */

const updateCartQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false });
    }

    await pool.query(
      "UPDATE order_items SET quantity = $1 WHERE id = $2",
      [quantity, id]
    );

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};


/* =========================
   ADVANCED CHECKOUT
========================= */

const checkoutCart = async (req, res) => {
  try {
    const {
      customer_id,
      address,
      order_type,
      note,
      wrapping,
      color_theme,
      message_card,
      custom_type,
      custom_quantity
    } = req.body;

    const cartOrder = await pool.query(
      "SELECT * FROM orders WHERE customer_id=$1 AND status='Cart'",
      [customer_id]
    );

    if (cartOrder.rows.length === 0) {
      return res.status(400).json({ success: false });
    }

    const orderId = cartOrder.rows[0].id;

    // Calculate total
    const items = await pool.query(
      "SELECT quantity, price FROM order_items WHERE order_id=$1",
      [orderId]
    );

    const total = items.rows.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );

    // Update order
    await pool.query(
      `UPDATE orders 
       SET status='Placed',
           total_price=$1,
           address=$2,
           order_type=$3,
           note=$4
       WHERE id=$5`,
      [total, address, "Online", note, orderId]
    );

    // Update customization for all items
    await pool.query(
      `UPDATE order_items
       SET wrapping=$1,
           color_theme=$2,
           message_card=$3,
           is_custom=$4,
           custom_type=$5,
           custom_quantity=$6
       WHERE order_id=$7`,
      [
        wrapping,
        color_theme,
        message_card,
        custom_type ? true : false,
        custom_type,
        custom_quantity,
        orderId
      ]
    );

    res.json({ success: true, order_id: orderId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};


/* =========================
   EXPORTS
========================= */
module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
  checkoutCart
};