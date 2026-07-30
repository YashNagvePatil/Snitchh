import app from "./app.js";
import connectToDb from "./config/db.js";


 connectToDb()

app.listen(3000,()=>{
    console.log("server is started on port number on 3000")
})


 