/*
 * @Author: anytao 
 * @Description:  users api 
 * @Date: 2016-12-23 14:35:17 
 * @Last Modified by: anytao
 * @Last Modified time: 2016-12-29 13:54:15
 */

'use strict';
import Base from './base.js';
export default class extends Base {

    /**
     * get repositories rank data
     */
    async listAction() {
        var pageCurrent = this.post('pageCurrent') || 1;
        var pageSize = this.post('pageSize') || 20;
        let users = await this.model('users')
            .page(pageCurrent, pageSize)
            .countSelect();
        this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
        this.header("Access-Control-Allow-Headers", "x-requested-with");
        return this.json(users);
    }
}