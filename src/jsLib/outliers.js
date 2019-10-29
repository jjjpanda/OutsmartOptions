//Finds outliers in volume for each strike price per expiration.
//Compares the PDF of each strike price to its % of total volume for the expiry.
//An outlier's % of total volume will differ signifigantly from its PDF


function getMean(dist){
//returns mean of set 
	var sum = 0;
	for(var v of dist){
		sum += v;
	}
	return (sum / dist.length);
}

function getSD(dist, mean){
//returns standard devitation given set 
	
	var sum = 0;
	for(var v of dist){		
		sum += Math.pow(v - mean,2);
	}
	if(sum <= 0 ){
		console.log("Error: SD <= 0");
		return 0;
	}
	return Math.sqrt(sum/(dist.length));
}

function getPDF(x, mean, std){
//returns PDF of a random variable given distribution info (mean and standard deviation)

	var variance = std * std;
    var m = std * Math.sqrt(2 * Math.PI);
    var e = Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
    return e / m;
}

function findOutliers(dataset, exp, strikes, vols, mean, std){
//Finds outliers in a set by comparing the probability density function of the strike price to its % of total volume
//Currently not in use becuase does not update status

	//check for outliers in call volumes
	console.log();
	console.log(dataset[exp][0]);

	var volSum = vols.reduce((a,b) => a + b, 0);
		
	for(var i = 0; i < strikes.length; i ++){	//traverses each strike price and checks for outliers
		pdf = getPDF(strikes[i], mean, std);
		ratio = vols[i] / volSum;

		if(ratio > pdf * 2){	//THRESHOLD FOR OUTLIER
			dataset[exp][1][i].status = "anomalous";
		}

		console.log(dataset[exp][1][i]);
		//console.log("Strike: " + strikes[i] + " Volume: " + vols[i] + " VolRatio: " + ratio + " PDF: " + pdf);
		console.log("VolRatio: " + ratio + " PDF: " + pdf);
	}

}

function setDistribution(strikes, vols){
//creates a distribution based on the volume for each strike price. 

	var data = [];
	for(var i = 0; i < strikes.length; i ++){
		for(var j = 0; j < vols[i]; j ++){
			data.push(strikes[i]);
		}
	}
	return data;
}

//Main
const fs = require('fs');

fs.readFile('/Your/dataset/path/here', 'utf8', (err, jsonString) => {	//file path for data here
    if (err) {
        console.log("File read failed:", err)
        return
    }

    var dataset = JSON.parse(jsonString); 
    var exp;

	var putVols;
	var callVols;
	var strikes;

	var dist;
	var std;
	var mean;

    for(var exp = 0; exp < dataset.length; exp++){ //traverses through each expiration 

    	putVols = [];
    	callVols = [];
    	strikes = [];

    	for(strike of dataset[exp][1]){	//traverses through each strike price and collects necessary data 

    		strikes.push(strike['strike']);
    		putVols.push(strike['putVol']);
    		callVols.push(strike['callVol']);
    		strike.status = "normal";
    	}

    	//check puts
    	dist = setDistribution(strikes, putVols);
    	mean = getMean(dist);
    	std = getSD(dist, mean);
    	findOutliers(dataset, exp, strikes, putVols, mean, std);	

    	//check calls
    	dist = setDistribution(strikes, callVols);
    	mean = getMean(dist);
    	std = getSD(dist, mean);
    	findOutliers(dataset, exp, strikes, callVols, mean, std); 

    }
}
)
