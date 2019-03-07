const models = require('../models');
const Joi = require('joi');

const getRoot = (req, res) => res.send('root')

const getUsers = async (req, res) => {
    const users = await models.User.findAll();
    // res.body = users;
    return res.json(users)
}

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await models.User.findOne({
        where: { id },
        include: [{
            model: models.Project,
            as: 'project',
        }]
    });
    return res.json(user)
};

const getProjects = async (req, res) => {
    const users = await models.Project.findAll();
    // res.body = users;
    return res.json(users)
}

const getProject = async (req, res) => {
    const { id } = req.params;
    const project = await models.Project.findOne({
            where: { id },
            include: [{
                model: models.User,
                as: 'user',
                attributes: {exclude: 'UserProject'}
            }],
    });
    return res.json(project)
};

// const getPosts = async (req, res) => {
//     const { offset, limit } = req.query
//     const posts = await models.Post.findAll(
//         {
//             offset: offset * 1,
//             limit: limit * 1,
//         }
//     );
//     const offsetQuerySchema = Joi.object().keys({
//         offset: Joi.string().required(),
//         limit: Joi.string().required(),
//     })
//
//     Joi.validate({ offset: offset, limit: limit }, offsetQuerySchema, (err, value) => {
//         if (err) {
//             // send a 422 error response if validation fails
//             res.status(422).json({
//                 status: 'error',
//                 message: 'Invalid request data',
//                 data: posts
//             });
//         } else {
//             res.json({
//                 status: 'success',
//                 message: 'success',
//                 data: posts
//             });
//         }
//     });
// }

const getPosts = async (req, res) => {
    const { offset, limit } = req.query
    const offsetQuerySchema = Joi.object().keys({
        offset: Joi.string().regex(/^(\s|\d)+$/).required().error(new Error('offset error')),
        limit: Joi.string().regex(/^(\s|\d)+$/).required().error(new Error('limit error')),
    })

    Joi.validate({ offset: offset, limit: limit }, offsetQuerySchema, async (err, value) => {
        if (err) {
            res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: err.message
            });
        } else {
            const posts = await models.Post.findAll(
                {
                    offset: offset * 1,
                    limit: limit * 1,
                }
            )
            res.json({
                status: 'success',
                message: 'success',
                data: posts
            });
        }
    })
}

const getPost = async (req, res) => {
    const { id } = req.params;
    // Project.findAll({
    //     include: [{
    //         model: Task,
    //         where: { state: Sequelize.col('project.state') }
    //     }]
    // })
    // 이런식으로 근데 저런 where절 없이 관계만으로 가져오는게 좋겠찌?
    // User.findAll({
    //     where: {
    //         '$Instruments.name$': { [Op.iLike]: '%ooth%' } // 이부분은 그냥 where절
    //     },

    // 이 부분부터가 관계가 맺어져있는걸 가져온거임
    // 아래 예제를 만들어야한다면,

    //     include: [{
    //         model: Comment,
    //         as: 'comments' // 이부분은 포스트 객체에 어떤 키로 들어갈것이냐 정해주는거야
    //     }]

    // 이런식이 될거고
    // 요런느낌임 ㅎㅎ 일단 마이그레이션 다 정리하고 마이그레이션을 다시 고고해
    // 가끔 마이그레이션 꼬이던게 테이블 생성하는 마이그레이션이 너무 많아서 그랬나봄 ㅋㅋ 일단 한번 정리 고고
    // 다 지우고 새로해도돼
    // cli로 다시 파일 만들면 되고 db도 새로 만들수잇으니 ㅎㅎ ㄴㄴ 그럴 필요까진 없고 마이그레이션 파일들만 지우고
    // ㅇㅋㅇㅋ 굳굳 ㅋㅋ


    //     include: [{
    //         model: Tool,
    //         as: 'Instruments'
    //     }]

    // })
const post = await models.Post.findOne({ where: { id }, include: [{
        model: models.Comment,
        as: 'comments',
    }] }); // 이런거
    return res.json(post) // 다시 리로드
}

const makePost = (req, res, next) => {
    const postCreateSchema = Joi.object().keys({
        title: Joi.string().required().error(new Error('title error')),
    })
    const body = req.body
    Joi.validate(body, postCreateSchema, (err, value) => {
        if (err) {
            res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: err.message
            });
        } else {
            const post = models.Post.create({
                title: body.title,
            })
                .then((result) => {
                    // console.log(result);
                    res.status(201).json(result);
                })
                .catch((err) => {
                    // console.error(err);
                    next(err);
                });
            res.json({
                status: 'success',
                message: 'success',
                data: post
            });
        }
    })
}

const getComments = async (req, res) => {
    const { page, perPage } = req.query
    const comments = await models.Comment.findAll({
        offset: (page - 1) * perPage,
        limit: perPage * 1,
    });
    return res.json(comments)
}

const getComment = async (req, res) => {
    const { id } = req.params;
    const comment = await models.Comment.findOne({ where: { id } });
    return res.json(comment)
}

const makeComment = (req, res, next) => {
    models.Comment.create({
        content: req.body.content,
        postId: req.params.id,
    })
        .then((result) => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
}

const makeUser = (req, res, next) => {
    models.User.create({
        name: req.body.name,
        engName: req.body.engName,
    })
        .then((result) => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
}

const makeProject = (req, res, next) => {
    models.Project.create({
        work: req.body.work,
    })
        .then((result) => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
}

const makeUserProject = (req, res, next) => {
    models.UserProject.create({
        userId: req.body.userId,
        projectId: req.body.projectId,
    })
        .then((result) => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
}

const getUserProjects = async (req, res, next) => {
    const { id } = req.params
    const comment = await models.Comment.findOne({ where: { id } })
    return res.json(comment)
}

// 프로젝트 오너가 게스트를 프로젝트에 넣는다 -> POST project

const guestGetUser = async (req, res, next) => {
    // 게스트 중심 조회
    const { id } = req.params;
    const project = await models.User.findOne({
        where: { id },
        include: [{
            model: models.Project,
            as: 'project',
            attributes: {exclude: 'UserProject'}
        }],
    });
    return res.json(project)
}

const hostGetProject = async (req, res, next) => {
    // 프로젝트 중심 조회
    const { id } = req.params;
    const project = await models.Project.findOne({
        where: { id },
        include: [{
            model: models.User,
            as: 'user',
            attributes: {exclude: 'UserProject'}
        }],
    });
    return res.json(project)
}

const guestJoinProject = async (req, res, next) => {
    // 게스트가 자기가 참여하고 싶은 플젝에 들어간다
    const { userId, projectId } = req.params;
    models.UserProject.create({
        userId: userId,
        projectId: projectId,
    })
        .then((result) => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
}

module.exports = {
    getRoot,
    getUsers, getUser, makeUser,
    getPosts, getPost, makePost,
    getComments, getComment, makeComment,
    getProjects, getProject, makeProject,
    getUserProjects, makeUserProject,
    hostGetUser, guestGetProject, guestJoinProject
}
