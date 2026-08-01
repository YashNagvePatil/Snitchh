import ImageKit from "imagekit";    
import { config } from "../config/config.js";

const client = new ImageKit({
    privateKey:config.IMAGEKIT_PRIVATE_KEY
})

 export async function uploadFile({buffer,fileName,folder = "snitch"}){

    const result = await client.files.upload({
        file:await ImageKit.file.toFile(buffer),
        fileName,
        folder
    })
    return result;
 }