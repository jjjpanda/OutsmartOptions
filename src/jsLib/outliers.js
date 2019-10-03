//Finds PDF of the volume for each strike price volume pair 
//PMF may work better since  Volumes are technically discrete 
//Distribution functions used: https://github.com/AndreasMadsen/distributions

function getMean(vols){
//returns mean of set 
	var sum = 0;

	for(const v of vols){
		sum += parseInt(v);
	}
	
	return (sum / vols.length);
}

function getSD(vols){
//returns standard devitation given set 

	var mean;
	mean = getMean(vols);
	var squares = [];
	var SD;

	for(const v of vols){		
		var foo = Math.pow(parseInt(v) - mean,2);
		squares.push(foo.toString());
	}

	mean = getMean(squares);
	SD = Math.sqrt(mean);

	if(SD <= 0 ){
		console.log("Error: SD <= 0");
		return 1;
	}

	return Math.sqrt(mean);

}

function getOutliers(vols, std){
//Finds outliers in a set given standard deviation

	var outliers = []
	for(var i = 0; i < vols[i]; i ++){

		if(vols[i] > (getMean(vols) + (3 * std)) || vols[i] < (getMean(vols) - (3 * std))){
			outliers.push([i, vols[i]]);	//[option #, option volume]
		}
	}

	return outliers;

}

//Main
const fs = require('fs')
var distributions = require('distributions');
//var gaussian = require('gaussian');

fs.readFile('/Users/Eamon/Desktop/data.json', 'utf8', (err, jsonString) => {	//file path for data here
    if (err) {
        console.log("File read failed:", err)
        return
    }

    var data = JSON.parse(jsonString);
    var date;

    var putMap = new Map();
    var callMap = new Map();

	var putVols;
	var callVols;

	var putDist; 
	var callDist;

    var mean;
    var SD;

    var putProb;
    var callProb;


    for(var i = 0; i < data.length; i ++){	//traverse each date 

    	date = data[i];

    	console.log("----------------" + date[0] + "-----------------");

    	for(var j = 0; j < date[1].length; j ++){ //collect Volumes 

    		putMap.set(date[1][j]["strike"], date[1][j]["putVol"]);
    		callMap.set(date[1][j]["strike"], date[1][j]["callVol"]);

    	}
  		
  		//Calculate Distribution for puts
  		putVols = Array.from(putMap.values());
    	mean = getMean(putVols);
    	SD = getSD(putVols);
    	putDist = distributions.Normal(mean, SD);  

    	//Calculate Distribution for calls
    	callVols = Array.from(callMap.values());
    	mean = getMean(callVols);
    	SD = getSD(callVols);
    	callDist = distributions.Normal(mean, SD);


    	//Print Put Probabilities 
    	for(var[s,v] of putMap){
    		putProb = putDist.pdf(v);
    		console.log("Strike: " + s + " PutVol: " + v + " Probability: " + putProb);

    	}
    	//Need to find way to loop through call and put probabilities at same time
    	putMap.clear();
    }

})
