import DaraUriParser from 'datauri/parser.js';
import path from 'path';

const bufferGenerator =(file) =>{
    const parser = new DaraUriParser();

    const extName= path.estname(file.originalname).toString();

    return parser.format(extName, file.buffer);
};

export default bufferGenerator;