const multer = require('multer');
// use to accept the file from user
const storage=multer.diskStorage({})
const fileFilter=(req,file,cb)=>{
    if(!file.mimetype.includes('image')){
        return cb('Invalid image format',false)
    }
    cb(null,true);

}
module.exports =multer({
    storage,fileFilter
})