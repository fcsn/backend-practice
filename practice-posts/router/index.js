const express = require('express')
const {
    getRoot,
    getUsers, getUser, makeUser,
    getPosts, getPost, makePost,
    getComments, getComment, makeComment,
    getProjects, getProject, makeProject,
    getUserProjects, makeUserProject,
    hostGetUser, guestGetProject, guestJoinProject } = require('../controller')

const router = express.Router()

router.get('/', getRoot)
router.get('/deploy', (req, res) => res.body = '무중단배포 성공')

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/user', makeUser);

router.get('/projects', getProjects);
router.get('/projects/:id', getProject);
router.post('/project', makeProject);

router.get('/posts', getPosts);
router.get('/posts/:id', getPost);
router.post('/post', makePost);

router.get('/comments/:id', getComment);
router.get('/posts/:postId/comments', getComments);
router.post('/posts/:id/comment', makeComment);

router.get('/userproject', getUserProjects)
router.post('/userproject', makeUserProject)

router.get('/users/:id/project', guestGetProject)
router.get('/projects/:id/user', hostGetUser)
router.post('/users/:userId/projects/:projectId/guests', guestJoinProject)

module.exports = router;
