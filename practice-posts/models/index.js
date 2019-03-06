'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env]
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname) // 현재 경로의 파일 목록
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    }) // 필터를 통해서 .js만
    .forEach(file => {
        // sequelize.import
        const model = sequelize['import'](path.join(__dirname, file)); // 요거가 임포트하는 함수를 실행하는건데
        db[model.name] = model; // 그래서 파일들 하나씩 돌면서 db.User db.Post 이런식으로 다 들어가진 상태가 되고
    }); // 이건 어레이를 리턴하는건 아니고 하나씩 이제 임포트하는 코드를 실행하는거

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db); // 이제 그럼 associate이거를 자동으로 실행해주는지 확인해보자 보는중 posts/1 조회해바
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
