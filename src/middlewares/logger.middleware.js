import fs from "fs";

import winston from "winston";

const fsPromise=fs.promises;

// async function log(logData){
//     try{
//          if (typeof logData === "object") {
//             logData = JSON.stringify(logData, null, 2);
//         }
//         logData=`\n ${new Date().toString()} - ${logData}`;

//         fsPromise.appendFile("log.txt",logData);
//     }catch(err){
//         console.log(err);
//     }
// }

const logger=winston.createLogger({
   level: 'info',
   format:winston.format.json(),
   defaultMeta:{service:'request-logging'},
   transports:[
    new winston.transports.File({filename:'log.txt'})
   ]
});

const loggerMiddleware=async(req,res,next)=>{
    // const logData=`${req.url} - ${JSON.stringify(req.body)}`;
    // await log(req.body);
    // next();

    if(!req.url.includes('signin')){
        const logData=`${req.url} - ${JSON.stringify(req.body)}`;
        logger.info(logData); 
    }
    next();
};

export default loggerMiddleware;