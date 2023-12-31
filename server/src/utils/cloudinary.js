/* 
yhaan pe files humare pass aayengi files system ke through

yhaan pe pehle file server pe aayegi (local server) through multer and then cloudinary pe jaayegi then humein cloudinary se url mil jaayega (after all that stuff we have to remove the file from our local server) 

*/

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) return null

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // console.log(response);

        // file uploaded successfully
        // console.log("File uploaded successfull",
        //     response.url
        // );

        //  now when the file is uploaded on clodinary then unlink the file
        fs.unlinkSync(localFilePath) // sync is used because we want to wait for the file to be deleted first and then we want to return the response

        return response;
    } catch (error) {
        // now remove the locally saved tempraroy files as upload operation got failed
        fs.unlinkSync(localFilePath)
        return null

    }
}

export { uploadOnCloudinary }


//  this is just for testing purpose
// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//     { public_id: "olympic_flag" },
//     function (error, result) { console.log(result); });



