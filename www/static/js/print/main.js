/**
 * Created by anytao on 2017/11/8.
 */

var printItemChoseData = {};

$.ajax({
    url: getPrintItemChoseUrl,
    type: "get",
    dataType: "json",
    async: false,
    success: function (data) {
        printItemChoseData = data.filter(function (item) {
            return item.type == templateType;
        })[0];
    }
});

var tableBoxVue = new Vue({
    el: ".side-panel",
    data: {
        tableColumnsOrder: [], //控制表格顺序
        printItemTableData: printItemChoseData.items, //明细打印项目
        printItemData: printItemChoseData.main, //主体打印项目
        printItemMainTitle: printItemChoseData.title
    },
    created: function () {
        this.$on("updateTable", function () {
            this.$nextTick(function () {
                var printItem = templateEditor.queryItemByCode("detailTable");
                printItem.itemContent = $("#tableBox").html();
                $("#" + printItem.itemName + " .content").html(printItem.itemContent);

            });
        });
    },
    methods: {
        printItemTableChoseFromVue: function (item) {
            var printItem = templateEditor.queryItemByCode("detailTable");
            item.isChose = !item.isChose;
            //不存在表格项需要新增表格打印项
            if (!printItem) {
                templateEditor.addEditor("detailTable", "detailTable", "", itemCustomTypeList.detail, itemClassList.Htm);
                printItem = templateEditor.queryItemByCode("detailTable")
            }
            if (item.isChose) {
                this.tableColumnsOrder.push(item);
            } else {
                this.tableColumnsOrder = this.tableColumnsOrder.filter(function (obj) {
                    return obj.id != item.id;
                })
            }

            this.$nextTick(function () {
                printItem.itemContent = $("#tableBox").html();
                $("#" + printItem.itemName + " .content").html(printItem.itemContent);
                templateEditor.refreshEditor(printItem);
            });
            return false;
        },
        printItemChoseFromVue: function (item) {
            item.isChose = !item.isChose;
            if (item.isChose) {
                templateEditor.addEditor(item.id, item.id, item.name, 1);
            } else {
                templateEditor.removeEditor(item.id, item.id, item.name, 1);
            }
        }
    },
    computed: {
        printItemTableDataChose: function () {
            return this.tableColumnsOrder;
        }
    }
});

function refreshEditorPage() {
    $.ajax({
        url: getTemplateDataUrl,
        headers: {
            token: "681466C53CB33AE98E16627CB6276789"
        },
        type: "post",
        data: {
            templateUid: templateUid
        },
        success: function (data) {
            templateDataDetails = data.data.detail;
            templateData = data.data.template;
            initPrintItemChose();
            templateEditor.init($("#editorDiv"), templateData);
        }
    });
}

refreshEditorPage();


$(".editor #boldBtn").bind("click", function () {
    var isHover = $(this).hasClass("editor-button-hover");
    var item = templateEditor.getCurrentItem();
    if (isHover) {
        item.itemBold = 0;
        $(this).removeClass("editor-button-hover");
    } else {
        item.itemBold = 1;
        $(this).addClass("editor-button-hover");
    }
    templateEditor.refreshEditor(item);
})

$(".editor #italicBtn").bind("click", function () {
    var isHover = $(this).hasClass("editor-button-hover");
    var item = templateEditor.getCurrentItem();
    if (isHover) {
        item.itemItalic = 0;
        $(this).removeClass("editor-button-hover");
    } else {
        item.itemItalic = 1;
        $(this).addClass("editor-button-hover");
    }
    templateEditor.refreshEditor(item);
})
//下划线
$(".editor #underlineBtn").bind("click", function () {
    var isHover = $(this).hasClass("editor-button-hover");
    var item = templateEditor.getCurrentItem();
    if (isHover) {
        item.itemUnderline = 0;
        $(this).removeClass("editor-button-hover");
    } else {
        item.itemUnderline = 1;
        $(this).addClass("editor-button-hover");
    }
    templateEditor.refreshEditor(item);
})
//文字对齐方式
$(".editor .alignMent").bind("click", function () {
    $(".editor .alignMent").removeClass("editor-button-hover");
    $(this).addClass("editor-button-hover");
    var item = templateEditor.getCurrentItem();
    var id = $(this).attr("id");
    if (id == "alignLeftBtn") {
        item.itemAlignment = 1;
    } else if (id == "alignCenterBtn") {
        item.itemAlignment = 2;
    } else if (id == "alignRightBtn") {
        item.itemAlignment = 3;
    }
    templateEditor.refreshEditor(item);
});
//字体类型
$(".editor #fontNameBtn").bind("change", function () {
    var item = templateEditor.getCurrentItem();
    item.itemFontName = $(this).val();
    templateEditor.refreshEditor(item);
});
//字体颜色
$(".editor #fontColorBtn").bind("change", function () {
    var item = templateEditor.getCurrentItem();
    item.itemFontColor = $(this).val();
    templateEditor.refreshEditor(item);
});
//字体大小
$(".editor #fontSizeBtn").bind("change", function () {
    var item = templateEditor.getCurrentItem();
    item.itemFontSize = $(this).val();
    templateEditor.refreshEditor(item);
});
//上边距
$(".editor #topBtn").bind("change", function () {
    var item = templateEditor.getCurrentItem();
    item.itemTop = $(this).val();
    templateEditor.refreshEditor(item);
});
//左边居
$(".editor #leftBtn").bind("change", function () {
    var item = templateEditor.getCurrentItem();
    item.itemLeft = $(this).val();
    templateEditor.refreshEditor(item);
});
//宽度
$(".editor #widthBtn").bind("change", function () {
    var item = templateEditor.getCurrentItem();
    item.itemWidth = $(this).val();
    templateEditor.refreshEditor(item);
});
//高度
$(".editor #heightBtn").bind("change", function () {
    var item = templateEditor.getCurrentItem();
    item.itemHeight = $(this).val();
    templateEditor.refreshEditor(item);
});

/**
 * 刷新工具栏
 */
function refreshEditorToolbarData(item) {
    if (item) {

        if (item.itemBold == 1) {
            $(".editor #boldBtn").addClass("editor-button-hover");
        } else {
            $(".editor #boldBtn").removeClass("editor-button-hover");
        }

        if (item.itemItalic == 1) {
            $(".editor #italicBtn").addClass("editor-button-hover");
        } else {
            $(".editor #italicBtn").removeClass("editor-button-hover");
        }

        if (item.itemUnderline == 1) {
            $(".editor #underlineBtn").addClass("editor-button-hover");
        } else {
            $(".editor #underlineBtn").removeClass("editor-button-hover");
        }

        if (item.itemUnderline == 1) {
            $(".editor #underlineBtn").addClass("editor-button-hover");
        } else {
            $(".editor #underlineBtn").removeClass("editor-button-hover");
        }

        $(".editor input,select").removeAttr("disabled");
        $(".editor #topBtn").val(item.itemTop);
        $(".editor #leftBtn").val(item.itemLeft);
        $(".editor #fontNameBtn").val(item.itemFontName);
        $(".editor #fontSizeBtn").val(item.itemFontSize);
        $(".editor #widthBtn").val(item.itemWidth);
        $(".editor #heightBtn").val(item.itemHeight);
        $(".editor #fontColorBtn").val(item.itemFontColor);
        $(".editor .pageMode").find("input[type=checkbox]").prop("checked", false);
        if (item.itemType == 1) {
            $(".editor #pageHeader input").prop("checked", true);
        }
    } else {
        $(".editor input,select").attr("disabled", "disabled");
        $(".editor-button").removeClass("editor-button-hover");
    }
}

refreshEditorToolbarData();

$(".editor .move").bind("click", function () {
    var item = templateEditor.getCurrentItem();
    var moveType = $(this).attr("id");
    if (moveType == "rightMoveBtn") {
        item.itemLeft = Number(item.itemLeft) + 1;
        console.log(moveType);
    } else if (moveType == "leftMoveBtn") {
        item.itemLeft = Number(item.itemLeft) - 1;
    } else if (moveType == "upMoveBtn") {
        item.itemTop = Number(item.itemTop) - 1;
    } else if (moveType == "downMoveBtn") {
        item.itemTop = Number(item.itemTop) + 1;
    }
    templateEditor.refreshEditor(item);
});


/**
 * 条码和二维码处理
 */
$(".itemClassChange").bind("click", function () {
    var item = templateEditor.getCurrentItem();
    var $item = $("#" + item.itemName + " .content");
    console.log(item);
    var btnType = $(this).attr("id");
    if (btnType == "text") {
        $("#" + item.itemName).remove();
        item.itemClass = itemClassList.Text;
        templateEditor.createEditor(templateEditor.parent, item);

    } else if (btnType == "barcode") {
        addBarcodeItem(item, 'barcode');
    } else if (btnType == "qrcode") {
        addBarcodeItem(item, 'qrcode');
    }
    templateEditor.refreshEditor(item);
});

/**
 * 处理二维码和条形码打印项
 * @param {} item
 */
function addBarcodeItem(item, type) {

    var $item = $("#" + item.itemName + " .content");

    if (type == 'barcode') {
        if (item.itemCustomType == itemCustomTypeList.constant) {
            $item.html("<canvas  class='barcode'  jsbarcode-value='" + item.itemContent + "' jsbarcode-format='CODE128'" +
                " style='width:" +
                item.itemWidth + "px;height:" + item.itemHeight +
                "px;' </canvas >");

        } else {
            $item.html("<canvas  class='barcode'  jsbarcode-value='" + "0123456789" + "' jsbarcode-format='CODE128'" +
                " style='width:" +
                item.itemWidth + "px;height:" + item.itemHeight +
                "px;' </canvas >");
        }
        item.itemClass = itemClassList.BarCode;
        item.itemFontName = "128Auto";
        JsBarcode(".barcode").init();

    } else {
        $item.html("");
        item.itemClass = itemClassList.BarCode;
        item.itemFontName = "QRcode";
        new QRCode($item[0], "这是二维码打印项");
    }
}

/**
 * 矩形线条类型
 */
$(".rectLineType").bind("click", function () {

    $(".editor .rectLineType").removeClass("editor-button-hover");
    $(this).addClass("editor-button-hover");
    var item = templateEditor.getCurrentItem();
    var id = $(this).attr("id");
    if (id == "solidBtn") {
        item.itemPenStyle = 0;
    } else if (id == "dashedBtn") {
        item.itemPenStyle = 1;
    } else if (id == "dottedBtn") {
        item.itemPenStyle = 2;
    }
    templateEditor.refreshEditor(item);
});

/**
 * 表格设置
 */
$("#tableBtn").bind("click", function () {
    var $itemTableSet =
        $("#itemTableSet");
    var data = [];
    data = tableBoxVue.printItemTableDataChose;


    $itemTableSet.bootstrapTable({
        data: data
    });
    $itemTableSet.bootstrapTable("load", data);

    $("#detailTableModal").modal("show");
})

/**
 * 页眉页脚
 */
$(".editor .pageMode").bind("click", function () {
    var item = templateEditor.getCurrentItem();
    item.itemType = $(this).find("input").prop("checked") ? 1 : 0;
    templateEditor.refreshEditor(item);
});


/**
 * 自定义打印项
 */
$(".addCustomItem").bind("click", function () {
    var customType = $(this).attr("id");
    if (customType == "addCustomItemTextBtn") {
        templateEditor.addEditor(null, null, "自定义文本", itemCustomTypeList.constant, itemClassList.Text);
    } else if (customType == "addCustomItemRectBtn") {
        templateEditor.addEditor(null, null, "", itemCustomTypeList.constant, itemClassList.Rect);
    } else if (customType == "addCustomItemImgBtn") {
        $("#imgUrlInputModal").modal("show");
    } else if (customType == "addCustomItemPageNoBtn") {
        templateEditor.addEditor(null, null, "第#页/共&页", itemCustomTypeList.constant, itemClassList.PageNo);
    }
});
/**
 * 保存模板信息
 */
$("#saveBtn").bind("click", function () {
    templateData.pageHeight = $("#pageHeight").val();
    templateData.pageWidth = $("#pageWidth").val();
    templateDataDetails = templateEditor.itemList;
    $.ajax({
        url: updateTemplateDataUrl,
        type: "post",
        headers: {
            token: "681466C53CB33AE98E16627CB6276789"
        },
        data: {
            template: JSON.stringify(templateData),
            templateDetail: JSON.stringify(templateDataDetails)
        },
        success: function (data) {
            if (data.status == 'success') {
                refreshEditorPage();
                hintsk({
                    typea: "1",//1：成功  2：消息  3：错误  4：警告
                    hintval: data.message//内容文字
                })
            } else {
                //重定向
                if (data.indexOf('window.location.href="/loginPage.htm"') > 0) {
                    window.location.href = "/loginPage.htm";
                    return;
                }
                hintsk({
                    typea: "3",//1：成功  2：消息  3：错误  4：警告
                    hintval: data.message//内容文字
                })
            }
        }
    });
    return false;
});

/**
 * 删除选中
 */
$("#deleteBtn").bind("click", function () {
    templateEditor.removeSelectEditor();
});

/**
 * 复制选中
 */
$("#copyBtn").bind('click', function () {

    var item = templateEditor.getCurrentItem();
    var itemBak = {};
    if (item && item.itemCustomType != itemCustomTypeList.detail) {
        itemBak = $.extend(true, {}, item);
        itemBak.itemName = itemBak.itemName + 'copy' + _extend_sign.generate();
        delete itemBak.id;
        itemBak.itemHeight = 30;
        itemBak.itemLeft = Number(itemBak.itemLeft) + 150;
        templateDataDetails.push(itemBak);
        templateEditor.init($("#editorDiv"), templateData);
    }
});

/***
 * 初始化 打印项勾选
 */
function initPrintItemChose() {
    templateDataDetails.forEach(function (item) {
        if (item.itemDeleted == 0) {
            if (item.itemCustomType == itemCustomTypeList.variable) {
                tableBoxVue.printItemData.forEach(function (printItem) {
                    if (printItem.id == item.itemCode) {
                        printItem.isChose = true;
                        return;
                    }
                })
            } else if (item.itemCustomType == itemCustomTypeList.detail) {

                //处理明细勾选问题
                var columns = [];
                var $detailTable = $(item.itemContent).find('thead tr td').each(function () {
                    columns.push({
                        id: $(this).attr('id'),
                        width: $(this).attr('width')
                    });
                });
                tableBoxVue.printItemTableData.forEach(function (printItem) {
                    var column = columns.filter(function (columnItem) {
                        return printItem.id == columnItem.id;
                    });
                    if (column && column.length > 0) {
                        printItem.isChose = true;
                        printItem.width = column[0].width;
                    }
                });

                tableBoxVue.tableColumnsOrder = tableBoxVue.printItemTableData.filter(function (printItemTableDataItem) {
                    return printItemTableDataItem.isChose;
                });
            }
        }
    })
}

/**
 * 预览
 */
$("#saveAndPreviewBtn").bind("click", function () {

    templateDataDetails = templateEditor.itemList;
    var templateDataDetailsTemp = JSON.parse(JSON.stringify(templateDataDetails));
    var printData = [];
    $.ajax({
        url: getPrintDataUrl,
        type: "get",
        async: false,
        dataType: "json",
        success: function (result) {
            if (templateType == 'orderDeliver') {
                result.object.forEach(function (obj) {
                    obj.orderDeliverInfoDto.makeTime = timestampToDateTime(obj.orderDeliverInfoDto.makeTime);
                    obj.orderDeliverInfoDto.customerAddress = obj.orderDeliverInfoDto.provinceName + obj.orderDeliverInfoDto.cityName + obj.orderDeliverInfoDto.areaName + obj.orderDeliverInfoDto.address;
                    printData.push({
                        main: obj.orderDeliverInfoDto,
                        detail: obj.orderDeliverGoodsDto
                    })
                });
            } else if (templateType == 'storageAllot') {

                if (result.object.allocateType == 0) {
                    result.object.allocateType = '正品调拨';
                } else {
                    result.object.allocateType = '次品调拨';
                }

                if (result.object.allocateWay == 0) {
                    result.object.allocateWay = '普通调拨';
                } else {
                    result.object.allocateWay = '快速调拨';
                }

                result.object.details.forEach(function (item) {
                    item.totalAmount = item.num * item.costPrice;
                    item.skuValues = splitSkuValues(item.skuValues);
                })

                printData.push({
                    main: result.object,
                    detail: result.object.details
                })
            } else if (templateType == 'aftermarketStorage') { //售后入库单
                result.object.storageDetails.forEach(function (item) {
                    item.skuValues = splitSkuValues(item.skuValues);
                })
                printData.push({
                    main: result.object.storage,
                    detail: result.object.storageDetails
                })
            } else if (templateType == 'arrivalStorage') { //采购入库单

                result.object.forEach(function (obj) {
                    obj.details.forEach(function (detail) {
                        detail.skuValues = splitSkuValues(detail.skuValues);
                    });
                    obj.arrivalStorageDto.gmtCreated = timestampToDateTime(obj.arrivalStorageDto.gmtCreated);
                    printData.push({
                        main: obj.arrivalStorageDto,
                        detail: obj.details
                    })
                })
            } else if (templateType == 'saleOrder') {//销售订单
                if (result.object.makeTime) {
                    result.object.makeTime = timestampToDateTime(result.object.makeTime);
                }
                result.object.orderGoods.forEach(function (item) {
                    item.sellingAmount = (Number(item.sellingPrice) * Number(item.num)).toFixed(2);
                    item.finalAmount = (Number(item.finalPrice) * Number(item.num)).toFixed(2);
                });
                printData.push({
                    main: result.object,
                    detail: result.object.orderGoods
                })
            }
        }
    });
    var templateDataTemp = templateData;
    templateData.detail = templateDataDetailsTemp;
    createPrintPage(templateDataTemp, printData, true);
    return false;
});