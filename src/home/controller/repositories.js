'use strict';

import Base from './base.js';
import request from 'request';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        //auto render template file index_index.html

        let repositories = await this.model("repositories").select();
        this.assign('items', repositories);
        this.assign('title', 'repositories ranking');
        return this.display();
    }
 
    /**
     * 同步数据至数据库
     */
    async updateAction() {

        const options = {
            url: 'https://api.github.com/search/repositories?q=stars:>1000&page=1&per_page=1000',
            headers: {
                'User-Agent': 'request'
            }
        };
        // request(options, (error, response, body) => {
        //     if (!error && response.statusCode == 200) {

        //         let items = JSON.parse(body).items;
        //         // let repositoriesArray = [];
        //         // items.forEach((item) => {
        //         //     let repository = {};
        //         //     repository.id = item.id;
        //         //     repository.name = item.name;
        //         //     repository.full_name = item.full_name;
        //         //     repository.html_url = item.html_url;
        //         //     repository.description = item.description;
        //         //     repository.stargazers_count = item.stargazers_count;
        //         //     repository.watchers_count = item.watchers_count;
        //         //     repository.language = item.language;
        //         //     repository.forks_count = item.forks_count;
        //         //     this.model('repositories').thenAdd(repository, {
        //         //         id: repository.id
        //         //     });
        //         // });
        //         // this.model('repositories').addMany(repositoriesArray);
        //         this.assign('items', JSON.parse(body).items);
        //         this.assign('title', 'repositories ranking');
        //     }
        //     return this.display();
        // });
    }
}