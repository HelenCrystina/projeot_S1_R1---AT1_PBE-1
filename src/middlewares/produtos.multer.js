import multer from 'multer';
import path from 'path' //Fazem parte do express
import crypto from 'crypto';
import fs from 'fs';

const baseUploadDir = path.resolve(process.cwd(), 'uploads') //Monta um caminho diretamente para a parta upload.
const verificaDir = (dir) => {
    if (!fs.existsSync(dir)) { //Se ele não existir a gente cria
        fs.mkdirSync(dir, { recursive: true });
    };
};

const createMulter = ({ folder, allowedTypes, fileSize }) => {
    // Monta caminho do diretorio base (uploads) + pasta
    const uploadDir = path.join(baseUploadDir, folder);
    // Verifica se o diretório não existe para criar
    verificaDir(uploadDir);

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir)
        },
        filename: (req, file, cb) => {
            const hash = crypto.randomBytes(12).toString('hex');
            cb(null, `${hash}-${file.originalname}`)
        }
    });
    const fileFilter = (req, file, cb) => {
        if (!allowedTypes.includes(file.mimetype)) { //Compara com os tipos permitidos no middleware
            return cb(new Error('Tipo de arquivo não permitido'));
        }
        cb(null, true)
    }
    return multer({
        storage,
        limits: { fileSize },
        fileFilter
    })
};

export default createMulter;