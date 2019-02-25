const models = require('../models');
const Joi = require('joi');


const getUsers = async (req, res) => {
    const users = await models.User.findAll();
    // res.body = users;
    return res.json(users)
}

const getUser = async (req, res) => {
    const { id } = req.params;

    const user = await models.User.findOne({ where: { id } });
    // res.body = user;
    return res.json(user)
};

const getPosts = async (req, res) => {
    const { offset, limit } = req.query
    const posts = await models.Post.findAll(
        {
            offset: offset * 1,
            limit: limit * 1,
        }
    );
    const offsetQuerySchema = Joi.object().keys({
        offset: Joi.string().required(),
        limit: Joi.string().required(),
    })

    Joi.validate({ offset: offset, limit: limit }, offsetQuerySchema, (err, value) => {
        if (err) {
            // send a 422 error response if validation fails
            res.status(422).json({
                status: 'error',
                message: 'Invalid request data',
                data: posts
            });
        } else {
            res.json({
                status: 'success',
                message: 'success',
                data: posts
            });
        }
    });
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
// const makePost = (req, res, next) => {
//     const postCreateSchema = Joi.object().keys({
//         title: Joi.string(),
//     })
//     models.Post.create({
//         title: req.body.title,
//     })
//         .then((result) => {
//             console.log(result);
//             res.status(201).json(result);
//         })
//         .catch((err) => {
//             console.error(err);
//             next(err);
//         });
// }
const makePost = (req, res, next) => {
    const postCreateSchema = Joi.object().keys({
        title: Joi.string(),
    })
    const body = req.body
    Joi.validate(body, postCreateSchema, (err, value) => {
        models.Post.create({
            title: body.title,
        })
            .then((result) => {
                console.log(result);
                res.status(201).json(result);
            })
            .catch((err) => {
                console.error(err);
                next(err);
            });
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

module.exports = {
    getUsers,
    getUser,
    getPosts,
    getPost,
    getComments,
    getComment,
    makeComment,
    makePost
}
