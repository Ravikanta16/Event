const rooms = new Map();

const handleConnection = (socket,io) => {
  console.log("a user connected");
  socket.on("join-event", (eventId,userId) => {
    console.log("join-event",eventId);

    const currentEventSet = rooms.get(eventId) || new Set();

    currentEventSet.add(userId);
    rooms.set(eventId, currentEventSet);
      console.log("rooms",rooms);
      io.emit("participant_count", {eventId,count:  currentEventSet.size});
    // socket.emit("user_joined", userId);

  });

  socket.on("leave-event", (eventId) => {
    socket.leave(eventId);
    const currentEventSet = rooms.get(eventId) || new Set();
    currentEventSet.delete(userId);
    rooms.set(eventId, currentEventSet);

    io.emit("participant_count", {eventId,count:  currentEventSet.size});
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });



};



const setupSocket = (io) => {
  io.on("connection", (socket) => {
    handleConnection(socket,io);
    
  });
 
 io.on("error", (error) => {
     console.log("error",error);
 });
};




module.exports = {handleConnection, setupSocket};