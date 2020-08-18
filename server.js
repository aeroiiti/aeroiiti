const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({ msg: "welcome" })
})

// Define routes 
app.use('/members', require('./routes/members'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
});