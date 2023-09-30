const express = require("express");
const http = require("http");
const { data } = require("./socket/helpers");
const { Server } = require("socket.io");
const DB = require("./DB");
// const handleJwt = require("./src/middlewares/handleJwt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const {AuthRouter, TrackRouter} = require("./src/modules");
// const { onConnection } = require("./socket");
const { DriverHandler } = require("./socket/driversocket");
const { UserHandler } = require("./socket/usersocket");

const app = express();
const Port = 9791;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "welcome to the beginning of greatness",
  });
});

app.use("/api/v1/auth/", AuthRouter);
app.use("/api/v1/track/", TrackRouter);



const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.use((socket, next) => {
  if (socket.handshake.headers.auth) {
    const { auth } = socket.handshake.headers;
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        throw new Error("Authentication error, Invalid Token supplied");
      }
      const theUser = await User.findByPk(decodedToken.id);
      if (!theUser)
        throw new Error(
          "Invalid Email or Password, Kindly contact the admin if this is an anomaly"
        );
      socket.theUser = theUser;
      return next();
    });
  } else {
    throw new Error("Authentication error, Please provide a token");
  }
});

const onConnection = (socket) => {
  socket.on("disconnect", function () {
    console.log("user disconnected", socket.id  );
  });
  console.log("socket connected", socket.id)
  DriverHandler(io, socket);
  UserHandler(io, socket);
  // contactHandler(io, socket);
  // statusHandler(io, socket);
};

io.on("connection", onConnection);

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id)
    const socketID = socket.id;
    data(socketID);
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });
  });
  
httpServer.listen(Port, () => {
console.log(`server running at http://localhost:${Port}`);
}); 

(async () => {
    try {
      await DB.sync(); // Create tables if they don't exist
      console.log('Database synced successfully.');
      // const newUser = await User.create({
      //   firstName: 'DAVID',
      //   lastName: 'DAD',
      //   email: 'TD@example.com',
      //   // role: 'DD',
      //   password: "KNXVNC KJZDV"
      // });
  
      // const newGeo = await Geolocation.create({
      //   id: newUser.id,
      //   socketID: 'DAVID',
      //   location: 'DAD',
      //   // online: true,
      //   // trackerID: newUser.id,
      //   // password: "KNXVNC KJZDV" 
      // });
  
      // console.log('New user created:', newUser.toJSON());
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  })();