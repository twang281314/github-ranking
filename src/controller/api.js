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

    let out_trade_no = this.post('out_trade_no')
    let trade_no = this.post('trade_no')

    think.logger.info(this.ctx)
    think.logger.info(out_trade_no)
    think.logger.info(trade_no)

    return this.json({
        data:{
            out_trade_no:out_trade_no,
            trade_no:trade_no
        }
    })
    
  }
};
