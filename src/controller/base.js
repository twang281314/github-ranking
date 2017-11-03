module.exports = class extends think.Controller {
  __before() {

    if (this.isGet) {
      return true;
    }

    // const token = this.header();
    let systemToken = this.config('token');
    let token = this.header('token'); //获取 header
    if (systemToken == token) {

    } else {
      return this.success('非法请求');
    }
  }
};