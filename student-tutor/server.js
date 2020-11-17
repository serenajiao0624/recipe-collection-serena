const { db, syncAndSeed, model: {Students, Bookings, Mentors} } = require('./db');
const express = require('express');
const path = require('path');
const { join } = require('path');
//const { urlencoded } = require('express');
const app = express();

app.use(express.urlencoded({ extended:false }));
//app.use(require('method-override')('_method'));
app.use('/', express.static(path.join(__dirname)));

app.get('/home',async(req,res,next)=>{
    try{
        res.send(`
            <html>
                <head>
                    <link rel = 'stylesheet' href = '/style.css' />
                </head>
                <body id = 'home'>
                    <img src = "logo.jpg"> 
                    <nav>
                        <ul>
                            <a href = '/home/students'>
                                <li> Students </li>
                            </a>
                            <a href = '/home/mentors'>
                                <li> Mentors </li>
                            </a>
                            <a href = '/home/bookings'>
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

app.get('/home/students',async(req,res,next)=>{
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
        res.send(`
            <html>
                <head>
                    <link rel = 'stylesheet' href = '/style.css' />
                </head>
                <header>
                    <a href = '/home' style = 'color: black;'>
                    Back
                    </a>
                </header>
                <body>
                    <h1> Students (${students.length}) </h1>
                    <div id = "students">
                        <ul>
                            <b>Student</b>
                            ${ students.map( student => `
                            <li>
                                ${student.name} 
                            </li>
                            `).join('')}
                        </ul>
                        <ul>
                            <b>Subject</b>
                            ${ students.map( student => `
                            <li>
                                ${student.subject} 
                            </li>
                            `).join('')}
                        </ul>
                        <ul>
                            <b>Purchased</b>
                            ${ students.map( student => `
                            <li>
                                ${student.purchased} hrs
                            </li>
                            `).join('')}
                        </ul>
                        <ul>
                            <b>Referred by</b>
                            ${ referredarr.map( refer => `
                            <li>
                                ${refer} 
                            </li>
                            `).join('')}
                        </ul>
                        <ul>
                            <b>Mentor</b>
                            ${ students.map( student => `
                            <li>
                                ${student.mentor.name} 
                            </li>
                            `).join('')}
                        </ul>
                        <ul>
                            <b>Bookings</b>
                            ${ students.map( student => `
                            <li>
                                ${student.bookings.map(booking => 'On ' + booking.startTime + ' for ' + booking.duration + ' hour(s)').join(', ')} 
                            </li>
                            `).join('')}
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

app.get('/home/mentors', async(req,res,next) => {
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
            <a href = '/home' style = 'color: black;'>
            Back
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


app.get('/home/bookings', async(req,res,next)=>{
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
            <a href = '/home' style = 'color: black;'>
            Back
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