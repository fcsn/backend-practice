const express = require('express')
const { getRoot, getUsers, getUser, getPosts, getPost, getComments, getComment, makePost, makeComment } = require('../controller')

const router = express.Router()

router.get('/', getRoot)
router.get('/deploy', (req, res) => res.body = '무중단배포 성공')

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.get('/posts', getPosts);
router.get('/posts/:postId/comments', getComments);
router.get('/posts/:id', getPost);
router.get('/comments/:id', getComment);
router.post('/post', makePost);
router.post('/posts/:id/comment', makeComment);

module.exports = router;
