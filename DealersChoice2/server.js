const { db, syncAndSeed, model: {Recipes} } = require('./db');
const express = require('express');
const path = require('path');
//const { join } = require('path');
const app = express();

app.use('/', express.static(path.join(__dirname)));

app.get('/',async(req,res,next)=>{
    try{
        const recipes = await Recipes.findAll({order: ['id']});
        const names = recipes.map(recipe => recipe.name);
        //const details = recipes.map(recipe => recipe.details);
        const ratings = recipes.map(recipe => recipe.rating);
        const summaries = recipes.map(recipe => recipe.summary);
        res.send(`
            <html>
                <head>
                    <link rel = 'stylesheet' href = '/style.css' />
                </head>
                <body>
                    <nav>
                        <div id = 'cheesecake'>
                            <a href = '/cheesecake'> <img src = "/pics/cheesecake.png"> </a>
                            <ul>
                                <li> <b>${names[0]}</b> </li>
                                <li> Rating: ${ratings[0]} </li>
                                <li> ${summaries[0]} </li>
                            </ul>
                        </div>
                        <div id = 'mimosa'>
                            <a href = '/pie'> <img id = 'pie' src = "/pics/pie.png"> </a>
                            <ul>
                                <li> <b>${names[1]}</b> </li>
                                <li> Rating: ${ratings[1]} </li>
                                <li> ${summaries[1]} </li>
                            </ul>
                        </div>
                        <div id = 'pie'>
                            <a href = '/mimosa'> <img src = "/pics/mimosa.png"> </a>
                            <ul>
                                <li> <b>${names[2]}</b> </li>
                                <li> Rating: ${ratings[2]} </li>
                                <li> ${summaries[2]} </li>
                            </ul>
                        </div>
                        <div id = 'shakshuka'>
                            <a href = '/shakshuka'> <img src = "/pics/shakshuka.png"> </a>
                            <ul>
                                <li> <b>${names[3]}</b> </li>
                                <li> Rating: ${ratings[3]} </li>
                                <li> ${summaries[3]} </li>
                            </ul>
                        </div>
                    </nav>
                </body>
            </html>
        
        `);
    }
    catch(ex) {
        next(ex)
    }
})

app.get('/cheesecake',async(req,res,next)=>{
    try{
        const recipes = await Recipes.findAll({order: ['id']});
        const names = recipes.map(recipe => recipe.name);
        const details = recipes.map(recipe => recipe.details);
        const ratings = recipes.map(recipe => recipe.rating);
        const summaries = recipes.map(recipe => recipe.summary);
        res.send(`
            <html>
                <head>
                    <link rel = 'stylesheet' href = '/style.css' />
                </head>
                <body>
                    <a href = '/'> <p> Back to Home Page</p> </a>
                        <div>
                            <img src = "/pics/cheesecake.png"> 
                            <ul id = 'detail'>
                                <li> <b>${names[0]}</b> </li>
                                <li> Rating: ${ratings[0]} </li>
                                <li> ${summaries[0]} </li>
                                <li> ${details[0]} </li>
                                <a href ='https://www.justonecookbook.com/souffle-japanese-cheesecake/'> <li> Click here for detailed recipe </li> </a>
                            </ul>
                        </div>
                </body>
            </html>
        
        `);
    }
    catch(ex) {
        next(ex)
    }
})

app.get('/pie', async(req,res,next)=>{
    try{
        const recipes = await Recipes.findAll({order: ['id']});
        const names = recipes.map(recipe => recipe.name);
        const details = recipes.map(recipe => recipe.details);
        const ratings = recipes.map(recipe => recipe.rating);
        const summaries = recipes.map(recipe => recipe.summary);
        res.send(`
            <html>
                <head>
                    <link rel = 'stylesheet' href = '/style.css' />
                </head>
                <body>
                    <a href = '/'> <p> Back to Home Page</p> </a>
                        <div>
                            <img src = "/pics/pie.png"> 
                            <ul id = 'detail'>
                                <li> <b>${names[1]}</b> </li>
                                <li> Rating: ${ratings[1]} </li>
                                <li> ${summaries[1]} </li>
                                <li> ${details[1]} </li>
                                <a href ='https://www.simplyrecipes.com/recipes/suzannes_old_fashioned_pumpkin_pie/'> <li> Click here for detailed recipe </li> </a>
                            </ul>
                        </div>
                </body>
            </html>     
        `);
    }
    catch(ex) {
        next(ex)
    }
})

app.get('/mimosa', async(req,res,next)=>{
    try{
        const recipes = await Recipes.findAll({order: ['id']});
        const names = recipes.map(recipe => recipe.name);
        const details = recipes.map(recipe => recipe.details);
        const ratings = recipes.map(recipe => recipe.rating);
        const summaries = recipes.map(recipe => recipe.summary);
        res.send(`
            <html>
                <head>
                    <link rel = 'stylesheet' href = '/style.css' />
                </head>
                <body>
                    <a href = '/'> <p> Back to Home Page</p> </a>
                        <div>
                            <img src = "/pics/mimosa.png"> 
                            <ul id = 'detail'>
                                <li> <b>${names[2]}</b> </li>
                                <li> Rating: ${ratings[2]} </li>
                                <li> ${summaries[2]} </li>
                                <li> ${details[2]} </li>
                                <a href ='https://www.inspiredtaste.net/19516/mimosa-recipe/'> <li> Click here for detailed recipe </li> </a>
                            </ul>
                        </div>
                </body>
            </html>     
        `);
    }
    catch(ex) {
        next(ex)
    }
})

app.get('/shakshuka', async(req,res,next)=>{
    try{
        const recipes = await Recipes.findAll({order: ['id']});
        const names = recipes.map(recipe => recipe.name);
        const details = recipes.map(recipe => recipe.details);
        const ratings = recipes.map(recipe => recipe.rating);
        const summaries = recipes.map(recipe => recipe.summary);
        res.send(`
            <html>
                <head>
                    <link rel = 'stylesheet' href = '/style.css' />
                </head>
                <body>
                    <a href = '/'> <p> Back to Home Page</p> </a>
                        <div>
                            <img src = "/pics/shakshuka.png"> 
                            <ul id = 'detail'>
                                <li> <b>${names[3]}</b> </li>
                                <li> Rating: ${ratings[3]} </li>
                                <li> ${summaries[3]} </li>
                                <li> ${details[3]} </li>
                                <a href ='https://cooking.nytimes.com/recipes/1014721-shakshuka-with-feta'> <li> Click here for detailed recipe </li> </a>
                            </ul>
                        </div>
                </body>
            </html>     
        `);
    }
    catch(ex) {
        next(ex)
    }
})



const init = async() => {
    try{
        await syncAndSeed();
        const port = process.env.PORT || 3000
        app.listen(port,()=>{console.log(`Listening on Port: ${port}`)})
    }
    catch(error){
        console.log(error);
    }
}

init()