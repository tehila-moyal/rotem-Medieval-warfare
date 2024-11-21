const express= require("express")
const cors= require('cors')
const dotenv = require('dotenv').config();

app.use(
    cors({
        origin:[`${process.env.FRONT_URL}`],
        methods:['GET','POST','PUT','DELETE','PATCH'],
        credentials:true

    })
)


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload());

// app.use()

const PORT = process.env.PORT || 3040;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


