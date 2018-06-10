const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    return this.json({
        msg:'hello world'
    })
  }
  
  /**
   * 接受支付宝异步通知结果
   */
  async receiveNotifyAction(){

    let payInfo = this.post();

    let alipayModel = think.model('sys_alipay_log', 'mysql');

    let result = alipayModel.add(payInfo);

    console.log(result)
    
    return 'success';
  }
};
