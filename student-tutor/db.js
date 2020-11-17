const { ConnectionRefusedError, and } = require('sequelize');
const Sequelize = require('sequelize');
const {STRING,INTEGER} = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/mentorship')

const Students = db.define('students',{
    name: {
        type: STRING,
        unique: true,
        allowNull: false,
    },
    subject: {
        type: STRING,
        allowNull: false,
    },
    purchased: {
        type: INTEGER,
        allowNull: false,
    }
})

const Mentors = db.define('mentors',{
    name: {
        type: STRING,
        unique: true,
        allowNull: false,
    },
    rate: {
        type: INTEGER,
        allowNull:false,
    }
})

const Bookings = db.define('bookings',{
    startTime:{
        type: STRING,
        allowNull: false,
    },
    duration:{
        type: INTEGER,
        allowNull:false,
    },
})

Students.belongsTo(Students, {as : 'referredBy'})
Students.hasMany(Students, {foreignKey: 'referredById'})

Bookings.belongsTo(Students, {as: 'student'});
Students.hasMany(Bookings, {foreignKey:'studentId'})

Students.belongsTo(Mentors, {as: 'mentor'});
Mentors.hasMany(Students, {foreignKey:'mentorId'})

Bookings.belongsTo(Mentors,{as: 'mentor'});
Mentors.hasMany(Bookings, {foreignKey:'mentorId'})


const syncAndSeed = async() => {
    await db.sync( {force:true} );

const [russel, claire, andy, chloe, yuhan, christina, vicky] = await Promise.all([
    Students.create( {name: 'Russel', subject: 'Calculus', purchased: 6} ),
    Students.create( {name: 'Claire', subject: 'Biology', purchased: 20} ),
    Students.create( {name: 'Andy', subject: 'Biology', purchased: 8} ),
    Students.create( {name: 'Chloe', subject: 'Chemistry', purchased: 10} ),
    Students.create( {name: 'Yuhan', subject: 'Computer Science', purchased: 20} ),
    Students.create( {name: 'Christina', subject: 'Statistics', purchased: 5} ),
    Students.create( {name: 'Vicky', subject: 'Finance', purchased: 18} )
]);


const [eric, yunlu, serena] = await Promise.all([
    Mentors.create( {name: 'Eric', rate: 50} ),
    Mentors.create( {name: 'Yunlu', rate: 45} ),
    Mentors.create( {name: 'Serena', rate: 90} )
]);

const [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10] = await Promise.all([
    Bookings.create({startTime:'2020-10-15 11:00', duration: 1}),
    Bookings.create({startTime:'2020-10-20 19:00', duration: 2}),
    Bookings.create({startTime:'2020-10-20 21:00', duration: 1}),
    Bookings.create({startTime:'2020-10-22 22:00', duration: 2}),
    Bookings.create({startTime:'2020-11-01 20:00', duration: 2}),
    Bookings.create({startTime:'2020-11-05 21:00', duration: 1}),
    Bookings.create({startTime:'2020-11-10 20:00', duration: 2}),
    Bookings.create({startTime:'2020-11-11 17:00', duration: 1}),
    Bookings.create({startTime:'2020-11-13 20:00', duration: 1}),
    Bookings.create({startTime:'2020-11-15 21:00', duration: 2}),
]);
// Assigning students to mentors 
russel.mentorId = eric.id;
chloe.mentorId = eric.id;
andy.mentorId = eric.id;
claire.mentorId = eric.id;
yuhan.mentorId = yunlu.id;
vicky.mentorId = serena.id;
christina.mentorId = yunlu.id;

// Assigning students to referee
christina.referredById = russel.id;
andy.referredById = claire.id;
chloe.referredById = claire.id;

// Assigning students to bookings 
b1.studentId = russel.id;
b2.studentId = claire.id;
b3.studentId = claire.id;
b4.studentId = vicky.id;
b5.studentId = christina.id;
b6.studentId = andy.id;
b7.studentId = chloe.id;
b8.studentId = yuhan.id;
b9.studentId = yuhan.id;
b10.studentId = andy.id;

// Assigning mentors to bookings 
b1.mentorId = eric.id;
b2.mentorId = eric.id;
b3.mentorId = eric.id;
b4.mentorId = serena.id;
b5.mentorId = yunlu.id;
b6.mentorId = eric.id;
b7.mentorId = eric.id;
b8.mentorId = yunlu.id;
b9.mentorId = yunlu.id;
b10.mentorId = eric.id;

await Promise.all([
    russel.save(),
    christina.save(),
    chloe.save(),
    yuhan.save(),
    vicky.save(),
    claire.save(),
    andy.save(),
    b1.save(),
    b2.save(),
    b3.save(),
    b4.save(),
    b5.save(),
    b6.save(),
    b7.save(),
    b8.save(),
    b9.save(),
    b10.save(),
])
}

module.exports={
    db,
    syncAndSeed,
    model:{
        Students,
        Bookings,
        Mentors,
    }
}