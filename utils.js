
const request = require('request');


module.exports = {

    fetch : function (url, options = {}){
        return new Promise(function(resolve, reject){
            request(url, options, (err, res, body)=>{
                if(err){
                    return reject(err);
                }
                resolve(body);
            });
        });
    }, 

    parseJson : function(jsonStr){
        let ret = false;
        if (typeof jsonStr == 'string') {
            jsonStr = jsonStr.trim();
            if(jsonStr.charAt(0) !== '{'){
                return ret;
            }
            try {
                ret = JSON.parse(jsonStr);
            } catch(e) {
                ret = false;
            }
        }
        return ret;
    }
};