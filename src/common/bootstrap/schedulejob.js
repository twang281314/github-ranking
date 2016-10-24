/**
 * 定时任务
 */

//https://github.com/node-schedule/node-schedule

// import crontab from "node-crontab";
// // 1 小时执行一次
// let jobId = crontab.scheduleJob("*/1 * * * *", () => {
//        console.log("It's been 1 minutes!");
// });

import schedule from 'node-schedule';

let jobId = schedule.scheduleJob('* */2 * * *', () => {
    console.log(Date() + ":It's been 2  hours!");
    //调用一个 Action
    think.http("/repositories/update", true); //模拟访问
});