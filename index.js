const express = require('express');

const numbers = require('./Data/numbers');
const people = require('./Data/people');

const app = express();

app.get('/', (req, res) => {
	res.send('Hello there');
});

app.get('/numbers', (req, res) => {
	res.send(numbers);
});

app.get('/numbers/:type', (req, res) => {
	console.log(req.params.type);

	if(req.params.type === 'even') {
		const array = numbers.filter( number => number % 2 === 0);
		res.send(array);
	} else if (req.params.type === 'odd') {
		const array = numbers.filter(number => number % 2 !== 0);
		res.send(array);
	} else res.status(400).send(`Improper input from ${req.params.type}`);
});

app.get('/people', (req, res) => {
	res.json(people);
});

app.get('/people/:emailClient', (req, res) => {

	const array = [];

	Object.entries(people).forEach(person => {
		if(person[1].email.includes(req.params.emailClient)) {
			array.push(person);
		}
	});

	if(array.length === 0) {
		res.status(404).send('No people match with given email client');
	} else res.send(array);
});

app.post('/numbers/:input', (req, res) => {
	const newNumber = Number(req.params.input);

	if(!numbers.includes(newNumber)) {
		numbers.push(newNumber);
		res.status(200).send(numbers);
	} else res.status(400).send('Invalid Number');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));