//------------------------------REQUIRE------------------------------
const express = require('express');
const dotenv = require('dotenv')
const app = express();
const { connectDB } = require('./db/db');
const solidRoute = require('./routes/solid');
const liquidRoute = require('./routes/liquid');
const psychoRoute = require('./routes/psycho');

//------------------------------CONFIG------------------------------

dotenv.config();

app.set('port', process.env.PORT || 4000);

//------------------------------MIDDLEWARES------------------------------

app.use(express.json());

//------------------------------DB------------------------------

connectDB();

//------------------------------ROUTES------------------------------

app.use('/api/solid', solidRoute);

app.use('/api/liquid', liquidRoute);

app.use('/api/psycho', psychoRoute);

//------------------------------SERVER------------------------------

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
})