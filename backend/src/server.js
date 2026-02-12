require("dotenv").config();
const express =require("express");
const cors=require("cors");
require("dotenv").config();

const app = express();
//app creation

app.use(cors());

app.use(express.json());
//middleware for json parsing

//health check
app.get("/",(req,res)=>{
    res.json({message:"Server is running"});
});

//routes
const specsRoutes=require("./routes/specs");
const generateRoutes=require("./routes/generate");
const statusRoutes=require("./routes/status");


app.use("/api",specsRoutes);
app.use("/api",generateRoutes);
app.use("/api",statusRoutes);

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);

});