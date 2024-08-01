const express = require('express');
const app = express();
const connectDB = require('./db/config');
const port = 5000 || process.env.PORT;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/',
    express.static( path.resolve(__dirname, './uploads'))
);

app.use('/api/user/', require('./routes/user'));
app.use('/api/vehicle/', require('./routes/vehicle'));
app.use('/api/ride/', require('./routes/ride'));
app.use('/api/fuelUp/', require('./routes/fuelUp'));
app.use('/api/savedPlace/', require('./routes/savedPlaces'));
app.use('/api/recentPlace/', require('./routes/recentPlaces'));
app.use('/api/admin/', require('./routes/admin'));
app.use('/api/currentFuel/', require('./routes/currentFuelPrice'));

app.get('/', (req, res)=>{
    res.send('Welcome to FuelNav')
});

const start = () =>{
    try {
        connectDB();
        app.listen(port, ()=>{
            console.log(`${port} is Successfully Running!`)
        });
    } catch (error) {
        console.log('Error While Running the port!');
    }
};


start();