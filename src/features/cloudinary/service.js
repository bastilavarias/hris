const cloudinary = require("cloudinary").v2;
const {cloudinaryCredentials} = require("../../configuration");

cloudinary.config(cloudinaryCredentials);

module.exports = {
    upload: async (file) => {
        let meta;
        try {
            meta = await cloudinary.uploader.upload(file.tempFilePath);
        } catch (errors) {
            console.log(errors);
            meta = {};
        }

        return meta;
    },

    delete: async (url) => {
        try {
            await cloudinary.uploader.destroy(url);
        } catch (errors) {
            console.log(errors);
        }
    },

};