const express = require('express');
const db = require('./db');
const app = express();

// app.get('/', (req, res) => {
//     res.send("Server running and MySQL connected!");
// });

app.get("/search/dishes",async(req,res) => {
    const {dish, minprice, maxprice} = req.query;

    if(!dish || !minprice || !maxprice){
        return res.status(400).json({error: "Enter valid Dish, minPrice, maxPrice"});
    }

    const query = `
        SELECT 
        r.id AS restaurant_id,
        r.name AS restaurant_name,
        SUM(o.quantity) AS total_orders
        FROM menu_items m
        JOIN restaurants r ON r.id = m.restaurant_id
        JOIN orders o ON o.menu_item_id = m.id
        WHERE m.name LIKE CONCAT('%', ?, '%')
        AND m.price BETWEEN ? AND ?
        GROUP BY r.id
        ORDER BY total_orders DESC;
    `;

    const values =  [dish, minprice, maxprice];

    const[rows] = await db.execute(query, values);
    console.log("DB Connected! Result:", rows)

    res.json(rows);
})

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});
