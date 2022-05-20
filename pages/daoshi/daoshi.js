const db = wx.cloud.database()
const util = require('../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aimage: '/images/touxiang.jpg',
    //use:{},
    name2: "C303",
    k1: "-1",
    k2: "-2",
    k3: "-3",
    k4: "-4",
    k5: "-5",
    sum1: "-10",
    hot_words: [],
    array1: ["扣分", "警告", "无"],
    edata: "2021/11/24 00:00:00",
    time1: "",
    sum1: "",
    room1:"",
    room2:"",
    room3:"",
    room4:""
    //name1:''
  },

  query(e) {
    var that = this
    var list = wx.getStorageSync('baoc'); //先存起来
    var list2 = []; //定义一个数组
    
    //循环去取数据
    for (var i = 0; i < list.length; i++) {
      var string = list[i].room;
      var tim = list[i].time;
      //查询json里的name是否包含搜索的关键词，如果有就把他装进list2数组
      if ((string.indexOf(e.detail.value) >= 0) || (tim.indexOf(e.detail.value) >= 0)) {
        list2.push(list[i]);
      }
    }
    //到这里list2就已经是你查出的数据
    //如果输入的关键词为空就加载list数据，不是空就加载list2数据
    if (e.detail.value == "") {
      //加载全部
      that.setData({
        hot_words: list,
        //text2:list.fileIDs
      })
    } else {
      that.setData({
        hot_words: list2,
        // text2:list.fileIDs
      })
    }
  },


  preview(event) {
    var that = this
    var id = event.currentTarget.dataset.id
    console.log(event)
    console.log('地址', event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    var data = that.data.hot_words
    var abc = []
    for (var i in data) {
      if (id == data[i]._id) {
        abc = data[i].fileIDs
      }
    }
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: abc // 需要预览的图片http链接列表
    })
  },
  preview1(event) {
    var that = this
    var id = event.currentTarget.dataset.id
    console.log(event)
    console.log('地址', event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    var data = that.data.hot_words
    var abc = []
    for (var i in data) {
      if (id == data[i]._id) {
        abc = data[i].fileIDs1
      }
    }
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: abc // 需要预览的图片http链接列表
    })
  },



  zhenggai: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.setStorageSync('idm', e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/fankui/fankui',

    })

  },
  pai: function () {
    wx.navigateTo({
      url: '/pages/paihang-room/paihang-room',

    })

  },

  login1: function (options) {
    wx.clearStorage();
    wx.reLaunch({
      url: '../login/login', //要跳转到的页面路径
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      edata: time.substring(0, 7)
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    // db.collection('ar_sum').where({
    //   room: getApp().globalData.userinfo.Account,
    //   edata: that.data.edata
    // }).get({
    //   success: res =>{
    //     console.log(res)
    //     console.log("成功")
    //     that.setData({
    //       sum1: res.data[0].sum,
    //     })

    //   },
    //   fail: res => {
    //     console.log(res)
    //     console.log("云函数调失败")
    //   }
    // })
    db.collection('daoshi').where({
      number: getApp().globalData.userinfo.Account
    }).get({
      success:res =>{
        console.log(res)
        console.log(res.data[0].room1)
        that.setData({
          room1:res.data[0].room1,
          room2:res.data[0].room2,
          room3:res.data[0].room3,
          room4:res.data[0].room4,
          name2:res.data[0].name
        })
        console.log(that.data.room1)
        console.log(that.data.room2)
        db.collection('jilu').orderBy('time', 'desc').where(db.command.or([
          {
            room: that.data.room1,
            time: db.command.gte(that.data.edata + "/01 00:00:00").and(db.command.lte(that.data.edata + "/31 00:00:00"))
          },
          {
            room: that.data.room2,
            time: db.command.gte(that.data.edata + "/01 00:00:00").and(db.command.lte(that.data.edata + "/31 00:00:00"))
          }

        ])).get({
          success: res => {
            console.log(res)
            console.log("成功")
    
            let temp = res.data
            wx.setStorageSync('baoc', temp)
            var summ = 0
            for (var i = 0; i < temp.length; i++) {
              summ += parseInt(temp[i].sum)
            }
    
            that.setData({
              hot_words: temp,
              sum1: summ
            })
    
    
          },
    
          fail: res => {
            console.log(res)
            console.log("云函数调失败")
          }
    
        })
    
      },
      fail: res => {
        console.log(res)
        console.log("失败")
      }
    })

   

    /* wx.cloud.callFunction({
       name:'get_record',
       success:res=>{
         console.log(res)
         console.log("云函数调用成功")
        that.setData({
          hot_words:res.result.data,
          //koufen1:Number(res.result.data[0].koufen1)
         
        })
        temp = that.data.hot_words
        console.log(temp[0].koufen1)
        console.log(temp.length)
        for(var i = 0;i<temp.length;i++){
          k1 += (temp[i].koufen1-12)
          k2 += (temp[i].koufen2-12)
          k3 += (temp[i].koufen3-12)
          k4 += (temp[i].koufen4-12)
        }
        sum1=k1+k2+k3+k4
        that.setData({
          k1:k1,
          k2:k2,
          k3:k3,
          k4:k4,
          sum1:sum1
        })      //console.log(that.data.koufen1)
       },
       fail:res=>{
         console.log(res)
         console.log("云函数调失败")
       }
     })*/



    /*let user= wx.getStorageSync('user')
    this.setData({
      name1:user.Account
    })*/
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})