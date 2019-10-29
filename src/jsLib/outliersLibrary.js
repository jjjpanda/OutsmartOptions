export function getMean(dist){
//returns mean of set 
    var sum = 0;

    for(var v of dist){
        sum += v;
    }
    
    return (sum / dist.length);
}

export function getSD(dist, mean){
//returns standard devitation given set 
    
    var sum = 0;

    for(var v of dist){		
        sum += Math.pow(v - mean,2);
    }

    if(sum <= 0 ){
        //console.log("Error: SD <= 0");
        return 0;
    }

    return Math.sqrt(sum/(dist.length));

}

export function getPDF(x, mean, std){
//returns PDF of a random variable given distribution info (mean and standard deviation)

    var variance = std * std;
    var m = std * Math.sqrt(2 * Math.PI);
    var e = Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
    return e / m;
}

export function setDistribution(strikes, vols){
//creates a distribution based on the volume for each strike price. 
    var data = [];
    for(var i = 0; i < strikes.length; i ++){
        for(var j = 0; j < vols[i]; j ++){
            data.push(strikes[i]);
        }
    }

    return data;
}
    
export function isOutlier(volume, sum, strike, mean, std){
    if (volume / sum > getPDF(strike, mean, std) * 3){
        return true;
    }
    else {
        return false;
    }
}
