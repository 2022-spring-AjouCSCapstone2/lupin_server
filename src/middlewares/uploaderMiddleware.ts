import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const { AWS_S3_ACCESS_KEY, AWS_S3_SECRET_KEY, AWS_S3_BUCKET } = process.env;

const s3 = new aws.S3({
    region: 'ap-northeast-2',
    credentials: {
        accessKeyId: AWS_S3_ACCESS_KEY,
        secretAccessKey: AWS_S3_SECRET_KEY,
    },
});

export const uploaderMiddleware = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: AWS_S3_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
    }),
});
