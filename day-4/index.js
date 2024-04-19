function objectToString(object, separator = '/') {
    return Object.values(object).join(separator);
}

function objectsToString(objects, separator = '/') {
    return objects.map(object => objectToString(object));
}

function test() {
    const objects = [{
        name: 'Seun', age: 23, level: '500 level'
    }, {name: 'BBBgh', age: 'twenty three', level: 'year 1'}]
    console.log(objectsToString(objects));
}

test()