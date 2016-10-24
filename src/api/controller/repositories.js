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

        let repositories = await this.model('repositories').select();
        return this.json(repositories);
    }
}