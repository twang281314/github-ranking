var templateEditor = new function () {
    var _this = this;
    this.pw; //宽度
    this.ph; //高度
    this.div;
    this.editorHeight = 40 * 113 / 30;
    this.pageHeight = 0;
    this.pageWidth = 0;
    this.editorTop = 0;
    this._h = 113 / 30;
    this._w = 113 / 30;
    this.parent = null;
    this.itemList = null;
    this.currentItem = null;
    this.selectedItemList = []; //所有选中项目
    this.init = function (containerDiv, templateData) {
        _this.div = containerDiv;
        containerDiv.empty();
        _this.dw = _this.div.width;
        _this.dh = _this.div.height;
        var templateDiv = $(
            "<div style='border:1px solid #aaaaaa;background-color:#FFFFFF;position:relative;top:5px;left:210px;' tabindex='0'></div>"
        );

        containerDiv.append(templateDiv);
        _this.parent = templateDiv;
        _this.itemList = templateDataDetails;
        _this.createCommonPage(templateData);
        _this.createEditPage(_this.itemList);
    }
    this.createCommonPage = function (templateData) {
        var templateDiv = _this.parent;
        var pageWidth = templateData.pageWidth * _this._w;
        var pageHeight = templateData.pageHeight * _this._h;
        _this.pageHeight = pageHeight;
        _this.pageWidth = pageWidth;
        templateDiv.css('width', _this.pageWidth + "px");
        templateDiv.css('height', _this.pageHeight + "px");
        templateDiv.css('top', 5)
        templateDiv.css('box-shadow', '0 3px 3px 3px #dddddd');
        _this.refreshDom();
        dragResizeDiv.setEditorHeight(_this.pageHeight);
        _this.editorTop = 20
    };
    this.createEditPage = function (itemList) {
        var c = _this.parent;
        itemList.forEach(function (item) {
            _this.createEditor(c, item)
        });
    };
    this.createEditor = function (c, item) {
        if (item.itemDeleted == 1) {
            return
        }
        var itemName = item.itemName;
        var itemClass = item.itemClass;

        if (itemClass == itemClassList.Text || itemClass == itemClassList.PageNo) {
            var itemContent = item.itemContent;
            var k = false;
            if (item.readOnly == "true") {
                k = true
            }
            var e = _this.convertEditCss(item);
            var f = _this.convertFontCss(item);
            dragResizeDiv.createEditor(c, {
                id: item.itemName,
                content: itemContent,
                readOnly: k,
                style: e,
                fontStyle: f,
                dragCallback: function (left, top) {
                    item.itemLeft = left;
                    item.itemTop = top;
                    refreshEditorToolbarData(item);
                },
                resizeCallback: function (left, top, width, height) {
                    item.itemLeft = left;
                    item.itemTop = top;
                    item.itemWidth = width;
                    item.itemHeight = height;
                    refreshEditorToolbarData(item);
                    if (item.itemClass == itemClassList.BarCode && item.itemFontName != 'QRcode') {
                        addBarcodeItem(item, 'barcode');
                    }
                },
                selectCallback: function (n, o) {
                    _this.setCurrentItem(item);

                },
                contentCallback: function (content) {
                    item.itemContent = content;
                }
            })
        } else if (itemClass == itemClassList.Rect) {
            var style = _this.convertEditCss(item);
            dragResizeDiv.createRect(c, {
                id: item.itemName,
                style: style,
                dragCallback: function (left, top) {
                    item.itemLeft = left;
                    item.itemTop = top;
                    refreshEditorToolbarData(item);
                },
                resizeCallback: function (left, top, width, height) {
                    item.itemLeft = left;
                    item.itemTop = top;
                    item.itemWidth = width;
                    item.itemHeight = height;
                    refreshEditorToolbarData(item);
                },
                selectCallback: function (n, o) {
                    _this.setCurrentItem(item);

                },
            })
        } else if (itemClass == itemClassList.Ellipse) {

            var d = _this.convertEditCss(item);
            dragResizeDiv.createEllipse(c, {
                id: item.itemName,
                left: item.itemLeft,
                top: item.itemTop,
                width: item.itemWidth,
                height: item.itemHeight,
                lineWidth: item.itemPenWidth,
                color: item.itemFontColor,
                dragCallback: function (left, top) {
                    item.itemLeft = left;
                    item.itemTop = top;
                },
                resizeCallback: function (left, top, width, height) {
                    item.itemLeft = left;
                    item.itemTop = top;
                    item.itemWidth = width;
                    item.itemHeight = height;
                    refreshEditorToolbarData(item);
                },
                selectCallback: function (n, o) {

                }
            })

        } else if (itemClass == itemClassList.Htm) {

            var itemContent = item.itemContent;
            var style = _this.convertEditCss(item);
            var fontStyle = _this.convertFontCss(item);
            dragResizeDiv.createHtml(c, {
                id: item.itemName,
                content: itemContent,
                readOnly: false,
                style: style,
                fontStyle: fontStyle,
                dragCallback: function (left, top) {
                    item.itemLeft = left;
                    item.itemTop = top;
                    refreshEditorToolbarData(item);
                },
                resizeCallback: function (left, top, width, height) {
                    item.itemLeft = left;
                    item.itemTop = top;
                    item.itemWidth = width;
                    item.itemHeight = height;
                    refreshEditorToolbarData(item);
                },
                selectCallback: function (n, o) {
                    _this.setCurrentItem(item);

                },
                contentCallback: function (content) {
                    item.itemContent = content;
                }

            });

            //处理表格项目选中问题
            if (item.id) {
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

        } else if (itemClass == itemClassList.UpLine) {
            dragResizeDiv.createLine(c, item.itemWidth, item.itemTop, item.itemLeft, item.itemTop);
        } else if (itemClass == itemClassList.BarCode) {

            var itemContent = item.itemContent;
            var k = false;
            if (item.readOnly == "true") {
                k = true
            }
            var e = _this.convertEditCss(item);
            var f = _this.convertFontCss(item);
            dragResizeDiv.createEditor(c, {
                id: item.itemName,
                content: itemContent,
                readOnly: k,
                style: e,
                fontStyle: f,
                dragCallback: function (left, top) {
                    item.itemLeft = left;
                    item.itemTop = top;
                    refreshEditorToolbarData(item);
                },
                resizeCallback: function (left, top, width, height) {
                    item.itemLeft = left;
                    item.itemTop = top;
                    item.itemWidth = width;
                    item.itemHeight = height;
                    refreshEditorToolbarData(item);
                    if (item.itemClass == itemClassList.BarCode && item.itemFontName != 'QRcode') {
                        addBarcodeItem(item, 'barcode');
                    }
                },
                selectCallback: function (n, o) {
                    _this.setCurrentItem(item);

                },
                contentCallback: function (content) {
                    item.itemContent = content;
                }
            })
            //处理条码和二维码
            if (item.itemFontName == 'QRcode') { //二维码
                addBarcodeItem(item, 'qrcode');
            } else { //条形码
                addBarcodeItem(item, 'barcode');
            }
        } else if (itemClass == itemClassList.Image) {
            var url = item.itemContent;
            var style = _this.convertEditCss(item);
            dragResizeDiv.createImg(c, {
                id: item.itemName,
                src: url,
                style: style,
                dragCallback: function (left, top) {
                    item.itemLeft = left;
                    item.itemTop = top;
                    refreshEditorToolbarData(item);
                },
                resizeCallback: function (left, top, width, height) {
                    item.itemLeft = left;
                    item.itemTop = top;
                    item.itemWidth = width;
                    item.itemHeight = height;
                    refreshEditorToolbarData(item);
                },
                selectCallback: function (n, o) {
                    _this.setCurrentItem(item);

                }
            })
        }
    };
    this.refreshEditor = function (item) {
        var style = _this.convertEditCss(item);
        var fontStyle = _this.convertFontCss(item);
        dragResizeDiv.refreshEditor(item, style, fontStyle);
    };
    this.addEditor = function (itemName, itemCode, itemContent, itemCustomType, itemClass) {

        if (itemCustomType == itemCustomTypeList.variable) { //变量数据打印项
            var item = _this.insertItem(itemName, itemCode, itemCustomType, itemClassList.Text, itemTypeList.Normal, itemContent + ":$[data]", null, "false");
            _this.createEditor(_this.parent, item);

        } else if (itemCustomType == itemCustomTypeList.constant) { //自定义打印项

            if (itemClass == itemClassList.Text) { //文本项
                var item = _this.insertItem('__ic', null, itemCustomType, itemClass, itemTypeList.Normal, itemContent, null, false);
                _this.createEditor(_this.parent, item);
            } else if (itemClass == itemClassList.Rect) { //矩形
                var item = _this.insertItem('_ic', null, itemCustomType, itemClass, itemTypeList.Normal, null, false);
                _this.createEditor(_this.parent, item);
            } else if (itemClass == itemClassList.Image) { //图片
                var item = _this.insertItem('_ic', null, itemCustomType, itemClass, itemTypeList.Normal, itemContent, null, false);
                _this.createEditor(_this.parent, item);
            } else if (itemClass == itemClassList.PageNo) {//页数
                var item = _this.insertItem('_ic', null, itemCustomType, itemClassList.Text, itemTypeList.PageNo, itemContent, null, false);
                _this.createEditor(_this.parent, item);
            }
        } else if (itemCustomType == itemCustomTypeList.detail) { //明细表格

            var item = _this.insertItem(itemName, itemCode, itemCustomType, itemClassList.Htm, itemTypeList.Normal, itemContent, null, false, 200);
            _this.createEditor(_this.parent, item);
        }
    };
    this.removeEditor = function (itemName, itemCode, itemContent, itemCustomType) {
        var item = _this.queryItemByCode(itemCode);
        if (item != null) {
            var itemName = item.itemName;
            item.itemDeleted = 1;
            dragResizeDiv.remove(itemName);

        }

    };
    this.removeSelectEditor = function () {
        var item = _this.getCurrentItem();
        if (item != null) {
            var itemName = item.itemName;
            item.itemDeleted = 1;
            dragResizeDiv.remove(itemName);
            if (item.id) {

            } else { //没有保存到后端 需要从数组中删除
                templateEditor.itemList = templateEditor.itemList.filter(function (detail) {
                    return detail.itemName != item.itemName;
                });
            }
        }
    }
    this.insertItem = function (itemName, expression, itemCustomType, itemClass, itemType, itemContent, itemFontName, readOnly, itemTop, itemLeft) {
        var item = ({
            itemName: itemCustomType == itemCustomTypeList.detailLabel ? (itemName + "_label") : (itemName + _extend_sign.generate()),
            expression: expression,
            itemCode: expression,
            itemDeleted: 0,
            itemCustomType: itemCustomType,
            itemClass: itemClass,
            itemType: itemType,
            itemContent: itemContent,
            itemTop: itemTop ? itemTop.toFixed(5) : _this.editorTop.toFixed(5),
            itemLeft: itemLeft ? itemLeft.toFixed(5) : 20,
            itemWidth: 120,
            itemHeight: itemClass == itemClassList.Image || itemFontName == "qrcode" ? 120 : 30,
            itemFontName: (itemFontName != null && itemFontName != "") ? itemFontName : "宋体",
            itemFontColor: "#000000",
            itemFontSize: 9,
            itemPenWidth: 1,
            itemPenStyle: 0,
            itemUnderline: 0,
            itemAngle: 0,
            itemAlignment: 1,
            itemBold: 0,
            itemHorient: 0,
            itemVorient: 0,
            readOnly: readOnly
        });
        if (item.itemClass == itemClassList.Htm) {
            item.itemWidth = _this.pageWidth;
            item.itemHeight = 200;
            item.itemLeft = 0;
        }
        // item.id=0;
        _this.itemList.push(item);
        return item;
    };
    this.queryItemByCode = function (itemCode) {
        var b = null;
        _this.itemList.forEach(function (item) {
            if (item.itemDeleted == 0 && item.itemCode == itemCode) {
                b = item
            }
        });
        return b
    };
    this.refreshDom = function () {
        if (_this.div != null) {
            _this.dw = $('#editorDiv').width();
            var templateDivWidth = _this.parent.width();
            var subWidth = (_this.dw - templateDivWidth) / 2;
            if (subWidth < 0) {
                subWidth = 5;
            }
            _this.parent.css('left', subWidth);
        }
    };
    this.convertEditCss = function (item) {
        var style = '';
        var itemTop = item.itemTop;
        var itemLeft = item.itemLeft;
        var itemWidth = item.itemWidth;
        var itemHeight = item.itemHeight;
        var itemAngle = item.itemAngle;
        var itemType = item.itemType;
        style += "top:" + itemTop + "px;left:" + itemLeft + "px;width:" + itemWidth + "px;height:" +
            itemHeight + "px;tranform:rotate(" + itemAngle + "deg);";
        if (itemType == "1") {
            style += "background:#f0f0f0;";
        } else {
            style += "background:ffffff;";
        }

        //矩形线条处理
        if (item.itemClass == itemClassList.Rect) {
            style += "border-color:" + item.itemFontColor + ";";
            var itemPenWidth = item.itemPenWidth;
            if (Number(itemPenWidth) <= 0) {
                itemPenWidth = 1;
            }
            style += "border-width:" + itemPenWidth + "px;";
            var itemPenStyle = item.itemPenStyle;
            if (itemPenStyle == 0) {
                style += "border-style:solid;"
            } else if (itemPenStyle == 1) {
                style += "border-style:dashed;"
            } else if (itemPenStyle > 1) {
                style += "border-style:dotted;"
            }
        }
        return style;
    };
    this.convertFontCss = function (item) {
        var fontStyle = '';
        var itemBold = item.itemBold;
        if (itemBold == 0) {
            fontStyle += "font-weight:normal;";
        } else if (itemBold == 1) {
            fontStyle += "font-weight:bold;";
        }

        var itemAlignment = item.itemAlignment;
        if (itemAlignment == 1) {
            fontStyle += "text-align:left;";
        } else if (itemAlignment == 2) {
            fontStyle += "text-align:center;";
        } else if (itemAlignment == 3) {
            fontStyle += "text-align:right;";
        }

        var itemItalic = item.itemItalic;
        if (itemItalic == 1) {
            fontStyle += "font-style:italic;"
        } else {
            fontStyle += "font-style:normal;"
        }
        var itemUnderline = item.itemUnderline;
        if (itemUnderline == 1) {
            fontStyle += "text-decoration:underline;"
        } else {
            fontStyle += "text-decoration:none;"
        }
        fontStyle += 'color:' + item.itemFontColor + ';';
        fontStyle += 'font-size:' + item.itemFontSize + 'px;';
        fontStyle += 'font-family:' + item.itemFontName + ';';
        return fontStyle;
    };
    this.setCurrentItem = function (item) {
        _this.currentItem = item;
        // if(this.selectedItemListQuery(item.itemName)){
        //   this.selectedItemList.push(item.itenName,item);
        // }else{

        // }
        var itemName = item.itemName;
        refreshEditorToolbarData(item);
    }
    this.getCurrentItem = function () {
        return _this.currentItem;
    };
    this.selectedItemListQuery = function (itemName) {
        var selectedItem = this.selectedItemList;
        for (var i = 0; selectedItem; i++) {
            if (selectedItem[i].itenName == itenName) {
                return true;
            }
        }
        return false;
    }
}