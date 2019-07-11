import { File } from '../models';

class FileService {
  async create(fileData) {
    const file = await File.create(fileData);

    return { status: 200, data: file };
  }
}

export default new FileService();
