'use strict';

import Base from './base.js';
import phantom from 'phantom';

module.exports = class extends Base {
    async indexAction() {
        await this.display();
    }
    /**
     * 新增打印模板
     */
    async addAction() {

        let template = this.post('template');
        let templateDetail = this.post('templateDetail');

        let templateJson = null;
        let templateDetailJSON = null;

        const templateModel = this.model('print_template', 'mysql');
        const templateDetailModel = this.model('print_template_detail', 'mysql');

        //处理主表
        if (template) {
            templateJson = JSON.parse(template);
            const templateUid = templateJson.templateUid;

            //update
            if (templateUid) {
                templateJson.gmt_updated = think.datetime();
                let affectedRows = await templateModel.where("templateUid='" + templateUid + "'").update(templateJson);
                //add 
            } else {
                templateJson.templateUid = think.uuid();
                templateJson.gmt_created = think.datetime();
                const result = await templateModel.add(templateJson);
            }
        }

        // //处理从表
        if (templateDetail) {
            templateDetailJSON = JSON.parse(templateDetail);

            for (let i = 0, len = templateDetailJSON.length; i < len; i++) {
                let detail = templateDetailJSON[i];
                detail.templateUid = templateJson.templateUid;
                think.logger.info(detail);
                if (detail.id) {
                    templateDetailModel.where("id='" + detail.id + "'").update(detail);
                } else {
                    detail.id = think.uuid();
                    templateDetailModel.add(detail);
                }
            }
        }
        return this.success({
            templateUid: templateJson.templateUid
        });
    }

    /**
     * 获取打印模板信息
     * param templateUid
     */
    async getAction() {

        const templateUid = this.post('templateUid');
        let result = {};
        let template = {};
        template.detail = [];
        let templateDetail = [];

        if (templateUid) {
            const templateModel = this.model('print_template', 'mysql');
            const templateDetailModel = this.model('print_template_detail', 'mysql');
            template = await templateModel.where("templateUid='" + templateUid + "'").limit(1).select();
            templateDetail = await templateDetailModel.where("templateUid='" + templateUid + "' and itemDeleted=0").select();
            template = template[0];
        }

        result.detail = templateDetail;
        result.template = template
        return this.success(result);
    }

    /**
     * 生成lodop图片
     */
    async getLodopImageAction() {

        (async function () {
            const instance = await phantom.create();
            const page = await instance.createPage();
            await page.on('onResourceRequested', function (requestData) {
                console.info('Requesting', requestData.url);
            });

            const status = await page.open('http://127.0.0.1:8360/print');
            const content = await page.property('content');
            console.log(status);


            await page.evaluate(function () {
                demoPrint(true);
                return document.getElementById('itopform').innerHTML;
            }).then(function (html) {
                console.log(html);
            });
            // await page.evaluateJavaScript('function(){demoPrint(true);}').then(function(html){
            //     console.log(html);
            // });
            await instance.exit();
        })();
    }
};