import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e7);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
})

const isImage = function(req, file, cb){
  if(file.mimetype.startsWith("image")){
    cb(null,true)
  }else{
    cb(new Error("Only Images are allowed"))
  }
}
  
export const upload = multer({ 
    storage,
    fileFilter:isImage
})