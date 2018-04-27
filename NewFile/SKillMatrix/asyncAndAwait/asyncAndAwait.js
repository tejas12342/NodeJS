function timer(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve('resoled');
        },2000);
    })
}

function callfunc(){
    console.log(`Call function 2`);
}

async function asyncCall(){
    console.log(`calling the function`);
    var output=await timer();
    console.log(output);
}

asyncCall();
callfunc();
console.log(`Program is Ended`);