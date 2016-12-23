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
        let repositories = await this.model('repositories')
            .page(pageCurrent, pageSize)
            .countSelect();
        return this.json(repositories);
    }
}