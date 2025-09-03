import {app} from "./app.js"
import mongoose from "mongoose"
import cron from "node-cron";

const port = process.env.PORT || 8000

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("DB Connection Successfull")
}).catch((err) => {
    console.log(`Error while connecting with database ${err}`)
})

app.listen(port , () => {
    console.log(`Server Listening at port ${port}`)
})

if (process.env.NODE_ENV === "production") {
  cron.schedule("*/14 * * * *", async () => {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/health`);
      console.log(`Health ping status: ${res.status}`);
    } catch (err) {
      console.error("Health ping failed:", err);
    }
  });
}