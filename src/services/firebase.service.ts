// Modules

import  mime  from 'mime-types';
import {Storage} from '@google-cloud/storage';
import {v4 as uuidv4}  from 'uuid';
import path from 'path';

// Secretas Datas

const projectId = process.env.firebase_projectId as string;
const bucketName =  process.env.firebase_bucketName as string;
const bucketNameSliceUrl = process.env.firebase_bucketNameSliceUrl as string;
const pathkeyFilename = `${process.env.firebase_pathkeyFilename}`;

// Inicializaciones
const gcs = new Storage({
    projectId: projectId,
    keyFilename: path.join(__dirname, `${pathkeyFilename}`)
});

const bucket = gcs.bucket(bucketName);


export const uploadFileFirebase = async(filePath: string) => {

    const uuid = uuidv4();
    const fileMime = mime.lookup(filePath);

    return bucket.upload(filePath, {
        metadata: {
            contentType: fileMime,
            metadata: {
            firebaseStorageDownloadTokens: uuid
            }
        }
    })
    .then((data) => {
            const file = data[0];
            return Promise.resolve(`https://firebasestorage.googleapis.com/v0/b/${bucketNameSliceUrl}/o/`+ file.name +  "?alt=media&token=" + uuid);
    });
};


export const deleteFileFirebase =  async(cancionID: string) => {
    
    return bucket.file(`${cancionID}`).delete();

};