const express = require('express');
const router = express.Router();
const mailgunService = require('../services/mailgunServices');

router.post("/", async (req, res) => {
    try {
        const response = await mailgunService.sendMail(req, res);
        res.status(200).json({
            status: "success",
            message: "Email sent successfully",
            data: response,
        });
    } catch (error) {
        console.error("Controller error:", error);
        res.status(400).json({
            status: "error",
            message: "Email not sent",
            error: error.message,
        });
    }
});

module.exports = router;


