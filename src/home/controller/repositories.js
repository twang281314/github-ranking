'use strict';

import Base from './base.js';
import request from 'request';
import _ from 'lodash';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        //auto render template file index_index.html
        let lastUpdateTtime = await this.model("updateLog").where({
            updateType: 'repositories'
        }).max("updateTime");
        let repositories = await this.model("repositories").order('stargazers_count desc').select();
        this.assign('lastUpdateTtime', lastUpdateTtime);
        this.assign('items', repositories);
        this.assign('title', 'repositories ranking');
        return this.display();
    }

    /**
     * 同步数据至数据库
     */
    async updateAction() {

        //禁止 URL 访问该 Action
        if (!this.isCli()) {
            this.fail("only invoked in cli mode");
        }

        /**
         * get the ids
         */
        let repositoriyIdsArray = [];
        const repositoriyIds = await this.model("repositories").field('id').select();
        repositoriyIds.forEach(function (item) {
            repositoriyIdsArray.push(item.id);
        });

        const query = {
            page: 1,
            per_page: 100
        };
        const options = {
            url: '',
            headers: {
                'User-Agent': 'request'
            }
        };
        for (let i = 1; i <= 10; i++) {
            query.page = i;
            options.url = 'https://api.github.com/search/repositories?q=stars:>1000&per_page=' + query.per_page + '&page=' + query.page;
            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {

                    let items = JSON.parse(body).items;

                    items.forEach((item) => {
                        let repository = {};
                        repository.id = item.id;
                        repository.name = item.name;
                        repository.full_name = item.full_name;
                        repository.html_url = item.html_url;
                        repository.description = item.description;
                        repository.stargazers_count = item.stargazers_count;
                        repository.watchers_count = item.watchers_count;
                        repository.language = item.language;
                        repository.forks_count = item.forks_count;
                        if (_.includes(repositoriyIdsArray, repository.id)) {
                            this.model('repositories').update(repository);
                        } else {
                            this.model('repositories').add(repository)
                        }
                    });
                }

            });
        };

        this.model("updateLog").add({
            id: null,
            updateTime: think.datetime(),
            updateType: 'repositories',
            updateResult: 'success'
        });
        return this.json('true');
    }
}