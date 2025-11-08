import multer from "multer";
import path from "path";

const uploadPath=path.join(path.resolve(),'src','uploads');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadPath);
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + '-' + file.originalname);
    }
});

export const upload=multer({storage:storage});