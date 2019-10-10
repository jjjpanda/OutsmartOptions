export function mapToObject(map) {
    let obj = Object.create(null);
    for (let [k,v] of map) {
        obj[k] = v;
    }
    return obj;
}

export function objectToMap(object){
    var map = Object.entries(object)
    for(var value of map){
        value[1] = Object.entries(value[1])
    }
    return map
}