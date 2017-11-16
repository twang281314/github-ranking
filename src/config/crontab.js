module.exports = [{
    interval: '100000s',
    immediate: true,
    handle: '/users/test',
}, {
    cron: '59 23 * * *',
    handle: '/users/update',
    immediate: true,
    type: 'all'
},{
    cron: '10 23 * * *',
    handle: '/repositories/update',
    immediate: true,
    type: 'all'
},{
    cron: '25 23 * * *',
    handle: '/users/updateuser',
    immediate: true,
    type: 'all'
}]