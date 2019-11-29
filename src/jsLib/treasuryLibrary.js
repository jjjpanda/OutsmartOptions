//function to parse name value and convert it to a number of days
//first, realize if there's a "M" or a "Y" present.
//If there is an M, then take the previous element in the list(list?) and multiply it by 30, otherwise multiply by 360

export function getInt(string){
	if (string.includes('M')){
		return 30
	}
	else if (string.includes('Y')){
		return 365
	}
	else {
		return 1;
	}
}

export function getClose(givenDays, valT, valB, topDays, bottomDays){
	var interpolatedVal = 0
	if(topDays - bottomDays != 0){
		interpolatedVal = valB + ((valT-valB)*(givenDays - bottomDays)/(topDays-bottomDays))
	}
	return interpolatedVal
}

export function getDays(yields){
	return yields.map(y => {return{...y, days: getInt(y.name) * parseInt(y.name.match(/(\d+)/)[0] != undefined ? y.name.match(/(\d+)/)[0] : 0) }});
}

export function getRightYield(yields, expireTime){
	if(yields.length == 0 || yields == undefined || yields == null){
		return 0;
	}

	yields = getDays(yields)
	
	//for over yields and look until expire time > days -> take that and prev and interpolate
	if(expireTime < yields[0].days){
		return getClose(expireTime, 0, yields[0].val, 0, yields[0].days)
	}
	for (var i = 0; i < yields.length - 1; i++){
		if(yields[i].days < expireTime && expireTime <= yields[i+1].days){
			return getClose(expireTime, yields[i+1].val, yields[i].val, yields[i+1].days, yields[i].days)
		}
	}
	return 0;
}