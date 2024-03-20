const express = require("express")
const app = express()
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

// app.set("view engine", "ejs")

// const userRouter = require("./routes/users")

// app.use("/users", userRouter)

app.listen(3000)