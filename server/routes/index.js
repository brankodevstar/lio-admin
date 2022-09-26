const router = require('express').Router();
const bookRoutes = require('./books');
const userRoutes = require('./users');
const announcementRoutes = require('./announcements');
const postRoutes = require('./posts');
const uploadRoutes = require('./upload');

router.use('/api/books', bookRoutes);
router.use('/api/users', userRoutes);
router.use('/api/announcements', announcementRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/upload', uploadRoutes);

module.exports = router;