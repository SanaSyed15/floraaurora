const pool = require("../db");

const loginCustomer = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone required"
      });
    }

    const existing = await pool.query(
      "SELECT * FROM customers WHERE phone = $1",
      [phone]
    );

    if (existing.rows.length > 0) {
      return res.json({
        success: true,  // ✅ ADD THIS
        message: "Customer found",
        customer_id: existing.rows[0].id,
        name: existing.rows[0].name
      });
    }

    const newCustomer = await pool.query(
      "INSERT INTO customers (name, phone) VALUES ($1, $2) RETURNING id",
      [name, phone]
    );

    res.json({
      success: true,   // ✅ ADD THIS
      message: "Customer created",
      customer_id: newCustomer.rows[0].id,
      name: name
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = { loginCustomer };