const Base = require('./base.js');

module.exports = class extends Base {

    constructor(ctx) {
        super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
        this.lowcodeModel = this.model('lowcode_module');
    }
    async indexAction() {
        return this.json({
            msg: 'lowcode engine'
        })
    }

    /**
     * 保存设计好的页面
     */
    async saveAction() {
        let data = this.post();
        if (data.code) {
            let result = await this.lowcodeModel.where({
                code: data.code
            }).select()
            if (result.length > 0) {
                await this.lowcodeModel.where({
                    id: result[0].id
                }).update({
                    updated: think.datetime(),
                    name: data.name,
                    schema_json: data.schema_json,
                    packages_json: data.packages_json
                })
                return this.success('更新成功');
            } else {
                data.id = think.uuid()
                data.created = think.datetime()
                await this.lowcodeModel.add(data)
                return this.success('新增成功');
            }
        } else {
            return this.fail('缺少参数code')
        }
    }

    /**
     *  设计页面列表 
     * @returns 
     */
    async listAction() {
        let data = await this.lowcodeModel.select();
        return this.json(data)
    }


    /**
     * 根据id查询
     * @returns 
     */
    async getByIdAction() {
        let id = this.post('id')
        let data = await this.lowcodeModel.where({
            id: id
        }).select()
        return this.json(data)
    }

    /**
     * 根据code查询
     * @returns 
     */
    async getByCodeAction() {
        let code = this.post('code')
        let data = await this.lowcodeModel.where({
            id: code
        }).select()
        return this.json(data)
    }
};