const express=require('express');
const { createPost, deletePost, updatePost, getPost, getFeaturedPost, getLatestPost, searchPost, relatedPost } = require('../controllers/post');
const multer=require('../middleware/multer')
const router=express.Router();

router.post('/create',multer.single("thumbnail"),createPost);
// router.get('/latest');
router.delete('/:id',deletePost);
router.put('/:id',multer.single("thumbnail"),updatePost);
router.get('/single/:id',getPost)
router.get('/featured',getFeaturedPost)
// pagination
router.get('/latestpost',getLatestPost);
router.get('/search',searchPost);
router.get('/related/:id',relatedPost);




module.exports=router
