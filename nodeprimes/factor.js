//#! /usr/bin/env node

// Get the input stream for the console.
var stdin = process.openStdin();

// Get the filesystem module.
var fs = require('fs');

stdin.addListener("data", function (d) {
    try {
        //console.log('executing command: ' + d.toString());
        eval(d.toString());
    } catch (e) {
        handleError(e);
    }
});



function handleError(err) {
    console.log(err.name, err.message, err.stack);
}


// Returns the numbers which the input num can be divided by for mod 0.
function factor(num, onSuccess, onError) {
    var nums = [], factors = [];
    console.log('This may take some time.  Please be patient.');
    if (!onSuccess) {
        onSuccess = toFile;
    }
    if (!onError) {
        onError = handleError;
    }
    if (isNaN(num)) {
        onError({
            name: 'NaN',
            message: 'An invalid number was passed to function factor'
        });
        return false;
    }
    for (var i = 0; i < num; i++) {
        if (num % i === 0 ) {
            nums.push(num);
            factors.push(i);
        }
    }
    toFile(nums, factors);
    
    fs.readFile('factors.json', (err, data) => {
        if(err) throw err;
        console.log(JSON.parse(data));
    });
}

// Write in 
function toFile(nums, factors) {
    var file_content = fs.readFileSync('factors.json');
    try{
    var data = JSON.parse(file_content);
    } catch(e){
        data = {};
    }
    for(var i=0;i<nums.length;i++){
        data = addNumFactorPair(data, nums[i], factors[i]);
    }
    data = JSON.stringify(data, null, 1);
    fs.writeFileSync('factors.json', data);
};


function contains(arr, val) {
    return !!~arr.indexOf(val)
}

function addNumFactorPair(data, num, factor){
    if(!data){
        reset();
        return addNumFactorPair(data, num, factor);
    }
    if(!num || !factor){throw new Error('addNumFactorPair was called without proper parameters.  Values provided were: ', data, num, factor);}
    
    if (!data[num]){
        data[num] = [factor];
    } else {
        if(contains(data[num], factor)) {
            return data;
        } else {
            data[num].push(factor);
        }
    }
    
    return data;
}

function reset(){
    fs.writeFileSync('factors.json', '{}');
    var file_content = fs.readFileSync('factors.json');
    console.log(JSON.parse(file_content));
}