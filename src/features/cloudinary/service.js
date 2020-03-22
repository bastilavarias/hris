const cloudinary = require("cloudinary").v2;
const {cloudinaryCredentials} = require("../../configuration");

cloudinary.config(cloudinaryCredentials);

module.exports = {
    upload: async (file) => {
        let cdn;
        try {
            const result = await cloudinary.uploader.upload(file.tempFilePath);
            cdn = result.url;
        } catch (errors) {
            console.log(errors);
            cdn = "";
        }

        return cdn;
    }
};