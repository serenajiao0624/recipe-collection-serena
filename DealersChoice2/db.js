const Sequelize = require('sequelize');
const {STRING, INTEGER, TEXT, FLOAT} = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/cookbook')

const Recipes = db.define('recipes',{
    name: {
        type: STRING,
        unique: true,
        allowNull: false,
    },
    details: {
        type: TEXT,
        allowNull: false,
    },
    rating: {
        type: FLOAT(2,1)
    },
    summary: {
        type: STRING
    }
})

const syncAndSeed = async() => {
    await db.sync( {force:true} );


const [cheesecake, pie, mimosa, shakshuka] = await Promise.all([
    Recipes.create( {name: 'Japanese Cheesecake', details: 'Japanese Cheesecake is very popular outside of Japan. Compared to the traditional cheesecake, these are more like a cake and not too heavy and sweet.', rating: 4.6, summary: "A Japanese version of light and fluffy Cheesecake"} ),
    Recipes.create( {name: 'Old Fashioned Pumpkin Pie', details: 'When making a pumpkin pie from scratch, you have a choice. You can either use pumpkin purée from a can, or make your own pumpkin purée by cooking a sugar pumpkin.', rating: 4.8, summary: "The single most requested dessert at our Thanksgiving table <br> is pumpkin pie"} ),
    Recipes.create( {name: 'Brunch Mimosa', details: 'What’s better to serve at brunch than a fabulous mimosa recipe made with dry sparkling wine and orange juice? Learn how to make your favorite brucnh drink', rating: 4.9, summary: "Photogenic and delicious cocktail for your Sunday brunch"} ),    
    Recipes.create( {name: 'Shakshuka With Feta', details: 'It’s a one-skillet recipe of eggs baked in a tomato-red pepper sauce spiced with cumin, paprika and cayenne.', rating: 5.0, summary: "Delicious dish made with everyday ingredients"} ),
]);
}

module.exports={
    db,
    syncAndSeed,
    model:{
        Recipes
    }
}