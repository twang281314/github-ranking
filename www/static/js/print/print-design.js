/**
 * 打印模板设计
 */
var itemNameLinked = '';
/*********************************
 * 打印项类别字典
 ********************************/
var itemClassList = {

    "Text": 2,
    "Rect": 31, //矩形
    "SolidRect": 32, //实心矩形
    "Ellipse": 33, //椭圆
    "SolidEllipse": 34, //实心椭圆
    "UpLine": 35, //斜上直线
    "DownLine": 36, //斜下直线
    "Htm": 4, //超文本
    "Image": 8, //图像
    "BarCode": 9, //条码
    "Chart": 10, //图表
    "PageNo": 51
};

/*********************************
 * 打印项类型
 ********************************/
var itemCustomTypeList = {

    "constant": 0, //固定文本打印项
    "variable": 1, //数据打印项
    "detail": 2, //明细表格
};

/*********************************
 * 打印项属性
 * ******************************/
var itemTypeList = {

    // 普通
    "Normal": 0,
    // 页眉页脚
    "PageHeaderOrFooter": 1,
    // 页号项
    "PageNo": 2,
    // 页数项
    "PageCount": 3,
    // 多页项
    "MultiPage": 4
};

/*********************************
 * 图形的类型
 ********************************/
var shapeTypeList = {

    "UpLine": 0, //-仰角直线
    "DownLine": 1, //俯角直线
    "Rect": 2, //-矩形框线
    "Ellipse": 3, //椭圆线
    "SolidRect": 4, //实心矩形
    "SolidEllipse": 5 //实心椭圆
};

/** 打印项属性映射： js对象属性-LODOP属性 */
var _item_style = {

    "itemType": "ItemPageType", // @see itemTypeList
    "itemClass": "ItemClass", // LODOP定义的打印项类别
    "itemTop": "ItemTop", // 打印项上边距
    "itemLeft": "Itemleft", // 打印项左边距
    "itemWidth": "ItemWidth", // 打印项宽度
    "itemHeight": "ItemHeight", // 打印项高度
    "itemFontColor": "ItemColor", // 字符（线条等）颜色
    "itemFontName": "ItemFontName", // 字体名称（或条形码类型）
    "itemFontSize": "ItemFontSize", // 字符大小
    "itemBold": "Itembold", // 是否粗体
    "itemItalic": "ItemItalic", // 是否斜体
    "itemUnderline": "ItemUnderline", // 是否下划线
    "itemAlignment": "ItemAlign", // 对齐方式
    "itemAngle": "ItemAngle", // 旋转角度
    //"itemHorient" : "ItemHorient", // 水平锁定方式
    //"itemVorient" : "ItemVorient", // 垂直锁定方式
    "itemReadOnly": "ItemReadOnly", // 纯文本内容在打印维护时，是否禁止修改
    "itemPreviewOnly": "ItemPreviewOnly",
    "itemPenWidth": "ItemPenWidth", // 线条宽度
    "itemPenStyle": "ItemPenStyle" // 线条风格
};

var _extend_sign = new function () {
    var base = Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 365 * 30) / 1000); // 默认去除2000年之前的时间，去除毫秒级别参数，缩短长度
    this.generate = function () {
        return ((++base).toString(16)); // 转换为16进制，缩短长度
    };
};

/**
 * 打印设计
 * @param template
 * @returns
 */
function print_design(template) {

}
/**
 * 处理打印内容（由于打印控件会将转义字符转为字符串形式的\，所以需要将包含转义字符的特殊字符替换掉）
 * @param itemContent
 * @returns
 */
function generateItemContent(itemContent) {
    if (!itemContent) return "";
    if (itemContent.indexOf("\\") > -1) {
        itemContent = itemContent.replace(/\\b/g, "\b").replace(/\\f/g, "\f").replace(/\\n/g, "\n").replace(/\\r/g, "\r")
            .replace(/\\t/g, "\t").replace(/\\'/g, "\'").replace(/\\"/g, "\"").replace(/\\\\/g, "\\");
    }
    if (itemContent.indexOf("script") > -1) {

        itemContent = itemContent.replace(/^<script.*script>/, '');
    }
    return itemContent;
}

/*********************************
 * 打印项基本方法
 *********************************/
var _item = new function () {

    //获得程序代码、打印项属性等数据值V
    this.get = function (alias, prop) {
        return LODOP.GET_VALUE(prop, alias);
    };

    //设置打印项风格A,继承SET_PRINT_STYLE的所有属性
    this.set = function (alias, prop, value) {
        LODOP.SET_PRINT_STYLEA(alias, prop, value);
    };

    this.name = function (index, name) {
        if (!index && index !== 0) return null;
        if (name) this.set(index, "ItemName", name);
        return this.get(index, "ItemName");
    };

    this.content = function (alias, content) {
        if (!alias && alias != 0) return null;
        if (content) this.set(alias, "Content", content);
        return this.get(alias, "ItemContent");
    };

    this.del = function (alias) {
        if (!alias && alias != 0) return false;
        this.set(alias, "Deleted", true);
    };

    this.exist = function (alias) {
        if (!alias && alias != 0) return false;
        return this.get(alias, "ItemExist");
    };

    //增加打印项
    /**
     * @param  {any} alias 打印项唯一编码
     * @param  {any} itemClass 打印项类别
     * @param  {any} top     上边距
     * @param  {any} left    左边距
     * @param  {any} width   宽度
     * @param  {any} height  高度
     * @param  {any} content 内容
     * @param  {any} color 颜色
     * @param  {any} fontFamily
     * @param  {any} penWidth 线条宽度
     * @param  {any} penStyle 线条风格
     */
    this.add = function (alias, itemClass, top, left, width, height, content, color, fontFamily, penWidth, penStyle) {

        if (itemClass == itemClassList.Text) { // 插入文本项
            LODOP.ADD_PRINT_TEXTA(alias, top, left, width, height, content);
        } else if (itemClass == itemClassList.Rect) { // 矩形
            LODOP.ADD_PRINT_SHAPE(shapeTypeList.Rect, top, left, width, height, penStyle, penWidth, color);
        } else if (itemClass == itemClassList.Ellipse) { // 椭圆
            LODOP.ADD_PRINT_SHAPE(shapeTypeList.Ellipse, top, left, width, height, penStyle, penWidth, color);
        } else if (itemClass == itemClassList.UpLine || itemClass == itemClassList.DownLine) { // 直线
            LODOP.ADD_PRINT_SHAPE(shapeTypeList.DownLine, top, left, width, height, penStyle, penWidth, color);
        } else if (itemClass == itemClassList.BarCode) { // 条形码
            if (fontFamily) {
                LODOP.ADD_PRINT_BARCODE(top, left, width, height, fontFamily, content);
                _item.set(0, "QRCodeVersion", 3);
            }
        } else if (itemClass == itemClassList.Image) { // 图片
            LODOP.ADD_PRINT_IMAGE(top, left, width, height, "<img src='" + content + "'/>");
            _item.set(0, "Stretch", 2);
        } else if (itemClass == itemClassList.Htm) { // Html
            LODOP.ADD_PRINT_TABLE(top, left, width, height, content);
            LODOP.SET_PRINT_STYLEA(0, "TableHeightScope", 1);
            LODOP.SET_PRINT_STYLEA(0, "ItemName", alias);
        } else alert('无法识别的打印项');

        // if (alias) this.name(0, alias);

    };
};

/********************************
 * 按照模板添加打印项
 ********************************/
function addPrintItem(tempDetail, setStyle) {

    var itemName = tempDetail.itemName;
    var itemContent = tempDetail.itemContent;
    _item.add(itemName, tempDetail.itemClass, tempDetail.itemTop, tempDetail.itemLeft, tempDetail.itemWidth,
        tempDetail.itemHeight, itemContent, tempDetail.itemFontColor, tempDetail.itemFontName, tempDetail.itemPenWidth,
        tempDetail.itemPenStyle);

    //表格项
    if (tempDetail.itemCustomType == itemCustomTypeList.detail) {
        return true;
    }

    if (tempDetail.itemType == 1) {
        LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1);
        LODOP.SET_PRINT_STYLEA(0, "LinkedItem", itemNameLinked);
    } else if (tempDetail.itemType == 2) {
        LODOP.SET_PRINT_STYLEA(0, 'ItemType', 2);
        LODOP.SET_PRINT_STYLEA(0, "LinkedItem", itemNameLinked);
    }

    //    _item.set(itemName, "ItemType", tempDetail.itemType); // 必设属性-打印项类型
    //_item.set(itemName, "ReadOnly", tempDetail.itemOnlyRead); // 必设属性-是否只读

    var itemFontSize = tempDetail.itemFontSize;
    var itemFontName = tempDetail.itemFontName;
    var itemFontColor = tempDetail.itemFontColor; // 打印项字符（线条等）颜色
    var itemBold = tempDetail.itemBold;
    var itemAlignment = tempDetail.itemAlignment;
    var itemItalic = tempDetail.itemItalic;
    var itemUnderline = tempDetail.itemUnderLine;
    var itemAngle = tempDetail.itemAngle;

    if (itemFontSize) _item.set(itemName, "FontSize", itemFontSize);
    if (itemFontName) _item.set(itemName, "FontName", itemFontName);
    if (itemFontColor) _item.set(itemName, "FontColor", itemFontColor);
    if (itemBold) _item.set(itemName, "Bold", itemBold);
    if (itemAlignment) _item.set(itemName, "Alignment", itemAlignment);
    if (itemItalic) _item.set(itemName, "Italic", itemItalic);
    if (itemUnderline) _item.set(itemName, "Underline", itemUnderline);
    if (itemAngle) _item.set(itemName, "Angle", itemAngle);
}

/*********************************
 * 添加变量打印项
 ********************************/
function addVariableItem(id, checked) {
    templateEditor.addEditor(d, f, e, c)
}

/*********************************
 * 添加自定义打印项
 * @param itemClass
 * @param itemContent
 *********************************/
function addCustomItem(itemClass, itemContent) {

    var item = {};

    item.templateDetailId = "0";
    item.isDeleted = 0;
    item.itemType = itemTypeList.Normal; //普通打印项
    item.itemCustomType = itemCustomTypeList.constant;
    item.itemClass = itemClass;
    item.itemName = "_unique_name_" + _extend_sign.generate(); //生成对象唯一名称
    item.itemCode = item.itemName;
    item.itemContent = itemContent;
    item.itemTop = 20;
    item.itemLeft = 20;
    item.itemWidth = 100;
    item.itemHeight = 60;
    item.itemReadOnly = 0;

    if (itemClass == itemClassList.Text) {
        item.itemHeight = 50;
        item.itemContent = '可编辑文本';
    } else if (itemClass == itemClassList.Rect || itemClass == itemClassList.Ellipse ||
        itemClass == itemClassList.UpLine || itemClass == itemClassList.DownLine) { // 矩形、椭圆、直线
        item.itemPenStyle = 0; //线条风格
        item.itemPenWidth = 1; //线条宽度
        if (itemClass == itemClassList.UpLine) item.itemHeight = 1;
        if (itemClass == itemClassList.DownLine) item.itemWidth = 1;
    } else if (itemClass == itemClassList.BarCode || itemClass == itemClassList.Image) { // 条形码、图片
        if (itemClass == itemClassList.BarCode) item.itemFontName = "Code39";
        else item.itemContent = itemContent;
    }

    templateDetail.push(item);

    addPrintItem(item);
}

/*********************************
 * 打印设置按钮
 *********************************/
function printSetting() {
    handleLodopDisplay('hide');
    $('#printSettingModal').modal('show');
}

/*********************************
 * 打印设置确定按钮
 *********************************/
function confirmEditDialog() {

    $('#printSettingModal').modal('hide');
}

/*********************************
 * 打印设置取消按钮
 *********************************/
function closeEditDialog() {

    $('#printSettingModal').modal({
        backdrop: "false"
    });

    $('#printSettingModal').modal('hide');
}

/*****************************
 * 删除设计区域选中的打印项
 ****************************/
function deleteSelectedItem() {

    for (var i = 1; _item.exist(i); i++) { // 遍历选中项
        var itemName = _item.name(i); // 打印项别名（一般为字段名称
        if (LODOP.GET_VALUE("ItemSelected", i) && itemName) {
            //将打印项在templateDetail数组中标记isDeleted为1
            $.each(templateDetail, function (i, item) {
                if (item.itemName == itemName) {
                    item.isDeleted = 1;

                    //处理右边的选择问题
                    if (item.itemCustomType == itemCustomTypeList.variable) {
                        $('#' + item.itemCode).prop('checked', false);
                    } else if (item.itemCustomType == itemCustomTypeList.detail) {
                        $('.detail').each(function () {
                            $(this).prop("checked", false);
                            $('#itemTable').html('<thead><tr></tr></thread><tbody><tr></tr></tbody>');
                        });
                    }
                    return false;
                }
            });
        }
    }
    _item.del("Selected"); // 删除设计区域选中的打印项
}

/**********************************************
 * 保存模板按钮
 *********************************************/
function saveTemplate() {

}

/*****************************
 * 打印预览
 *****************************/
function printPreview() {

}

/*****************************
 * 明细表格设置按钮
 *****************************/
function editTableDetails() {

    $('.detailItem').remove();

    var detailTitle = '<div class="text-right line-height30 col-md-4 detailItem">' +
        '<span class="color-8c">name:</span></div>';

    var detailWidth = '<div class="col-md-4 text-center pad0L detailItem">' +
        '<input type="text" id="detailId" value="detailWidthValue"></div>';

    var detailSum = '<div class="col-md-4 text-center pad3T detailItem">' +
        '<div class="checkbox c-checkbox ">' +
        '<label>' +
        '<input id="sum_detailId" type="checkbox"  checked />' +
        '<span class="fa fa-check"></span></label>' +
        ' </div>' +
        ' </div>'

    //首先隐藏lodop
    handleLodopDisplay('hide');

    $("#itemTable thead tr td").each(function () {

        var detail = $(this);

        $('#detailTableSetting').append(
            detailTitle.replace('name', detail.text()) +
            detailWidth.replace('detailId', detail.prop('id')).replace('detailWidthValue', detail.prop('width')) +
            detailSum.replace('detailId', detail.prop('id'))
                .replace('checked', $("#itemTable tfoot tr td#" + detail.prop('id')).text() == '合计' ? 'checked' : '')
        );
    });

    $('#detailTableModal').modal('show');
}

/*****************************
 * 明细表格设置确定按钮
 *****************************/
function confirmEditTableDetails() {
    var tableColumnsOrder = $('#itemTableSet').bootstrapTable('getData');
    tableBoxVue.tableColumnsOrder = tableColumnsOrder;
    tableBoxVue.$emit('updateTable');
    $('#detailTableModal').modal('hide');
}

/*********************************
 * 明细表格设置取消按钮
 *********************************/
function closeEditTableDetails() {

    $('#detailTableModal').modal({
        backdrop: "false"
    });

    $('#detailTableModal').modal('hide');
}

/**
 * 创建预览及打印用打印页（使用数据填充）
 * @param template 模板数据
 * @param datas 实际数据[{main:{},detail:[]}]
 * @param isPreview 是否预览
 */
function createPrintPage(template, datas, isPreview) {
    var isPreview = isPreview || false;
    var templateDataDetailsTemp = JSON.parse(JSON.stringify(template.detail)); //模板明细信息
    var printData = datas;

    var pageWidth = parseInt(template.pageWidth) * 10;
    var pageHeight = parseInt(template.pageHeight) * 10;
    LODOP.SET_LICENSES("","A3D70044525FD6F0FC184C75B9C7D44B","C94CEE276DB2187AE6B65D56B3FC2848","");
    printData.forEach(function (data, i) {
        LODOP.PRINT_INITA(template.pageTop, template.pageLeft, pageWidth, pageHeight, '单据打印-' + Math.random() * 1000)
        LODOP.SET_PRINT_PAGESIZE(1, pageWidth, pageHeight, "");
        data.main.printTime = new Date().Format("yyyy-MM-dd HH:mm:ss"); //打印时间
        LODOP.NEWPAGEA();
        templateDataDetailsTemp = JSON.parse(JSON.stringify(template.detail)); //模板明细信息

        //为保证其他项目能关联上表格 需要先处理表格
        var templateDataDetailTable = templateDataDetailsTemp.filter(function (detailTemp) {
            return detailTemp.itemCustomType == itemCustomTypeList.detail;
        });
        var item = templateDataDetailTable[0];
        if (item && item.itemClass == itemClassList.Htm) {
            item.itemName = item.itemName + '-' + i;
            itemNameLinked = item.itemName;
            var detailTableThbodyTemplate = '';
            var detailTableThead = $(item.itemContent).find('thead');
            var detailTableTbody = $(item.itemContent).find('tbody');
            var detailTableTfoot = $(item.itemContent).find('tfoot');

            detailTableTbody.find('tr td').each(function (index, tbodyTrTdItem) {
                detailTableThbodyTemplate += tbodyTrTdItem.outerHTML.replace('$[data]',
                    '$' + tbodyTrTdItem.id);
            });
            var detailTableThbodyData = '';

            data.detail.forEach(function (dataDetail, index) {
                dataDetail.serialNum = index + 1;
                var detailTableThbodyTemplateTemp = detailTableThbodyTemplate;
                for (var dataDetailAttr in dataDetail) {
                    detailTableThbodyTemplateTemp = detailTableThbodyTemplateTemp.replace(
                        '$' + dataDetailAttr, dataDetail[dataDetailAttr])
                }
                detailTableThbodyData += '<tr>' + detailTableThbodyTemplateTemp +
                    '</tr>';
            });

            item.itemContent =
                '<style>table,tbody td,tbody th,thead td,thead th{border:1px solid #000;border-style:solid;border-collapse:collapse}tfoot td{border-top:1px solid #000}tr{text-align:center}table{width:100%}.sumTdClass{border:1px solid #000}</style>';
            item.itemContent += '<table>' + detailTableThead[0].outerHTML;
            item.itemContent += '<tbody>' + detailTableThbodyData + '</tbody>'

            item.itemContent += detailTableTfoot[0].outerHTML.replace(/\$/g, '#') + '</table>';
            addPrintItem(item);
        }

        $.each(templateDataDetailsTemp, function (i, item) {
            if (item.itemDeleted == 1) {
                return;
            }
            if (item.itemCustomType == itemCustomTypeList.variable) {

                if (item.itemClass == itemClassList.Text) {
                    item.itemContent = item.itemContent.replace('$[data]', data.main[item.itemCode] != undefined ? data.main[item.itemCode] : '')
                } else if (item.itemClass == itemClassList.PageNo) {
                    item.itemClass = itemClassList.Text;
                    item.itemType = itemTypeList.PageNo
                } else if (item.itemClass == itemClassList.BarCode) {
                    item.itemContent = data.main[item.itemCode];
                }
            } else if (item.itemCustomType == itemCustomTypeList.detail) {
                return;
            }
            addPrintItem(item);
        });

        if (!isPreview) {
            LODOP.PRINTA();
        }
        //LODOP.PREVIEW()
    })
    if (isPreview) {
        LODOP.PREVIEW(); //数据替换完毕 打印预览
        //LODOP.PRINT_DESIGN()
    }
}


/**
 * 插入图片时输入图片url
 */
function confirmCreateImgItem() {
    var imgSrc = $('#customImgItemSrc').val();
    templateEditor.addEditor(null, null, imgSrc, itemCustomTypeList.constant, itemClassList.Image);
    $('#imgUrlInputModal').modal('hide');
}

/**
 * 取消输入图片弹出框
 */
function closeCreateImgItem() {

    $('#imgUrlInputModal').modal('hide');

}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 时间戳转时间
 */
function timestampToDateTime(timestamp) {
    if (timestamp) {
        return new Date(parseInt(timestamp) * 1000).Format("yyyy-MM-dd HH:mm:ss");
    }
}

function splitSkuValues(skuValues) {
    if (skuValues.indexOf('#') < 0) {
        return skuValues;
    }
    var skuValuesSplited = [];
    skuValues.split('|').forEach(function (item) {
        skuValuesSplited.push(item.split('#')[1])
    });

    return skuValuesSplited.join(' ')
}