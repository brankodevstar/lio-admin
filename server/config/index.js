const config = {
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || "mkT23j#u!45",
    mongoURI: process.env.MONGODB_URI || "mongodb://localhost/LIO_ADMIN",
    imgBucket: "photos",
    uploadPath: process.env.UPLOADT_PATH || "/files/",
};

module.exports = config;
