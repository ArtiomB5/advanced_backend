import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs/promises';

@Injectable()
export class FilesService {
  async create(file: any) {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, "..", "static");
      const fullPath = path.join(filePath, fileName);

      async function exists (path) {  
        try {
          await fs.access(path)
          return true
        } catch {
          return false
        }
      }

      const isFileExist = await exists(fullPath);

      if (!isFileExist) {
        await fs.mkdir(filePath, {recursive: true});
      }
      
      await fs.writeFile(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch(e) {
      throw new HttpException('File writing error!', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
