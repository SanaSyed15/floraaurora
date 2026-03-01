const pool = require("../db");

const getFlowers = async (req, res) => {
  try {
    const { collection } = req.query;

    let query = "SELECT * FROM flowers";
    let values = [];

    if (collection) {
      query += " WHERE collection = $1";
      values.push(collection);
    }

    const result = await pool.query(query, values);
    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
};

module.exports = { getFlowers };
