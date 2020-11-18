const { db, syncAndSeed, model: {Students, Bookings, Mentors} } = require('./db');
const express = require('express');
const path = require('path');
const { join } = require('path');
//const { urlencoded } = require('express');
const app = express();

app.use(express.urlencoded({ extended:false }));
//app.use(require('method-override')('_method'));
app.use('/', express.static(path.join(__dirname)));

app.get('/',async(req,res,next)=>{
    try{
        res.send(`
            <html>
                <head>
                    <link rel = 'stylesheet' href = '/style.css' />
                </head>
                <body id = 'home'>
                    <nav>
                        <img src = "logo.jpg"> 
                        <ul>
                            <a href = '/students'>
                                <li> Students </li>
                            </a>
                            <a href = '/mentors'>
                                <li> Mentors </li>
                            </a>
                            <a href = '/bookings'>
                                <li> Bookings </li>
                            </a>
                        </ul>
                    </nav>
                </body>
            </html>
        
        `);
    }
    catch(ex) {
        next(ex)
    }
})

app.get('/students',async(req,res,next)=>{
    try{
        const students = await Students.findAll({
            include:[
                Bookings,
                { 
                    model: Students,
                    as: 'referredBy'
                },
                { 
                    model: Mentors,
                    as: 'mentor'
                },
            ],
            order:['id']
        })
        var referredarr = [];
        students.forEach(student => {
            if (student.referredBy != null) {
                referredarr.push(student.referredBy.name)
            }
            else {
                referredarr.push('none');
            }
        }) 
        const names = students.map(student => student.name);
        const subjects = students.map(student => student.subject);
        const purchased = students.map(student => student.purchased  + ' hour(s)');
        const mentors = students.map(student => student.mentor.name)
        const bookings = students.map(student => 
            student.bookings.map(booking => 'On ' + booking.startTime + ' for ' + booking.duration).join("<br>"));
        res.send(`
            <html>
                <head>
                    <link rel = 'stylesheet' href = '/style.css' />
                </head>
                <header>
                    <a href = '/' style = 'color: black;'>
                    Back to Home Page
                    </a>
                </header>
                <body>
                    <h1> Students (${students.length}) </h1>
                    <table>
                    <tr>
                        <th width = "100px">Student</th>
                        <th width = "200px">Subject</th>
                        <th width = "300px">Purchased</th>
                        <th width = "150px">Referred by</th>
                        <th width = "100px">Mentor</th>
                        <th width = "500px">Bookings</th>
                    </tr>
                    <tr>
                        <td>${names[0]}</td>
                        <td>${subjects[0]}</td>
                        <td>${purchased[0]}</td>
                        <td>${referredarr[0]}</td>
                        <td>${mentors[0]}</td>
                        <td>${bookings[0]}</td>
                    </tr>
                    <tr>
                        <td>${names[1]}</td>
                        <td>${subjects[1]}</td>
                        <td>${purchased[1]}</td>
                        <td>${referredarr[1]}</td>
                        <td>${mentors[1]}</td>
                        <td>${bookings[1]}</td>
                    </tr>
                    <tr>
                        <td>${names[2]}</td>
                        <td>${subjects[2]}</td>
                        <td>${purchased[2]}</td>
                        <td>${referredarr[2]}</td>
                        <td>${mentors[2]}</td>
                        <td>${bookings[2]}</td>
                    </tr>
                    <tr>
                        <td>${names[3]}</td>
                        <td>${subjects[3]}</td>
                        <td>${purchased[3]}</td>
                        <td>${referredarr[3]}</td>
                        <td>${mentors[3]}</td>
                        <td>${bookings[3]}</td>
                    </tr>
                    <tr>
                        <td>${names[4]}</td>
                        <td>${subjects[4]}</td>
                        <td>${purchased[4]}</td>
                        <td>${referredarr[4]}</td>
                        <td>${mentors[4]}</td>
                        <td>${bookings[4]}</td>
                    </tr>
                    <tr>
                        <td>${names[5]}</td>
                        <td>${subjects[5]}</td>
                        <td>${purchased[5]}</td>
                        <td>${referredarr[5]}</td>
                        <td>${mentors[5]}</td>
                        <td>${bookings[5]}</td>
                    </tr>
                </table>

                </body>
            </html>
        
        `);
    }
    catch(ex) {
        next(ex)
    }
})

app.get('/mentors', async(req,res,next) => {
    try{
        const mentors = await Mentors.findAll({
            include:[
                Students, 
                {
                    model: Bookings, 
                    include: [
                        {
                            model: Students,
                            as: 'student'
                        }
                    ],
                }
            ],
            order:['rate']
        })
        const names = mentors.map(mentor => mentor.name);
        const rates = mentors.map(mentor => mentor.rate);
        const students = mentors.map(mentor => mentor.students.map(student => student.name).join("<br>"));
        const bookings = mentors.map(mentor => 
            mentor.bookings.map(booking => 'On ' + booking.startTime + ' for ' + booking.duration + ' hour(s) with ' + booking.student.name).join("<br>"));
        res.send(`
        <html>
            <head>
                <link rel = 'stylesheet' href = '/style.css' />
            </head>
            <header>
            <a href = '/' style = 'color: black;'>
            Back to Home Page
            </a>
            </header>
            <body>
                <h1> Mentors (${mentors.length}) </h1>
                <table>
                    <tr height = "50px">
                        <th width = "100px">Mentor</th>
                        <th width = "200px">Hourly Rate</th>
                        <th width = "300px">Students</th>
                        <th width = "500px">Bookings</th>
                    </tr>
                    <tr>
                        <td>${names[0]}</td>
                        <td>${rates[0]}</td>
                        <td>${students[0]}</td>
                        <td>${bookings[0]}</td>
                    </tr>
                    <tr>
                        <td>${names[1]}</td>
                        <td>${rates[1]}</td>
                        <td>${students[1]}</td>
                        <td>${bookings[1]}</td>
                    </tr>
                    <tr height = "50px">
                        <td>${names[2]}</td>
                        <td>${rates[2]}</td>
                        <td>${students[2]}</td>
                        <td>${bookings[2]}</td>
                    </tr>
                </table>
            </body>
        </html>
    `)
    }
    catch(ex){
        next(ex)
    }
})


app.get('/bookings', async(req,res,next)=>{
    try{
        const bookings = await Bookings.findAll({
            include: [  
                {
                    model: Students,
                    as: "student",
                }, 
                {
                    model: Mentors,
                    as: "mentor"
                }],
            order: ['id']
        });
        res.send(`
        <html>
            <head>
                <link rel = 'stylesheet' href = '/style.css' />
            </head>
            <header>
            <a href = '/' style = 'color: black;'>
            Back to Home Page
            </a>
            </header>
            <body>
                <h1> Bookings (${bookings.length}) </h1>
                <div id = "bookings">
                <ul>
                    <b>Booking ID</b>
                    ${ bookings.map( booking => `
                    <li>
                        ${booking.id} 
                    </li>
                    `).join('')}
                </ul>
                <ul>
                    <b>Student Name</b>
                    ${ bookings.map( booking => `
                    <li>
                        ${booking.student.name} 
                    </li>
                    `).join('')}
                </ul>
                <ul>
                    <b>Mentor Name</b>
                    ${ bookings.map( booking => `
                    <li>
                        ${booking.mentor.name} 
                    </li>
                    `).join('')}
                </ul>
                <ul>
                    <b>Subject</b>
                    ${ bookings.map( booking => `
                    <li>
                        ${booking.student.subject} 
                    </li>
                    `).join('')}
                </ul>
                <ul>
                    <b>Date</b>
                    ${ bookings.map( booking => `
                    <li>
                        ${booking.startTime} 
                    </li>
                    `).join('')}
                </ul>
                <ul>
                    <b>Duration</b>
                    ${ bookings.map( booking => `
                    <li>
                        ${booking.duration} 
                    </li>
                    `).join('')}
                </ul>
                </div>
            </body>
        </html>
    `)
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