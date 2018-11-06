const fetch = require('node-fetch')
function test(){
    fetch("https://api.thetvdb.com/login", {
        method:"POST",
        mode:"no-cors",
        headers:{
            "Content-type": "application/json; charset=utf-8",
        }
    }).then(res => res.json).then(json => console.log(json))
    // fetch(url, options)
    //     .then(res => res.json())
    //     .then(json => resolve(json))
    //     .catch(err => reject(err))
    // });
}

test();
