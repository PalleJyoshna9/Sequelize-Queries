const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(express.json());

// ✅ Database Connection
const sequelize = new Sequelize("company_db", "root", "9JY@7oShN$", {
  host: "localhost",
  dialect: "mysql",
  logging: false
});

// ✅ Test Connection
sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Connection error:", err));

// ✅ Define Model
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  }
});

// ✅ Sync Table
sequelize.sync()
  .then(() => console.log("✅ Table synced"))
  .catch(err => console.log(err));

/* ================= CRUD OPERATIONS ================= */

// 🔹 CREATE
app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// 🔹 READ (All)
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// 🔹 READ (By ID)
app.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

// 🔹 UPDATE
app.put("/users/:id", async (req, res) => {
  await User.update(req.body, {
    where: { id: req.params.id }
  });
  res.send("User updated");
});

// 🔹 DELETE
app.delete("/users/:id", async (req, res) => {
  await User.destroy({
    where: { id: req.params.id }
  });
  res.send("User deleted");
});

// Start Server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
