'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    postId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    // Comment.belongsTo(models.Post, { foreignKey: 'postId' });
  };
  return Comment;
};

// 이런식으로
// 이렇게 하면 코멘트 테이블에서
// postId === 1 인 코멘트를 조회하게되면
// 1번 포스트의 댓글들을 읽어올수있겠지? ㅇㅇ

// 지금 떠 있는 에러는 방금전에 포스트 모델에다가 코멘트라는 프로퍼티를 넣어놔서
// 디비에서 그 필드를 조회할려니까 에러가난거
// 그런 필드는 없으니깐

// 그러면 이제 요상태에서 서버 다시 시작해서 고고 해보자

// 코멘트 테이블에 포스트아이디가 없넹
// 마이그레이숀 고고 ㅋㅋ

