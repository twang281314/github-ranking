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
    let users = await this.model('users').order('followers desc').select();
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

    const githubConfig = this.config('github');
    const base64Header = new Buffer(githubConfig.userName + ':' + githubConfig.passWord).toString('base64');

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
        'User-Agent': 'request',
        'Authorization': 'Basic ' + base64Header
      }
    };
    for (let i = 1; i <= 10; i++) {
      query.page = i;
      options.url = 'https://api.github.com/search/repositories?q=stars:>1000&per_page=' + query.per_page + '&page=' + query.page;
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
            user.created_at = item.created_at;
            user.updated_at = item.updated_at;
            if (_.includes(userIdsArray, user.id)) {
              this.model('users').update(user)
            } else {
              user.followers = 0;
              this.model('users').add(user)
            }
          });
        };
      });
    }

    this.model("updateLog").add({
      id: null,
      updateTime: think.datetime(),
      updateType: 'users',
      updateResult: 'success'
    });

    return this.json("success");
  }

  /**
   * 同步各个用户信息
   */
  async updateuserAction() {

    const githubConfig = this.config('github');

    const base64Header = new Buffer(githubConfig.userName + ':' + githubConfig.passWord).toString('base64');

    const users = await this.model('users').limit(200).select();

    users.forEach((user) => {

      request.get(user.url, {
        'headers': {
          'User-Agent': 'request',
          'Authorization': 'Basic ' + base64Header
        }
      }, (error, response, body) => {

        if (error) {
          think.log(error);
        } else {
          let userResult = JSON.parse(body);
          user.followers = userResult.followers;
          user.name = userResult.name;
          user.company = userResult.company;
          user.blog = userResult.blog;
          user.location = userResult.location;
          user.created_at = userResult.created_at;

          this.model('users').update(user);

          // this.model('users').where({
          //   id: user.id
          // }).update({
          //   followers: user.followers,
          //   name: user.name,
          //   company: user.company,
          //   blog: user.blog,
          //   location: user.location,
          //   created_at: user.created_at

          // });

        }
      });
    });

    this.model("updateLog").add({
      id: null,
      updateTime: think.datetime(),
      updateType: 'users',
      updateResult: 'success'
    });

    return this.json("success");
  }
}