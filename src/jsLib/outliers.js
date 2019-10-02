//Alerts user when volume outliers are found at a given date. 
//An outlier is defined here as a volume outside of 3 standard deviations of the volume distribution for that date.
//Does not save the outliers (yet), simply prints alerts
//I need to get better at JS

function getMean(vols){
//returns mean of set 
	var sum = 0;

	for(var i = 0; i < vols.length; i ++){
		sum += parseInt(vols[i]);
	}
	return (sum / vols.length);
}

function getSD(vols){
//returns standard devitation given set 
	var mean = getMean(vols);
	var squares = [];

	for(var i = 0; i < vols.length; i ++){
		squares.push(Math.pow(vols[i] - mean,2));
	}


	return Math.sqrt(getMean(squares));

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

fs.readFile('/file/path/here/data.json', 'utf8', (err, jsonString) => {	//file path for data here
    if (err) {
        console.log("File read failed:", err)
        return
    }

    var data = JSON.parse(jsonString);

    var date;
    var putVols = [];
    var callVols = [];

    for(var i = 0; i < data.length; i ++){	//traverse each date 

    	date = data[i]

    	for(var j = 0; j < date[1].length; j ++){ //collect Volumes 

    		putVols.push(date[1][j]["putVol"]);
    		callVols.push(date[1][j]["callVol"]);

    	}

    	var putOutliers = getOutliers(putVols, getSD(putVols));
    	var callOutliers = getOutliers(callVols, getSD(callVols));


    	if(putOutliers.length != 0){
    		console.log(date[0] + ": Put outliers found at " + putOutliers + " (option#, put Vol)");
    	}

    	if(callOutliers.length != 0){
    		console.log(date[0] + ": Call outliers found at " + callOutliers + " (option#, call Vol)");
    	}

    	if(putOutliers.length == 0 && callOutliers.length == 0){
    		console.log(date[0] + ": No outliers found ");
    	}


    	putVols = [];
    	callVols = [];

    }

})
