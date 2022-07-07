const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./src/Server/Routes/user.router");
const meetingRouter = require("./src/Server/Routes/meeting.router");
// const diaryRouter = require("./src/Server/Routes/meeting.router");
const accountRouter = require("./src/Server/Routes/account.router");
const authMiddleware = require('./src/Server/middleware/middleware');
const port = 
process.env.port ||
 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/users", userRouter);
app.use("/meeting",
 authMiddleware,
  meetingRouter);
app.use("/account", 
authMiddleware, 
accountRouter);

app.listen(port, () => {
  console.log(` Hi! process on port ${port}`);
});