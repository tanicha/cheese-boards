const {Board} = require('./Board')
const {Cheese} = require('./Cheese')
const {User} = require('./User')

//one to many - multiple boards can be added to user
Board.belongsTo(User);
User.hasMany(Board);

//many to many - A Board can have many Cheeses, A Cheese can be on many Boards

Board.belongsToMany(Cheese, {through: 'board_cheeses'});
Cheese.belongsToMany(Board,{through: 'board_cheeses'});

module.exports = {
    Board, 
    User,
    Cheese
}