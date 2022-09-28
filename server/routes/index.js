const router = require('express').Router();
const bookRoutes = require('./books');
const userRoutes = require('./users');
const announcementRoutes = require('./announcements');
const postRoutes = require('./posts');
const uploadRoutes = require('./upload');
const investmentsRoutes = require('./investments');

router.use('/api/books', bookRoutes);
router.use('/api/users', userRoutes);
router.use('/api/announcements', announcementRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/upload', uploadRoutes);
router.use('/api/investments', investmentsRoutes);

module.exports = router;