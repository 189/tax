
const express = require('express');
const router = express.Router();
const co = require('co');
const utils = require('./utils');
const json2csv = require('json2csv');

module.exports = router;

const url = 'https://gr.tax.sh.gov.cn/wsz-ww-web/web/shanghai/taxInfo/search?skssqq=2011-02-01&skssqz=2017-12-01&t=' + Date.now();
const localURL = '/download?skssqq=2011-02-01&skssqz=2017-12-01';

router.get('/', (req, res, next)=>{
    co(function*(){
        const { jssession } = req.cookies; 
        const cookie = [
            'JSESSIONID=' + jssession,
            'st=1c265d9282b0447b98a4b875336168b4'
        ].join(';');

        let result = yield utils.fetch(url, { headers : { cookie } });
        let r = utils.parseJson(result);

        data = r.data;
    
        let translate = {
            nsxm : '纳税项目',
            skssqq : '税款所属期始',
            skssqz : '税款所属期终',
            skssjg : '征收机关',
            kjywr : '扣税义务人',
            sbrq : '申报日期'
        };
    
        let ignore = ['ynssde', 'sdxmDm', 'sdxmmc', 'kjywrmc', 'dzlbzdsdm', 'kjywrdm', 'sjsdxmdm', 'kjsb', 'orderBy', 'zsjgdm', 'sdxmdm', 'kjywrdjxh', 'dzsph', 'nsrsbh', 'nsrxm', 'sfzjhm', 'sfzjlxdm', 'sfzjlxmc'];
        
        json2csv({ data }, function(err, csv){
            if(err){
                throw new Error(err);
            }
            res.attachment('20111-2017.12历年税单.csv');  
            res.send(csv);
        })
    })
})



