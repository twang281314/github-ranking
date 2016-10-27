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
    let users = await this.model('users').select();
    let lastUpdateTtime = await this.model("updateLog").where({
      updateType: 'users'
    }).max("updateTime");
    this.assign('lastUpdateTtime', lastUpdateTtime);
    this.assign('items', users);
    this.assign('title', 'users ranking');
    return this.display();
  }

  /**
   * 同步用户数据
   */
  async updateAction() {

    /**
     * get the ids
     */
    let userIdsArray = [];
    const userIds = await this.model("users").field('id').select();
    userIds.forEach(function (item) {
      userIdsArray.push(item.id);
    });

    const query = {
      page: 1,
      per_page: 100
    };
    const options = {
      url: 'https://api.github.com/search/users?q=followers:>0&page=' + query.page + '&per_page=' + query.per_page,
      headers: {
        'User-Agent': 'request'
      }
    };

    request(options, (error, response, body) => {

      if (!error && response.statusCode == 200) {
        let items = JSON.parse(body).items;
        items.forEach((item) => {
          let user = {};
          user.id = item.id;
          user.login = item.login;
          user.avatar_url = item.avatar_url;
          user.url = item.url;
          user.html_url = item.html_url;
          user.name = item.name;
          user.company = item.company;
          user.blog = item.blog;
          user.location = item.location;
          user.email = item.email;
          user.public_repos = item.public_repos;
          user.followers = item.followers;
          user.following = item.following;
          user.created_at = item.created_at;
          user.updated_at = item.updated_at;
          if (_.includes(userIdsArray, user.id)) {
            this.model('users').update(user)
          } else {
            this.model('users').add(user)
          }
        });
      };
    });

    return this.json("success");
  }

  /**
   * 同步各个用户信息
   */
  async updateuserAction() {

    const users = await this.model('users').select();

    users.forEach((user) => {

      request({
        url: user.url,
        headers: {
          'User-Agent': 'request'
        }
      }, (error, response, body) => {
        if (error) {
          think.log(error);
        } else {
          think.log(response);
        }
        console.log(response);
      });
    });
  }
}