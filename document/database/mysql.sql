CREATE TABLE `print_template` (
  `templateUid` varchar(50)  NOT NULL COMMENT '打印模板表主键',
  `templateName` varchar(200)  DEFAULT NULL COMMENT '打印模板名称',
  `templateType` varchar(20)  DEFAULT NULL COMMENT '打印模板类型(快递单、装箱单、发货单、拣选单、贺卡、发票等)',
  `pageWidth` decimal(10,0) DEFAULT NULL COMMENT '宽度(单位cm)',
  `pageHeight` decimal(10,0) DEFAULT NULL COMMENT '高度(单位cm)',
  `isDefault` int(11) DEFAULT NULL COMMENT '是否默认0否  1是',
  `orient` int(11) DEFAULT NULL COMMENT '打印方向 1:纵(正)向打印，固定纸张  2:横向打印，固定纸张  0:(或其它) 打印方向由操作者自行选择或按打印机缺省设置',
  `pageTop` decimal(10,0) DEFAULT NULL COMMENT '上偏移量',
  `pageLeft` decimal(10,0) DEFAULT NULL COMMENT '左偏移量',
  PRIMARY KEY (`templateUid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8



CREATE TABLE `print_template_detail` (
  `detailUid` varchar(32)  NOT NULL COMMENT '打印模板从表主键',
  `templateUid` varchar(32)  DEFAULT NULL COMMENT '关联打印模板主表',
  `itemType` int(1) DEFAULT NULL COMMENT '打印项的基本属性 0:普通项 1:页眉页脚 2:页号 3:页数项 4:多页码',
  `itemCustomType` int(1) DEFAULT NULL COMMENT '打印项类型 0:固定文本打印项 1:数据打印项 2:明细表格',
  `itemClass` int(1) DEFAULT NULL COMMENT '打印项对象类型 2普通文本 31矩形  32实心矩形 33椭圆 34实心椭圆 35直线 4html超文本 8图像 9条码',
  `itemName` varchar(32)  DEFAULT NULL COMMENT '打印项对象名称 (为保证能唯一识别打印项 该字段由前端按照规律动态生成一个唯一码)',
  `itemCode` varchar(32)  DEFAULT NULL COMMENT '打印项绑定的字段名称 对于数据打印项，对应于数据源字段名称,明细表格为固定值 detailTable 固定文本项和itemName一样',
  `itemTop` decimal(10,0) DEFAULT NULL COMMENT '上边距 打印项在纸张内的上边距，整数或字符型，整数时缺省长度单位为px',
  `itemLeft` decimal(10,0) DEFAULT NULL COMMENT '左边距 打印项在纸张内的左边距，整数或字符型，整数时缺省长度单位为px',
  `itemWidth` decimal(10,0) DEFAULT NULL COMMENT '打印区域的宽度，整数或字符型，整数时缺省长度单位为px',
  `itemHeight` decimal(10,0) DEFAULT NULL COMMENT '打印区域的高度，整数或字符型，整数时缺省长度单位为px',
  `itemFontName` varchar(10)  DEFAULT NULL COMMENT '字体 与操作系统字体名一致，缺省是“宋体”',
  `itemFontSize` double DEFAULT NULL COMMENT '字号 数值型 单位pt 缺省值9 可以为小数',
  `itemContent` varchar(1000)  DEFAULT NULL COMMENT '打印项内容 纯文本内容  itemCustomType=0时是打印内容 temCustomType=1时是打印项占位符 temCustomType=2时是明细表格html代码',
  `itemBold` int(1) DEFAULT NULL COMMENT '是否粗体    1代表粗体，0代表非粗体，缺省值是0',
  `itemItalic` int(1) DEFAULT NULL COMMENT '是否斜体    1代表斜体，0代表非斜体，缺省值是0',
  `itemUnderline` int(1) DEFAULT NULL COMMENT '是否下划线   1代表有下划线，0代表无下划线，缺省值是0',
  `itemAlignment` int(1) DEFAULT NULL COMMENT '对齐方式  1--左靠齐 2--居中 3--右靠齐，缺省值是1',
  `itemAngle` decimal(10,0) DEFAULT NULL COMMENT '打印项旋转角度  逆时针旋转角度数，单位是度，0度表示不旋转，旋转时以对象的左上角为原点',
  `itemPenWidth` int(1) DEFAULT NULL COMMENT '线条宽度 单位是(打印)像素，缺省值是1，非实线的线条宽也是0',
  `itemPenStyle` int(1) DEFAULT NULL COMMENT '线条风格 0:实线 1:破折线 2:点线 3:点划线 4:双点划线 缺省值是0',
  `readOnly` tinyint(1) DEFAULT NULL COMMENT '是否禁止修改',
  PRIMARY KEY (`detailUid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
