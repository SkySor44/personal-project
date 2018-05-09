require('dotenv').config()

const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION 
})

const S3 = new AWS.S3()

function uploadPhoto(req, res) {
    /*
        req.body = {
            file: (base64 encoded image),
            filename: (whatever the photo is called from the user),
            filetype: (file extension, eg. .png)
        }
    */
    let photo = req.body,
        buf = new Buffer(photo.file.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
        params = {
            Bucket: process.env.BUCKET_NAME,
            Body: buf,
            Key: photo.filename,
            ContentType: photo.filetype,
            ACL: 'public-read'
        }


    S3.upload(params, (err, data) => {
        err ? res.status(500).send(err) : 
        res.status(200).send(data)
    })
}

module.exports =  {
    uploadPhoto: uploadPhoto
}