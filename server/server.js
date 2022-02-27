const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/user');
const cors = require('cors');

dotenv.config({ path: path.resolve(__dirname + '/.env') });

const app = express();

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect monogoose to database
mongoose.connect(
	process.env.DATABASE,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},

	(err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Connected to the database');
		}
	}
);

// require api routes
const contactRoute = require('./routes/contacts');
const userRoute = require('./routes/auth');

app.use('/api', contactRoute);
app.use('/api', userRoute);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Listening on port, ${port}`);
	}
});
