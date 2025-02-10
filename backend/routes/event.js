const express = require("express");
const router = express.Router();
const { registerEvent, getEvents, getSearchEvents,deleteEvent, startEvent } = require("../handlers/event.handler");

router.post("/create", registerEvent);
router.get("/", getEvents);
router.post("/start", startEvent);
router.get("/search",getSearchEvents);
router.delete("/delete/:id",deleteEvent)
// router.post("/join", joinEvent);


module.exports = router;
