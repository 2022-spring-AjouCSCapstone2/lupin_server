import 'express';

declare global {
    namespace Express {
        namespace Multer {
            interface File {
                location: string;
            }
        }

        interface User {
            id: number;
            userId: number;
        }

        export interface Request {
            file?: Express.Multer.File & Express.MulterS3.File;
        }
    }
}
