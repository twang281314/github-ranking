module.exports = [{
    interval: '1000s',
    immediate: true,
    handle:'/users/test'
}, {
    cron: '59 23 * * *',
    handle: '/users/update',
    type: 'all'
},{
    cron: ' 10 23 * * *',
    handle: '/repositories/update',
    type: 'all'
},{
    cron: '25 23 * * *',
    handle: '/users/updateuser',
    type: 'all'
}]