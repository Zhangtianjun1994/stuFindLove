// pages/uploadToCOS/uploadToCOS.js

//index.js
var COS = require('../../utils/cos-wx-sdk-v5')
var config = require('./config')
var cosUrl = "https://gxtdlm-1258532084.cos.ap-beijing.myqcloud.com/"
var cos = new COS({
  getAuthorization: function (params, callback) { //获取签名 必填参数

    console.log("method is " + params.Method + " and Key is " + params.Key)

    // 方法一（推荐）服务器提供计算签名的接口
    var SIGN_SERVER_URL = 'https://localhost/cos/getSignateForImage'
    wx.request({
      url: SIGN_SERVER_URL,
      data: {
        "method": params.Method,
        "key": "/"
      },
      method: 'GET',
      dataType: 'json',
      success: function (result) {
        //console.log("auth is " + result.data)
        var result = result.data;
        console.log("authri is "+result.data)
        callback(result.data);
      }
    });
  }

  /**
         // 方法二（适用于前端调试）
         var authorization = COS.getAuthorization({
             SecretId: config.SecretId,
             SecretKey: config.SecretKey,
             Method: params.Method,
             Key: params.Key
         });
         callback(authorization);
     }
      */
});

var requestCallback = function (err, data) {
  console.log(err || data);
  if (err && err.error) {
    wx.showModal({
      title: '返回错误',
      content: '请求失败：' + err.error.Message + '；状态码：' + err.statusCode,
      showCancel: false
    });
  } else if (err) {
    wx.showModal({
      title: '请求出错',
      content: '请求出错：' + err + '；状态码：' + err.statusCode,
      showCancel: false
    });
  } else {
    wx.showToast({
      title: '请求成功',
      icon: 'success',
      duration: 3000
    });
  }
};

var option = {
  data: {
    list: [],
  },
};

option.simpleUpload = function () {
  // 选择文件
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      var filePath = res.tempFilePaths[0]
      console.log("本地文件路径：" + filePath)
      var Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
      console.log("文件名是 " + Key)
      var afterUrl = Key;
      //这里是保存在数据库中的文件路径
      console.log("图片在服务器的路径是：" + cosUrl + afterUrl)

      cos.postObject({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: Key,
        FilePath: filePath,
        onProgress: function (info) {
          console.log(JSON.stringify(info));
        }
      }, requestCallback);
    }
  })
};
Page(option);
