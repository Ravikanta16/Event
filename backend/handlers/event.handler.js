
const eventModel = require("../models/event.model");
const userModel = require("../models/user.model");
const { rooms } = require("../socket");
const registerEvent = async (req, res) => {
    try {   
        const { title, description, time, createdBy } = req.body;
        const user = await userModel.findOne({username: createdBy});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        await user.save();
        const newEvent = new eventModel({ title, description, time, createdBy: user._id });
       const event = await newEvent.save();

        user.events.push(event._id);

        res.status(201).json({ message: "Event created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Event creation failed" });
    }
};

const getEvents = async (req, res) => {
  const events = await eventModel.find();
  res.status(200).json(events);
};

const getSearchEvents = async (req, res) => {
  const { search } = req.query;
  const events = await eventModel.find({
    title: { $regex: search, $options: "i" },
  });
  res.status(200).json(events);
}; 

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await eventModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Event deletion failed" });
  }
};

const startEvent = async (req, res) => {
  const { eventId } = req.body;
  const event = await eventModel.findById(eventId);
  event.status = "started";
  await event.save();
  rooms.set(eventId, 0);
  res.status(200).json({ message: "Event started successfully" });
};

// const joinEvent = async (req, res) => {
//   const { eventId } = req.params;
//   const { userId } = req.body;
//   const event = await Event.findById(eventId);
//   event.participants.push(userId);
//   await event.save();
//   res.status(200).json({ message: "Event joined successfully" });
// };

module.exports = { registerEvent, getEvents, getSearchEvents,deleteEvent, startEvent };
