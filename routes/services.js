const express = require("express");
const Service = require("../models/service");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

//GET- /api/services - public route to fetch all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch the services", error: error.message });
  }
});

//POST /api/services - Admin only route to add new services
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newService = new service({ name, description, price });
    await newService.save();
    res
      .status(201)
      .json({ message: "Service Created Successfully", service: newService });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create service!", error: error.message });
  }
});

//PUT /api/services/:id - Admin only route to update existing services
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updatedService = await service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res
      .status(200)
      .json({ message: "Service updated!", service: updatedService });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update the service!", error: error.message });
  }
});

//DELETE /api/services:id - Admin only route to delete a service
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deletedService = await Service.findbyIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found!" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete service", error: error.message });
  }
});

module.exports = router;
