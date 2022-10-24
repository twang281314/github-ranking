'use strict';

import Base from './base.js';
import request from 'request';
import _ from 'lodash';
var OAuth = require('wechat-oauth');

export default class extends Base {

    constructor(ctx) {
        super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
        this.client = new OAuth('', '');
    }

    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        this.assign('items', users);
        this.assign('title', 'users ranking');
        return this.display();
    }
    
    async getAuthorizeURLAction(){
       let url  = this.client.getAuthorizeURL('http://ezcicw.natappfree.cc/wechat/getAccessToken')
       return this.json(url)
    }

    async getAccessTokenAction(data){
        console.log(data)
        return this.json(data)
     }

    testAction(){
        think.logger.info('wechat message');
        return this.success('wechat message')
    }
}
