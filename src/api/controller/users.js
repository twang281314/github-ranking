/*
 * @Author: anytao 
 * @Description:  users api 
 * @Date: 2016-12-23 14:35:17 
 * @Last Modified by: anytao
 * @Last Modified time: 2016-12-29 14:43:22
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
        var sortField = this.post('sortField') || 'followers'; //排序字段
        var sortOrder = this.post('sortOrder') || 'descend'; //ascend升序 descend降序
        sortOrder = (sortOrder == 'ascend' ? 'asc' : 'desc');
        let users = await this.model('users')
            .order(sortField + ' ' + sortOrder)
            .page(pageCurrent, pageSize)
            .countSelect();
        this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
        this.header("Access-Control-Allow-Headers", "x-requested-with");
        return this.json(users);
    }
}