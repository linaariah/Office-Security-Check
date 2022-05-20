// pages/room1/room1.js
const db = wx.cloud.database()
const util = require('../../utils/utils.js')
const row =20
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name1: "小明",
    problem1: "1.1",
    problem2: "1.2",
    problem3: "1.3",
    problem4: "1.4",
    abc: "",
    hot_words: [
    ],
    array1:["扣分","警告","无"],
    edata:"",
    page:0,
    list3:''
  },

  //删除数据

  shanc(event) {
    var that = this
    var id = event.currentTarget.dataset.id
    var room = event.currentTarget.dataset.room
    var sum1 = event.currentTarget.dataset.sum
    var data = that.data.hot_words
    console.log(event)
    console.log(data)
    console.log(id)
    console.log(room)
    console.log(sum1)
    for (var i in data) {
      if (id == data[i]._id) {
        wx.showModal({
          title:'提示',
          content:'确认删除这条记录吗',
          success: res=>{
            if(res.confirm){
               let temp = 0
               let idd = 0
              db.collection('ar_sum').where({
                room:room,
                edata:that.data.edata
              }).get({
                success: res =>{
                  temp = res.data[0].sum
                  idd = res.data[0]._id
                  console.log(res.data)
                  console.log(temp)
                  console.log(idd)
                  temp -= sum1
                  console.log(temp)
                  db.collection('ar_sum').doc(idd).update({
                    data:{
                      sum : temp
                    }
                   
                  })
                }
              }) 
            
             
              db.collection('jilu').doc(id).remove({
                success: res => {
                 
                  wx.showToast({
                    title: '删除成功',
                  })
                },
                  fail: err => {
                    wx.showToast({
                      icon: 'none',
                      title: '删除失败',
                    })
                    console.error('[数据库] [删除记录] 失败：', err)
                  }
                
                
               
         
              })
              that.onShow()
            
            //   wx.reLaunch({
            //     url: '../room1/room1', //要跳转到的页面路径
            //  })

            }else if(res.cancel)
            {
              console.log('用户点击取消')
            }
          }
        })
       
      }
    }
    // wx.reLaunch({
    //   url: '../room1/room1', //要跳转到的页面路径
    // })
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
  //触底加载数据
  scrollBottom(e){
    var that = this
    let tem = that.data.list3
    console.log(12)
    console.log(852)
    this.data.page++
    console.log('当前页数',this.data.page) 
    //获取当前页面的数据记录
    if(tem != ''){
      db.collection("jilu")
      .skip(row*this.data.page).orderBy('time','desc').where(
        db.command.or([
        {
        room:tem},
        {
          time:tem
        }
      ])
      ).limit(row).get({
          success:res=>{
              //获取原有数据记录
              let old_data=this.data.hot_words
              //获取新数据记录
              let new_data=res.data           
              console.log('新数据',res.data)            
              //更新数据
              this.setData({
                hot_words:old_data.concat(new_data)
              })  
              console.log('全部数据',this.data.hot_words) 
          }
          
      })
    }else{
      db.collection("jilu")
      .skip(row*this.data.page).orderBy('time','desc').where({}).limit(row).get({
          success:res=>{
              //获取原有数据记录
              let old_data=this.data.hot_words
              //获取新数据记录
              let new_data=res.data           
              console.log('新数据',res.data)            
              //更新数据
              this.setData({
                hot_words:old_data.concat(new_data)
              })  
              console.log('全部数据',this.data.hot_words) 
          }
          
      })
    }
  
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
  query1(e) {
    var that = this
    var list = wx.getStorageSync('baoc'); //先存起来
    var list2 = e.detail.value; //定义一个数组
    that.setData({
      list3:list2
    })

    //到这里list2就已经是你查出的数据
    //如果输入的关键词为空就加载list数据，不是空就加载list2数据
    if (list2 == "") {
      //加载全部
      that.setData({
        hot_words: list,
        //text2:list.fileIDs
      })
    } else {
      db.collection('jilu').orderBy('time', 'desc').where(db.command.or([
        {
        room:list2},
        {
          time:list2
        }
      ])).get({
        success: res => {
          console.log(res)
          console.log("成功")
          let temp = res.data
          that.setData({
            hot_words: temp,
          })      
        },
        fail: res => {
          console.log(res)
          console.log("云函数调失败")
        }
  
      })
    }
  },
//下拉刷新

onPullDownRefresh: function(){
   //在当前页面显示导航条加载动画
   var that = this
  wx.showNavigationBarLoading(); 
   //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
   wx.showLoading({
     title: '刷新中...',
   })
   console.log('11')

   
   wx.reLaunch({
     url: '../room1/room1',
     success:function(res){
       // 隐藏导航栏加载框
       wx.hideNavigationBarLoading();
       // 停止下拉动作
       wx.stopPullDownRefresh();
     
     },
     fail:function(err){
       console.log(err)
     }
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
      name1: getApp().globalData.userinfo.Account
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

    db.collection('jilu').orderBy('time', 'desc').where({}).limit(row).get({
      success: res => {
        console.log(res)
        console.log("成功")
        let temp = res.data
        wx.setStorageSync('baoc', temp)
        that.setData({
          hot_words: temp,
          page:0
        })      
      },
      fail: res => {
        console.log(res)
        console.log("云函数调失败")
      }

    })
    /* wx.cloud.callFunction({
       name: 'jcy_room',
       success: res => {
         console.log(res)
         console.log("云函数调用成功")
         that.setData({
           hot_words: res.result.data
         })
       },
       fail: res => {
         console.log(res)
         console.log("云函数调失败")
       }
     })*/


  },
  //上拉加载更多数据
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