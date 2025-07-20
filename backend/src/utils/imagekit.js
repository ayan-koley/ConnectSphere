import ImageKit from 'imagekit';
import fs from 'fs'

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL
});

const uploadFile = async(fileArray = [], userId) => {
    const uploads = await Promise.all(fileArray.map((file) => {
        const fileBuffer = fs.readdirSync(file.path);
        try {
            return imagekit.upload(
            {
                file: fileBuffer,
                fileName: file.originalname,
                checks: `"file.size" < "10mb"`,
                folder: `/${userId}`
            }
        )
        } finally  {
            fs.unlinkSync(file.path);
        }
    }))
    
    return uploads;
}

const deleteFile = async(fileId) => {
    return await Promise.resolve(
        imagekit.deleteFile(fileId)
    ).catch((err) => console.log("Error on delete file ", err.message));
}

export {
    uploadFile,
    deleteFile
}