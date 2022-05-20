// pages/room/room.js
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
        array1:["扣分","警告","无"],
        edata: "2021/11/24 00:00:00",
        time1: "",
        sum1:""
        //name1:''
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
        this.setData({
          name2: getApp().globalData.userinfo.Account
        })
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

            db.collection('jilu').orderBy('time', 'desc').where({
              room: getApp().globalData.userinfo.Account,
              time: db.command.gte(that.data.edata+"/01 00:00:00").and(db.command.lte(that.data.edata+"/31 00:00:00"))
            }).get({
              success: res => {
                console.log(res)
                console.log("成功")
                
                let temp = res.data
                var summ = 0
                for (var i = 0; i < temp.length; i++){
                  summ += parseInt(temp[i].sum)
                }
                
                // for (var i = 0; i < temp.length; i++) {
                //   if (temp[i].k11 == 2) {
                //     temp[i].k11 = "无"
                //   } else if (temp[i].k11 == 1) {
                //     temp[i].k11 = "警告"
                //   } else {
                //     temp[i].k11 = "扣分"
                //   }
                // }
        
                // for (var i = 0; i < temp.length; i++) {
                //   if (temp[i].k12 == 2) {
                //     temp[i].k12 = "无"
                //   } else if (temp[i].k12 == 1) {
                //     temp[i].k12 = "警告"
                //   } else {
                //     temp[i].k12 = "扣分"
                //   }
                // }
        
                // for (var i = 0; i < temp.length; i++) {
                //   if (temp[i].k13 == 2) {
                //     temp[i].k13 = "无"
                //   } else if (temp[i].k13 == 1) {
                //     temp[i].k13 = "警告"
                //   } else {
                //     temp[i].k13 = "扣分"
                //   }
                // }
        
                // for (var i = 0; i < temp.length; i++) {
                //   if (temp[i].k14 == 2) {
                //     temp[i].k14 = "无"
                //   } else if (temp[i].k14 == 1) {
                //     temp[i].k14 = "警告"
                //   } else {
                //     temp[i].k14 = "扣分"
                //   }
                // }
        
                // for (var i = 0; i < temp.length; i++) {
                //   if (temp[i].k15 == 2) {
                //     temp[i].k15 = "无"
                //   } else if (temp[i].k15 == 1) {
                //     temp[i].k15 = "警告"
                //   } else {
                //     temp[i].k15 = "扣分"
                //   }
                // }
        
                // for (var i = 0; i < temp.length; i++) {
                //   if (temp[i].k16 == 2) {
                //     temp[i].k16 = "无"
                //   } else if (temp[i].k16 == 1) {
                //     temp[i].k16 = "警告"
                //   } else {
                //     temp[i].k16 = "扣分"
                //   }
                // }
        
                // for (var i = 0; i < temp.length; i++) {
                //   if (temp[i].k21 == 2) {
                //     temp[i].k21 = "无"
                //   } else if (temp[i].k21 == 1) {
                //     temp[i].k21 = "警告"
                //   } else {
                //     temp[i].k21 = "扣分"
                //   }
                // }
        
                // for (var i = 0; i < temp.length; i++) {
                //   if (temp[i].k22 == 2) {
                //     temp[i].k22 = "无"
                //   } else if (temp[i].k22 == 1) {
                //     temp[i].k22 = "警告"
                //   } else {
                //     temp[i].k22 = "扣分"
                //   }
                // }
        
                // for (var i = 0; i < temp.length; i++) {
                //   if (temp[i].k23 == 2) {
                //     temp[i].k23 = "无"
                //   } else if (temp[i].k23 == 1) {
                //     temp[i].k23 = "警告"
                //   } else {
                //     temp[i].k23 = "扣分"
                //   }
                // }
        
                // for (var i = 0; i < temp.length; i++) {
                //   if (temp[i].k24 == 2) {
                //     temp[i].k24 = "无"
                //   } else if (temp[i].k24 == 1) {
                //     temp[i].k24 = "警告"
                //   } else {
                //     temp[i].k24 = "扣分"
                //   }
                // }
        
                // for (var i = 0; i < temp.length; i++) {
                //   if (temp[i].k31 == 2) {
                //     temp[i].k31 = "无"
                //   } else if (temp[i].k31 == 1) {
                //     temp[i].k31 = "警告"
                //   } else {
                //     temp[i].k31 = "扣分"
                //   }
                // }
                // for (var i = 0; i < temp.length; i++) {
                //   if (temp[i].k32 == 2) {
                //     temp[i].k32 = "无"
                //   } else if (temp[i].k32 == 1) {
                //     temp[i].k32 = "警告"
                //   } else {
                //     temp[i].k32 = "扣分"
                //   }
                // }
        
                // for (var i = 0; i < temp.length; i++) {
                //   if (temp[i].k33 == 2) {
                //     temp[i].k33 = "无"
                //   } else if (temp[i].k33 == 1) {
                //     temp[i].k33 = "警告"
                //   } else {
                //     temp[i].k33 = "扣分"
                //   }
                // }
        
                // for (var i = 0; i < temp.length; i++) {
                //   if (temp[i].k41 == 2) {
                //     temp[i].k41 = "无"
                //   } else if (temp[i].k41 == 1) {
                //     temp[i].k41 = "警告"
                //   } else {
                //     temp[i].k41 = "扣分"
                //   }
                // }
        
                // for (var i = 0; i < temp.length; i++) {
                //   if (temp[i].k42 == 2) {
                //     temp[i].k42 = "无"
                //   } else if (temp[i].k42 == 1) {
                //     temp[i].k42 = "警告"
                //   } else {
                //     temp[i].k42 = "扣分"
                //   }
                // }
                that.setData({
                  hot_words: temp,
                  sum1 : summ
                })
               
            
                    },
  
                    fail: res => {
                      console.log(res)
                      console.log("云函数调失败")
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