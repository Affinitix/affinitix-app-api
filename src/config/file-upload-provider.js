
/** 
 *  Create and Return Multipart-form middleware 
 * Note: Ensure that this middleware is mounted
 * before accessing files in the request body.*/
module.exports.getMultipartFormMiddleware = () => {
    const formData = require("express-form-data");
    const os = require("os");
    const options = {
        uploadDir: os.tmpdir(),
        autoClean: true,
    };
    return formData.parse(options);
};


/**
 * Upload file and return the url
 * @param {fieldName,type,originalFilename,path,size,name,headers} file 
 */
module.exports.uploadFile = async (file) => {
    require("dotenv").config();
    const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
    // Set the AWS Region.
    const REGION = process.env.S3_BUCKET_REGION; //e.g. "us-east-1"
    // Create an Amazon S3 service client object.
    const s3Client = new S3Client({ region: REGION });
    const fileName = `${Date.now()}-${file.originalFilename}`;
    const fs = require('fs/promises');
    const fileContent = await fs.readFile(file.path);
    const params = {
        Key: fileName,
        Bucket: process.env.S3_BUCKET_NAME,
        Body: fileContent
    };
    await s3Client.send(new PutObjectCommand(params));
    //Return the file Server URL for generating aws presign URL
    return `${process.env.SERVER_BASE_URL}/uploads/${fileName}`;

};

module.exports.getPresignedFileUrl = async (fileKey) => {
    require("dotenv").config();
    const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
    const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
    const REGION = process.env.S3_BUCKET_REGION;
    const client = new S3Client({ region: REGION });
    const params = {
        Key: fileKey,
        Bucket: process.env.S3_BUCKET_NAME,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    return url;

};



