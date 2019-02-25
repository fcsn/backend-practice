'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.hasMany(models.Comment, {as: 'comments', foreignKey: 'postId'}) // 이렇게 쓰면 편하니깐 ㅋㅋ ㅇㅇ 아까 원래 너가 작성하던 방식으로 거기서 해도됨 아 그럼 여기서 없애도 대는거지? 아 뭔소린지 알겟음 ㅇㅇ ㅇㅇ ㅋㅋㅋㅋㅋ 헠헠 그럼 페이지네이션으로 고고...! 일단 카페 끝나서 나가야겟다 ㅋㅋㅋㅋ
    }; // 아.... 그래서 필수가 아니군 ㅇㅇ 그때 말했던거 기억남, ㅇㅇ 근데 그러면 모델이 엄청 많아지면 관리가 거의 불가능해질거임 왜 애들이 이런 방식을 도입했는지 이해해야함 ㅇㅋㅇㅋ ㅋㅋ 그 책에서하는 방식도 틀린방법이 아냐 좀 비효율적인거지 ㅋㅋ 아무튼 그럼 페이지네이션 남았네 이제 ㅋㅋ 거의 다와따
  return Post;
};
