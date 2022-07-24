const db = require('./connection');
const { Babysitter, User } = require('../models');

db.once('open', async () => {
    await Babysitter.deleteMany();

    const babysitter = await Babysitter.insertMany([
        {
            babysitterAuthor: 'Selena',
            babysitterFirst: 'Gomez',
            babysitterLast: 'Gomez',
            babysitterEmail: 'selena@test.com',
            babysitterAbout: 'A great babysitter who can sing great lullabies!',
            babysitterLoc: 'Sydney, 2000',
            babysitterCert: 'WWCC',
            babysitterPic: 'https://api.time.com/wp-content/uploads/2020/09/time-100-Selena-Gomez.jpg',
            babysitterPh: '0422277554'
        },
        {
            babysitterAuthor: 'Abel',
            babysitterFirst: 'Abel',
            babysitterLast: 'Tesfaye',
            babysitterEmail: 'abel@test.com',
            babysitterAbout: 'A fun guy who is also known as "starboy" amongst kids. Please note, I can get blinded by lights very easily. Not available on the weeknds.',
            babysitterLoc: 'Kensignton, 2033',
            babysitterCert: 'WWCC, First Aid',
            babysitterPic: 'https://api.time.com/wp-content/uploads/2020/09/time-100-The-Weeknd-1.jpg?quality=85&w=1600',
            babysitterPh: '0422277554'
        },
        {
            babysitterAuthor: 'Hassan',
            babysitterFirst: 'Hassan',
            babysitterLast: 'Minhaj',
            babysitterEmail: 'hassan@test.com',
            babysitterAbout: 'Dad of 2, love to play basketball and I am funny too.',
            babysitterLoc: 'Waverley, 2024',
            babysitterCert: 'None',
            babysitterPic: 'https://pbs.twimg.com/profile_images/1423674940612612103/W86uVN_G_400x400.jpg',
            babysitterPh: '0422277554'
        },
       
    ]);

    console.log('babysitters seeded');

    await User.deleteMany();

    await User.create({
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@babysitters-club.com',
        password: 'password1234',
    });

    await User.create({
        firstName: 'Selena',
        lastName: 'Gomez',
        email: 'selena@test.com',
        password: 'password1234',
    });

    await User.create({
        firstName: 'Abel',
        lastName: 'Tesfaye',
        email: 'abel@test.com',
        password: 'password1234',
    });

    await User.create({
        firstName: 'Hassan',
        lastName: 'Minhaj',
        email: 'hassan@test.com',
        password: 'password1234',
    });

    console.log('users seeded')

    process.exit();
});