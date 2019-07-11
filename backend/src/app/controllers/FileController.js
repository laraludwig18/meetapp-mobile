import { FileService } from '../services';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const { status, data } = await FileService.create({ name, path });

    return res.status(status).json(data);
  }
}

export default new FileController();
