const express = require('express');

const numbers = require('./Data/numbers');

const app = express();

// console.log(numbers);
// console.log(people);

app.get('/', (req, res) => {
	res.send('Hello there');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));