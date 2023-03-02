const {Board} = require('./Board')
const {Cheese} = require('./Cheese')
const {User} = require('./User')

//one to many - multiple boards can be added to user
Board.belongsTo(User);
User.hasMany(Board);

module.exports = {
    Board, 
    User,
    Cheese
}