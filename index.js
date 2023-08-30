const express = require("express");
const auth = require("./routes/auth");
const post = require("./routes/post");
const user = require("./routes/user");

const app = express();
app.use(express.json());

app.use("/auth",auth);
app.use('/posts',post);
app.use("/users",user);

app.listen(5000,()=>{
    console.log("Now listening to port 5000");
});