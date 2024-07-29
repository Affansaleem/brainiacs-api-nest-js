import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: join(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileExtension = extname(file.originalname);
      const filename = `${timestamp}${fileExtension}`;
      callback(null, filename);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
};
