var Page = function () {
  this.obj = [{
    "保质期临期预警(天)": "adventLifecycle",
    "商品标题": "title",
    "建议零售价": "defaultPrice",
    "高(cm)": "height",
    "商品描述": "Description",
    "保质期禁售(天)": "lockupLifecycle",
    "商品名称": "skuName",
    "商品简介": "brief",
    "宽(cm)": "width",
    "阿达": "asdz",
    "货号": "goodsNo",
    "商品条码": "skuNo",
    "商品品牌": "brand",
    "净容积(cm^3)": "netVolume",
    "是否保质期管理": "isShelfLifeMgmt",
    "是否串号管理": "isSNMgmt",
    "商品颜色": "color",
    "尺码": "size",
    "是否批次管理": "isBatchMgmt",
    "商品编号": "skuCode",
    "商品简称": "shortName",
    "毛重(g)": "grossWeight",
    "长(cm)": "length",
    "英文名称": "englishName",
    "净重(g)": "netWeight",
    "商品分类": "categoryId",
    "这里超过了": 1111.0,
    "保质期(天)": "expDate"
  }]
  // this.obj = [{
  //   "account": "sdfsafsa",
  //   "dkpz": "11",
  //   "filename": "12121212",
  //   "gjjxm": "afsfsf",
  //   "gjjzh": "fasffsda",
  //   "gjyh": "308",
  //   "hkje": null,
  //   "htbh": "faf",
  //   "jjxh": "sd",
  //   "jyje": 11111,
  //   "jyrq": "sds",
  //   "retcode": "9",
  //   "retmsg": null,
  //   "sqbh": "1234353453"
  // }]
  this.init()
}

$.extend(Page.prototype, {
  init: function () {
    this.attachEvents()
  },

  attachEvents: function () {
    $('#exportBtn').on('click', $.proxy(this.exportCallback, this))
    // $('#importBtn').on('click', $.proxy(this.importCallback, this))
    $('#fileSelector').on('change', $.proxy(this.importCallback, this))
  },

  exportCallback: function () {
    console.log('export')
    this.downloadExl(this.obj)
  },

  importCallback: function (e) {
    console.log(e)
    this.importf(e.target)
  },

  downloadExl: function (json, type) {
    var tmpdata = json[0];
    var self = this;
    console.log(json)
    json.unshift({});
    var keyMap = []; //获取keys
    for (var k in tmpdata) {
      keyMap.push(k);
      json[0][k] = k;
    }
    var tmpdata = []; //用来保存转换好的json
    // json.map(function (v, i) {
    //   keyMap.map(function (k, j) {
    //     $.extend({}, {
    //       v: v[k],
    //       position: (j > 25 ? self.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    //     })
    //   })
    // })
    json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
      v: v[k],
      position: (j > 25 ? self.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
      v: v.v
    });
    var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
    var tmpWB = {
      SheetNames: ['mySheet'], //保存的表标题
      Sheets: {
        'mySheet': Object.assign({},
          tmpdata, //内容
          {
            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
          })
      }
    };
    tmpDown = new Blob([self.s2ab(XLSX.write(tmpWB, {
        bookType: (type == undefined ? 'xlsx' : type),
        bookSST: false,
        type: 'binary'
      } //这里的数据是用来定义导出的格式类型
    ))], {
      type: ""
    }); //创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown); //创建对象超链接
    // document.getElementById("hf").href = href; //绑定a标签
    $('#hf').attr('href', href); //绑定a标签
    document.getElementById("hf").click(); //模拟点击实现下载
    // $('#hf').trigger('click'); //无法trigger click？
    setTimeout(function () { //延时释放
      URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);
  },

  s2ab: function (s) { //字符串转字符流
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  },
  // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
  getCharCol: function (n) {
    let temCol = '',
      s = '',
      m = 0
    while (n > 0) {
      m = n % 26 + 1
      s = String.fromCharCode(m + 64) + s
      n = (n - m) / 26
    }
    return s
  },

  //导入
  importf: function (obj) { //导入
    var wb; //读取完成的数据
    var rABS = false; //是否将文件读取为二进制字符串
    var self = this;
    if (!obj.files) {
      return;
    }
    var f = obj.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      if (rABS) {
        wb = XLSX.read(btoa(self.fixdata(data)), { //手动转化
          type: 'base64'
        });
      } else {
        wb = XLSX.read(data, {
          type: 'binary'
        });
      }
      //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
      //wb.Sheets[Sheet名]获取第一个Sheet的数据
      document.getElementById("demo").innerHTML = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
    };
    if (rABS) {
      reader.readAsArrayBuffer(f);
    } else {
      reader.readAsBinaryString(f);
    }
  },

  fixdata: function (data) { //文件流转BinaryString
    var o = "",
      l = 0,
      w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
  }

})