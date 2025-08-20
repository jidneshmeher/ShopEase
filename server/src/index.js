import {app} from "./app.js"
import mongoose from "mongoose"

const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("DB Connection Successfull")
}).catch((err) => {
    console.log(`Error while connecting with database ${err}`)
})

app.listen(port , () => {
    console.log(`Server Listening at port ${port}`)
})