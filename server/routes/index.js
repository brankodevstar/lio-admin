const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./users");
const announcementRoutes = require("./announcements");
const postRoutes = require("./posts");
const uploadRoutes = require("./upload");
const eventRoutes = require("./events");
const investmentRoutes = require("./investments");
const benefitRoutes = require("./benefits");
const galleryRoutes = require("./gallerys");
const adminRoutes = require("./admin");
const excelRoutes = require("./excel");

router.use("/api/books", bookRoutes);
router.use("/api/users", userRoutes);
router.use("/api/announcements", announcementRoutes);
router.use("/api/posts", postRoutes);
router.use("/api/upload", uploadRoutes);
router.use("/api/events", eventRoutes);
router.use("/api/investments", investmentRoutes);
router.use("/api/benefits", benefitRoutes);
router.use("/api/gallerys", galleryRoutes);
router.use("/api/admin", adminRoutes);
router.use("/api/excel", excelRoutes);

module.exports = router;
