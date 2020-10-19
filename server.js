const express = require("express");
const connectDB = require("./config/db");
const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "welcome" });
});

//Connect to Database
connectDB();

//init middleware(to accept data)
app.use(express.json({ extended: false }));

// Define routes
app.use("/members", require("./routes/members"));
app.use("/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
