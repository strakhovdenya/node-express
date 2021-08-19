export function applyRelationship(sequelize){
    const { post, user } = sequelize.models;

    user.hasMany(post, { foreignKey: 'userId', sourceKey: 'id' });
    post.belongsTo(user, { foreignKey: 'userId', targetKey: 'id' });
}