const {sequalize, sequelize} = require('./db')
const {Cheese} = require('./models/Cheese')
const {Board} = require('./models/Board')
const {User} = require('./models/User')



describe ('Cheese Board Models', () => {

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    test ('creating new cheese', async () => {
        const mozzCheese = await new Cheese({ title: 'Mozzarella', description: 'A southern Italian cheese'})

        expect(mozzCheese.title).toBe('Mozzarella')
        expect(mozzCheese.description).toBe('A southern Italian cheese')
    })

    test ('creating new board', async () => {
        const newBoard = await new Board({ type: 'Charcuterie', description: 'Contains various meats and cheese', rating: 10})
        const newBoard2 = await new Board({ type: 'Cheese', description: 'Contains ONLY various cheeses', rating: 5})

        expect(newBoard.type).toBe('Charcuterie')
        expect(newBoard.description).toBe('Contains various meats and cheese')
        expect(newBoard.rating).toBe(10)

        expect(newBoard2.type).toBe('Cheese')
        expect(newBoard2.description).toBe('Contains ONLY various cheeses')
        expect(newBoard2.rating).toBe(5)
    })

    test ('creating new user', async () => {
        const newUser = await new User({ name: 'Tani', email: 'tani@example.com'})

        expect(newUser.name).toBe('Tani')
        expect(newUser.email).toBe('tani@example.com')
    })

    //WORKING ON THIS failing
    test ('adding multiple boards to user', async () => {
        const foundUser = await User.findByPk(1) //pk 1 - Tani

        await foundUser.addBoard(1) //pk 1 - charcuterie board
        await foundUser.addBoard(2) //pk 2 - cheese board

        const userBoards = await foundUser.getBoards()

        expect(userBoards.length).toBe(2)
        console.log(userBoards)
    })







})