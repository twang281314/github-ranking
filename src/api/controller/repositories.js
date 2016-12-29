/**
 * @descrition repositories api
 * @author anytao
 * @created 2016-10-24
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
        var sortField = this.post('sortField') || 'stargazers_count'; //排序字段
        var sortOrder = this.post('sortOrder') || 'descend'; //ascend升序 descend降序
        sortOrder = (sortOrder == 'ascend' ? 'asc' : 'desc');
        let repositories = await this.model('repositories')
            .order(sortField+' '+sortOrder)
            .page(pageCurrent, pageSize)
            .countSelect();
        this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
        this.header("Access-Control-Allow-Headers", "x-requested-with");
        return this.json(repositories);
    }
}