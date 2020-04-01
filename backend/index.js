import express from "express";
import cors from "cors";
import http from "http";
import io from "socket.io";
import mongoose from "mongoose";
import { RoutesConstants, BaseRoutes } from "./routes.js";
import TweeterRoutes from "./controllers/routes.js";

const app = express();
const server = http.Server(app);
const socketio = io(server);

mongoose.connect(RoutesConstants.PRIVATE.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log(`Connection to Mongo database established`)
}).catch(err=>{
    console.log(`DB Error ${err.message}`);
    process.exit(-1);
});

const interceptor = (req, res, next) => {
  console.log("Requested:", req.method, req.path);
  req.io = socketio;
  return next();
};

app.use(interceptor);
app.use(cors());

app.use(express.json());
app.use(TweeterRoutes);
app.use(BaseRoutes);

server.listen(RoutesConstants.PRIVATE.SERVER_PORT, () => {
  console.log(`Server started at port :${RoutesConstants.PRIVATE.SERVER_PORT}`);
});
