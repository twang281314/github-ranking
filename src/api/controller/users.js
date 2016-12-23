/*
 * @Author: anytao 
 * @Description:  users api 
 * @Date: 2016-12-23 14:35:17 
 * @Last Modified by: anytao
 * @Last Modified time: 2016-12-23 14:35:40
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
        return this.json(users);
    }
}