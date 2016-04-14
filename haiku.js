var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');
var syllabesArr = [ [], [] ,[] ,[] ,[] ,[] ,[] ,[] ];
var formattedArray = [ [], [], [] ];
///add error handling
function readCmudictFile (file){
	return fs.readFileSync(file).toString(); 
}

function formatData(data){ //organizes the words in the file by syllable count - there is an array for each number of syllables
	var lines = data.toString().split("\n");
	var	lineSplit;
	lines.forEach(function(line){
		lineSplit = line.split("  ");
		if(lineSplit[1].match(/\d/g)!==null && lineSplit[0].match(/\(|\./)===null){ //do not include words with no syllables or words with "("  or "."
			var count = lineSplit[1].match(/\d/g).length;
			if(count<=7){
				syllabesArr[count].push(lineSplit[0]); //we only need to collect words with 1 - 7 syllables
			}
		} 
	});
	return syllabesArr;
}
function structuredArray(strArray){ //determine the breakout of lines
	var sylTotal = 0; 
	for(var s = 0; s < strArray.length; s++){
		if(sylTotal + strArray[s] <= 5){ //if the syllable count is 5 or less, will be included in first line of haiku
			formattedArray[0].push(strArray[s]);
			sylTotal += strArray[s];
		} else if(sylTotal + strArray[s] <= 12){ //if the syllable count is greater than 5 but less than or equal to 12, will be included in second line of haiku
			formattedArray[1].push(strArray[s]);
			sylTotal += Number(strArray[s]);
		} else{ //any syllables after the 12 count will be included in third line of haiku
			formattedArray[2].push(strArray[s]);
		}
	}
	return formattedArray;	
}
function randomPick(formArray){  
	for(var f = 0; f < formattedArray.length; f++){ //loops through each "line array", 3 for a haiku
		var arraySegment = formattedArray[f];
		var randomWord = "";
		for(var r = 0; r < arraySegment.length; r++){//for one line of the haiku
			var maxArray = syllabesArr[arraySegment[r]].length;		//finding max of the particluar syllable array
			var randomNum = Math.floor(Math.random() * (maxArray - 0)); //generating random number based on max elements of the array
			randomWord += syllabesArr[arraySegment[r]][randomNum]; //finding the word that cooresponds the random number index
			if(r < arraySegment.length - 1){
				randomWord += " ";
			}
		}
		console.log(randomWord.slice(0,1) + randomWord.slice(1).toLowerCase()); //print line to console
	}
}
function createHaiku(structure){
	console.log("Please enjoy this original haiku:");
	formatData(cmudictFile); //formatting data from file into arrays
	structuredArray(structure); //determines the break out of the lines based on 5, 7, 5 struture of a haiku
	randomPick(formattedArray); //picks random numbers based on syllable needs and returns to the console
}

module.exports = {
	createHaiku: createHaiku,
};