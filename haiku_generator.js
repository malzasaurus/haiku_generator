var haiku = require('./haiku');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What haiku structure would you like? \nEnter like a string 5,7,5:  ', (answer) => { //asks the user to input structure
	if(answer === "") { //defaults to 5,7,5 structure if nothing entered
 	 	answer = "5,7,5";
 	};
 	var answerArray = answer.split(",").map(Number); //converts answer to an array of numbers
 	haiku.createHaiku(answerArray); //runs create haiku module by passing users input
	rl.close();
});