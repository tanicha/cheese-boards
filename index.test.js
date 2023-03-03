const {sequelize} = require('./db')
const {Cheese, Board, User} = require('./models/index')

describe ('Cheese Board Models', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    test('creating new cheese', async () => {
        const mozzCheese = await Cheese.create(({ title: 'Mozzarella', description: 'A southern Italian cheese'}))
        const goudaCheese = await Cheese.create(({ title: 'Gouda', description: 'A sweet creamy cheese'}))

        expect(mozzCheese.title).toBe('Mozzarella')
        expect(mozzCheese.description).toBe('A southern Italian cheese')
        expect(goudaCheese.title).toBe('Gouda')
        expect(goudaCheese.description).toBe('A sweet creamy cheese')
    });

    test('creating new board', async () => {
        const newBoard = await Board.create(({ type: 'Charcuterie', description: 'Contains various meats and cheese', rating: 10}))
        const newBoard2 = await Board.create(({ type: 'Cheese', description: 'Contains ONLY various cheeses', rating: 5}))

        expect(newBoard.type).toBe('Charcuterie')
        expect(newBoard.description).toBe('Contains various meats and cheese')
        expect(newBoard.rating).toBe(10)

        expect(newBoard2.type).toBe('Cheese')
        expect(newBoard2.description).toBe('Contains ONLY various cheeses')
        expect(newBoard2.rating).toBe(5)
    });

    test('creating new user', async () => {
        const newUser = await User.create(({ name: 'Tani', email: 'tani@example.com'}))

        expect(newUser.name).toBe('Tani')
        expect(newUser.email).toBe('tani@example.com')
    });

    test('adding multiple boards to user', async () => {
        const foundUser = await User.findByPk(1) //pk 1 - Tani

        await foundUser.addBoard(1) //pk 1 - charcuterie board
        await foundUser.addBoard(2) //pk 2 - cheese board

        const userBoards = await foundUser.getBoards()

        expect(userBoards.length).toBe(2)
    });

    test('adding multiple cheeses to boards', async () => {
        const foundBoard = await Board.findByPk(1) //charcuterie board pk 1

        await foundBoard.addCheese(1) //Mozz cheese pk 1
        await foundBoard.addCheese(2) //Gouda cheese pk 2

        const cheeseBoards = await foundBoard.getCheeses()

        expect(cheeseBoards.length).toBe(2)
    });
    
    test('adding multiple boards to cheese', async () => {
        const foundCheese = await Cheese.findByPk(1) //Mozz pk 1

        await foundCheese.addBoard(1) //char board pk 1
        await foundCheese.addBoard(2) //cheese board pk 2

        const boardCheese = await foundCheese.getBoards()
        
        expect(boardCheese.length).toBe(2)
    });

    test('eager loading test for cheese on boards', async () => {
        const someBoard = await Board.findAll({
            include: [
                {model: Cheese}
            ]
        })

        let counter = 0; 
            for (let i = 0; i < someBoard.length; i++){
                counter++
            }
        console.log(counter)

        expect(someBoard[0].cheeses.length).toBe(2) //expecting 2 cheeses in my char board
        expect(someBoard[1].cheeses.length).toBe(1) //expecting 1 cheese in my cheese board
    })


    test('eager loading test for users on boards', async () => {
        const someUser = await User.findAll({
            include: [
                {model: Board}
            ]
        })

        let counter = 0; 
            for (let i = 0; i < someUser.length; i++){
                counter++
            }
        console.log(counter)

        expect(someUser[0].boards.length).toBe(2) //expecting 2 boards for this 'Tani' user
    });

    test('eager loading test for cheese with boards', async () => {
        const someCheese = await Cheese.findAll({
            include: [
                {model: Board}
            ]
        })

        let counter = 0; 
            for (let i = 0; i < someCheese.length; i++){
                counter++
            }
        // console.log(counter)
        // console.log(someCheese)
        expect(someCheese[0].boards.length).toBe(2) //expecting 2 boards with mozz cheese 
    });
});