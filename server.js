const express = require('express');
const db = require('./db');
const app = express();

// app.get('/', (req, res) => {
//     res.send("Server running and MySQL connected!");
// });

app.get("/search/dishes", async (req, res) => {
    const dish = req.query.dish || req.query.name;
    const minprice = req.query.minprice || req.query.minPrice;
    const maxprice = req.query.maxprice || req.query.maxPrice;

    // if (!dish || !minprice || !maxprice) {
    //     return res.status(400).json({ error: "Enter valid Dish, minPrice, maxPrice" });
    // }

    const query = `
        SELECT 
            r.id AS restaurant_id,
            r.name AS restaurant_name,
            COALESCE(SUM(o.quantity), 0) AS total_orders
        FROM menu_items m
        JOIN restaurants r ON r.id = m.restaurant_id
        LEFT JOIN orders o ON o.menu_item_id = m.id
        WHERE 
            m.name LIKE CONCAT('%', ?, '%')
            AND m.price BETWEEN ? AND ?
        GROUP BY r.id
        ORDER BY total_orders DESC;
    `;

    const [rows] = await db.execute("SELECT * FROM menu_items");

    return res.json(rows);

    // try {
    //     const [rows] = await db.execute(query, [dish, minprice, maxprice]);
    //     return res.json(rows);
    // } catch (err) {
    //     console.error(err);
    //     return res.status(500).json({ error: "Database query failed" });
    // }
});

// app.get("/test-db", async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT 1 AS test");
//     console.log("DB RESULT:", rows);
//     res.json(rows);
//   } catch (err) {
//     console.error("DB ERROR:", err);
//     res.status(500).json({ error: err.code });
//   }
// });


app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});
