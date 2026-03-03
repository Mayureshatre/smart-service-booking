const express = require("express");
const Booking = require("../models/Booking");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

//POST /api/bookings - user creates a new booking
router.post("/", verifyToken, async (req, res) => {
  try {
    const { serviceId, date } = req.body;
    const newBooking = new Booking({
      userId: req.user.userId,
      serviceId,
      date,
    });
    await newBooking.save();
    res
      .status(200)
      .json({ message: "Booking Successfull", Booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
});

//GET /api/bookings/user - user views personal booking history
router.get("/user", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId }).populate(
      "serviceId",
      "name price",
    );
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch your bookings", error: error.message });
  }
});

//GET /api/bookings/admin - Admin views all bookings from everyone
router.get("/admin", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("serviceId", "name price");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch all the bookings",
      error: error.message,
    });
  }
});

//PUT /api/bookings/status - Admin changes the booking status
router.put("/status", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: String(status) }, // Forces the incoming data to be a pure string
      { returnDocument: "after" },
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({
      message: "Booking status updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update booking status",
      error: error.message,
    });
  }
});

module.exports = router;
