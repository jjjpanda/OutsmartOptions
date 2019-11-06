var yields = [{name: "d:BC_1MONTH", val: 1.79},
{name: "d:BC_2MONTH", val: 1.77},
{name: "d:BC_3MONTH", val: 1.82},
{name: "d:BC_6MONTH", val: 1.81},
{name: "d:BC_1YEAR", val: 1.73},
{name: "d:BC_2YEAR", val: 1.56},
{name: "d:BC_3YEAR", val: 1.51},
{name: "d:BC_5YEAR", val: 1.51},
{name: "d:BC_7YEAR", val: 1.59},
{name: "d:BC_10YEAR", val: 1.65},
{name: "d:BC_20YEAR", val: 1.93},
{name: "d:BC_30YEAR", val: 2.11}]

expireTime = 90; //in days, as an example
rightYield = 90; //appropriate yield considering expireTime, 90 is a placeholder

//function to parse name value and convert it to a number of days
//first, realize if there's a "M" or a "Y" present.
//If there is an M, then take the previous element in the list(list?) and multiply it by 30, otherwise multiply by 360

function getInt(string){
	if (string.includes('M')){
		return 30
	}
	else if (string.includes('Y')){
		return 365
	}
}



function getClose(days, prevDay, givenDays, valT, valB, topDays, bottomDays){
	var interpolatedVal = 0

	if(givenDays > days){
		var distance = valB - valT
		//interpolatedVal = top + ((givenDays / 100) * distance)
		if(distance != 0){
			interpolatedVal = valB + (((valT - valB)/distance)*(topDays - bottomDays))


			return interpolatedVal
		}
		else{
			
		}
		
		
	}

}

//yields[5].name.match(/(\d+)/)[0]

function getRightYield(yields, expireTime){
	
    yields = yields.map(y => {return{...y, days: getInt(y.name) * parseInt(y.name.match(/(\d+)/)[0] != undefined ? y.name.match(/(\d+)/)[0] : 0) }});
	console.log(yields)
	var rightYield = 0

	//for over yields and look until expire time > days -> take that and prev and interpolate
	for (var i = 0; i < yields.length; i++){
		if(expireTime > yields[i].days && i>0){
				rightYield = getClose(yields[i].days, yields[i-1].days, expireTime, yields[1].val, yields[i-1].val, yields[1].days, yields[i-1].days)
				return rightYield;
			}
	}
	//return yields.forEach((mat, index) => getClose(mat.days, index < 1 ? 0 : yields[index-1].days, expireTime, mat.val, index < 1 ? 0 : yields[index-1].val, mat.days, index < 1 ? 0 : yields[index-1].days))


}