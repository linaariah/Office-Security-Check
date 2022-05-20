const util = require('../../utils/utils.js')
const db = wx.cloud.database()
const row=15
Page({ 

    /**
     * 页面的初始数据
     */
    data: {
       room:'',
       edata:"",
       sum:'',
       index:'',
       multiArray: [
         ['2021', '2022','2023','2024','2025'],
         ['01','02','03','04','05','06','07','08','09','10','11','12'],
      ],
       multiIndex: [0,0],
       list:'',
       i:'',
       j:'',
       page:0
    },

    bindMultiPickerChange: function (e) {
      let that = this
      console.log(e.detail.value)
       let tem = e.detail.value
      this.setData({
        multiIndex: tem
      })

      
      let tem1 = this.data.multiArray[0][tem[0]]+'/'+this.data.multiArray[1][tem[1]]
      console.log(tem1)
      let data = []
     db.collection("ar_sum")
      .orderBy('sum','desc')
       .where({
         edata:tem1
       })//根据条件查找
        .get({
          success: res =>{
            if(res.data==''){
              wx.showToast({
                icon: 'none',
                title: '无此月份数据，请重新选择',
                duration:2000,
              })
              console.log(that.data.multiIndex)
              that.setData({
                multiIndex:[that.data.i,that.data.j]
              })
            }else{

            
            console.log(res)
            that.setData({
              i:that.data.multiIndex[0],
              j:that.data.multiIndex[1],
              list: res.data, 
              sum:res.data[0].sum,
              room:res.data[0].room,

            })
            console.log(that.data.list) 
          }
          }
        })   
         //获取查找的结果             
    
    },
    // async getList() {
    //   //获取时间
    //   var that = this
    //   var k1 = 0,
    //     k2 = 0,
    //     k3 = 0,
    //     k4 = 0,
    //     k5 = 0,
    //     sum1 = 0
    //   var temp = {}
    //   var time1 = util.formatTime(new Date());
    //   time1 = time1.substring(0,7)
    //   this.setData({
    //     edata1:time1
    //   })
      
    //   //初始化指令
        
    
      // let {
      //   data
      // } = await db.collection("ar_sum")
      // .orderBy('sum','desc')
      //  .where({
      //    edata:that.data.edata1
      //  })//根据条件查找
      //   .get(    
      //   ) //获取查找的结果             
      // this.setData({
      //   list: data, 
      //   sum:data[0].sum,
      //   room:data[0].room,
      //   edata:that.data.edata1
    //   // })
      
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var time1 = util.formatTime(new Date());
      time1 = time1.substring(0,7)
       
      console.log(time1)
      let t11 = time1.substring(0,4)
      let t12 = time1.substring(5,7)
      console.log(t11)
      console.log(t12)
      let shuz = this.data.multiArray
      
      let i=0,j=0
      for(i=0;i<shuz[0].length;i++){
        if(shuz[0][i] == t11)
        break
      }
      for(j=0;i<shuz[1].length;j++){
        if(shuz[1][j] == t12)
        break
      }
      console.log(j)
      console.log(i)
      this.setData({
        multiIndex: [i,j],
        i:i,
        j:j
      })
       
      db.collection("ar_sum")
      .orderBy('sum','desc')
       .where({
         edata:time1
       })//根据条件查找
       .limit(row)
        .get({
          success: res =>{
            console.log(res)
            this.setData({
              list: res.data, 
              sum:res.data[0].sum,
              page:0,
              room:res.data[0].room,
            })
            console.log(that.data.list) 
          }
        })   
      // this.getList()
    },
    onReachBottom: function () {
      var time1 = util.formatTime(new Date());
      time1 = time1.substring(0,7)
      
           //翻下一页
           this.data.page++
           console.log('当前页数',this.data.page) 
           //获取当前页面的数据记录
           db.collection("ar_sum")
           .skip(row*this.data.page).orderBy('sum','desc').where({edata:time1,}).limit(row).get({
               success:res=>{
                   //获取原有数据记录
                   let old_data=this.data.list
                   //获取新数据记录
                   let new_data=res.data
                   console.log('新数据',res.data) 
                   //更新数据
                   this.setData({
                     list:old_data.concat(new_data)
                   })
                   console.log('全部数据',this.data.list) 
               }
           })
          
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
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
