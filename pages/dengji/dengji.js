const db = wx.cloud.database()
const user = db.collection('user')
const util = require('../../utils/utils.js')

Page({
    data: {
    list: [],
    getroom: '',
    details: '',
    user: '',
    name1: '',
    time: '',
    imgbox: [], //选择图片
    fileIDs: [], //上传云存储后的返回值
    number:0,
    array: ["扣分", "警告", "无"],
    array1: ["无违规", "有违规", "请选择有无违规"],
    ind:2,
    index11: 2,
    index12: 2,
    index13: 2,
    index14: 2,
    index15: 2,
    index16: 2,
    index21: 2,
    index22: 2,
    index23: 2,
    index24: 2,
    index31: 2,
    index32: 2,
    index33: 2,
    index41: 2,
    index42: 2,
    sum:0,
    i11:1,
    i12:1,
    i13:1,
    i14:1,
    i15:1,
    i16:1,
    i21:1,
    i22:1,
    i23:1,
    i24:1,
    i31:1,
    i32:1,
    i33:1,
    i41:1,
    i42:1,
    folg:false,
    roomname:''
  },

  roomname:function(e){
    this.data.roomname = this.data.getroom.substring(0,3)  //取下划线前的字符
  },

  bindPickerChange: function (e) {
    let tem = parseInt(e.detail.value)
    this.setData({
      ind: tem
    })
  },

  bindPickerChange11: function (e) {
   let tem = parseInt(e.detail.value)
   var sum = this.data.sum;
   var i=this.data.i11
   this.setData({
     index11: tem
   })
   if(i==1){
      if(this.data.index11==0){
            sum += 2,
            i+=1,
            console.log(i)
            this.setData({
               sum:sum,
               i11:i
            })
      }
   }else if(i==2){
      if(this.data.index11!=0){
         sum -= 2,
         i-=1,
         console.log(i)
         this.setData({
            sum:sum,
            i11:i
         })
   }
   }
 },

 bindPickerChange12: function (e) {
   let tem = parseInt(e.detail.value)
   var sum = this.data.sum;
   var i=this.data.i12
   this.setData({
     index12: tem
   })
   if(i==1){
      if(this.data.index12==0){
            sum += 2,
            i+=1,
            console.log(i)
            this.setData({
               sum:sum,
               i12:i
            })
      }
   }else if(i==2){
      if(this.data.index12!=0){
         sum -= 2,
         i-=1,
         console.log(i)
         this.setData({
            sum:sum,
            i12:i
         })
   }
   }
 },

 bindPickerChange13: function (e) {
   let tem = parseInt(e.detail.value)
   var sum = this.data.sum;
   var i=this.data.i13
   this.setData({
     index13: tem
   })
   if(i==1){
      if(this.data.index13==0){
            sum += 2,
            i+=1,
            console.log(i)
            this.setData({
               sum:sum,
               i13:i
            })
      }
   }else if(i==2){
      if(this.data.index13!=0){
         sum -= 2,
         i-=1,
         console.log(i)
         this.setData({
            sum:sum,
            i13:i
         })
   }
   }
 },
 bindPickerChange14: function (e) {
   let tem = parseInt(e.detail.value)
   var sum = this.data.sum;
   var i=this.data.i14
   this.setData({
     index14: tem
   })
   if(i==1){
      if(this.data.index14==0){
            sum += 3,
            i+=1,
            console.log(i)
            this.setData({
               sum:sum,
               i14:i
            })
      }
   }else if(i==2){
      if(this.data.index14!=0){
         sum -= 3,
         i-=1,
         console.log(i)
         this.setData({
            sum:sum,
            i14:i
         })
   }
   }
 },
 bindPickerChange15: function (e) {
   let tem = parseInt(e.detail.value)
   var sum = this.data.sum;
   var i=this.data.i15
   this.setData({
     index15: tem
   })
   if(i==1){
      if(this.data.index15==0){
            sum += 3,
            i+=1,
            console.log(i)
            this.setData({
               sum:sum,
               i15:i
            })
      }
   }else if(i==2){
      if(this.data.index15!=0){
         sum -= 3,
         i-=1,
         console.log(i)
         this.setData({
            sum:sum,
            i15:i
         })
   }
   }
 },
 bindPickerChange16: function (e) {
   let tem = parseInt(e.detail.value)
   var sum = this.data.sum;
   var i=this.data.i16
   this.setData({
     index16: tem
   })
   if(i==1){
      if(this.data.index16==0){
            sum += 12,
            i+=1,
            console.log(i)
            this.setData({
               sum:sum,
               i16:i
            })
      }
   }else if(i==2){
      if(this.data.index16!=0){
         sum -= 12,
         i-=1,
         console.log(i)
         this.setData({
            sum:sum,
            i16:i
         })
   }
   }
 },

 bindPickerChange21: function (e) {
   let tem = parseInt(e.detail.value)
   var sum = this.data.sum;
   var i=this.data.i21
   this.setData({
     index21: tem
   })
   if(i==1){
      if(this.data.index21==0){
            sum += 3,
            i+=1,
            console.log(i)
            this.setData({
               sum:sum,
               i21:i
            })
      }
   }else if(i==2){
      if(this.data.index21!=0){
         sum -= 3,
         i-=1,
         console.log(i)
         this.setData({
            sum:sum,
            i21:i
         })
   }
   }
 },
 bindPickerChange22: function (e) {
   let tem = parseInt(e.detail.value)
   var sum = this.data.sum;
   var i=this.data.i22
   this.setData({
     index22: tem
   })
   if(i==1){
      if(this.data.index22==0){
            sum += 6,
            i+=1,
            console.log(i)
            this.setData({
               sum:sum,
               i22:i
            })
      }
   }else if(i==2){
      if(this.data.index22!=0){
         sum -= 6,
         i-=1,
         console.log(i)
         this.setData({
            sum:sum,
            i22:i
         })
   }
   }
 },
 bindPickerChange23: function (e) {
   let tem = parseInt(e.detail.value)
   var sum = this.data.sum;
   var i=this.data.i23
   this.setData({
     index23: tem
   })
   if(i==1){
      if(this.data.index23==0){
            sum += 6,
            i+=1,
            console.log(i)
            this.setData({
               sum:sum,
               i23:i
            })
      }
   }else if(i==2){
      if(this.data.index23!=0){
         sum -= 6,
         i-=1,
         console.log(i)
         this.setData({
            sum:sum,
            i23:i
         })
   }
   }
 },
 bindPickerChange24: function (e) {
   let tem = parseInt(e.detail.value)
   var sum = this.data.sum;
   var i=this.data.i24
   this.setData({
     index24: tem
   })
   if(i==1){
      if(this.data.index24==0){
            sum += 12,
            i+=1,
            console.log(i)
            this.setData({
               sum:sum,
               i24:i
            })
      }
   }else if(i==2){
      if(this.data.index24!=0){
         sum -= 12,
         i-=1,
         console.log(i)
         this.setData({
            sum:sum,
            i24:i
         })
   }
   }
 },
 bindPickerChange31: function (e) {
   let tem = parseInt(e.detail.value)
   var sum = this.data.sum;
   var i=this.data.i31
   this.setData({
     index31: tem
   })
   if(i==1){
      if(this.data.index31==0){
            sum += 3,
            i+=1,
            console.log(i)
            this.setData({
               sum:sum,
               i31:i
            })
      }
   }else if(i==2){
      if(this.data.index31!=0){
         sum -= 3,
         i-=1,
         console.log(i)
         this.setData({
            sum:sum,
            i31:i
         })
   }
   }
 },
 bindPickerChange32: function (e) {
   let tem = parseInt(e.detail.value)
   var sum = this.data.sum;
   var i=this.data.i32
   this.setData({
     index32: tem
   })
   if(i==1){
      if(this.data.index32==0){
            sum += 8,
            i+=1,
            console.log(i)
            this.setData({
               sum:sum,
               i32:i
            })
      }
   }else if(i==2){
      if(this.data.index32!=0){
         sum -= 8,
         i-=1,
         console.log(i)
         this.setData({
            sum:sum,
            i32:i
         })
   }
   }
 },
 bindPickerChange33: function (e) {
   let tem = parseInt(e.detail.value)
   var sum = this.data.sum;
   var i=this.data.i33
   this.setData({
     index33: tem
   })
   if(i==1){
      if(this.data.index33==0){
            sum += 12,
            i+=1,
            console.log(i)
            this.setData({
               sum:sum,
               i33:i
            })
      }
   }else if(i==2){
      if(this.data.index33!=0){
         sum -= 12,
         i-=1,
         console.log(i)
         this.setData({
            sum:sum,
            i33:i
         })
   }
   }
 },

 bindPickerChange41: function (e) {
   let tem = parseInt(e.detail.value)
   var sum = this.data.sum;
   var i=this.data.i41
   this.setData({
     index41: tem
   })
   if(i==1){
      if(this.data.index41==0){
            sum += 3,
            i+=1,
            console.log(i)
            this.setData({
               sum:sum,
               i:i
            })
      }
   }else if(i==2){
      if(this.data.index41!=0){
         sum -= 3,
         i-=1,
         console.log(i)
         this.setData({
            sum:sum,
            i41:i
         })
   }
   }
 },
 bindPickerChange42: function (e) {
   let tem = parseInt(e.detail.value)
   var sum = this.data.sum;
   var i=this.data.i42
   this.setData({
     index42: tem
   })
   if(i==1){
      if(this.data.index42==0){
            sum += 12,
            i+=1,
            console.log(i)
            this.setData({
               sum:sum,
               i42:i
            })
      }
   }else if(i==2){
      if(this.data.index42!=0){
         sum -= 12,
         i-=1,
         console.log(i)
         this.setData({
            sum:sum,
            i42:i
         })
   }
   }
 },
 

  bindTextAreaBlur: function (e) {
    console.log(e.detail.value);
    this.setData({
      details: e.detail.value
    });
  },

  async getList() {
    //初始化指令
    const db = wx.cloud.database();
    //指定当前库名
    let {
      data
    } = await db.collection("jilu")
      .where({}) //根据条件查找
      .get() //获取查找的结果
    this.setData({
      list:data,
      xuhao:data.length
    })
  },

  // 删除照片
  imgDelete: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    })
  },
  // 选择图片 
  c: function (e) {
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var that = this;
    var n = 5;
    if (5 > imgbox.length > 0) {
      n = 5 - imgbox.length;
    } else if (imgbox.length == 5) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (5 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        }
        that.setData({
          imgbox: imgbox
        })
      }
    })
  },


  tijiao: function (e) {

    var that = this;
    let promiseArr = [];
    let {
     folg,roomname
    } = this.data
  console.log(roomname)
    if(roomname!='JXA'&&roomname!='JXB'&&roomname!='JXC'&&roomname!='JSA'&&roomname!='JSB'&&roomname!='JSC'&&roomname!='GZA'&&roomname!='GZB'&&roomname!='GZC'){
    wx.showToast({
      title: '请填写正确房间号，如JXC303',
      icon: "none",
      duration:2000,
    })
    return}
        
    else if(folg) {
      wx.showToast({
        title: '请填写房间号',
        icon: "none",
        duration:2000,
      })
      return
    } else {
    for (let i = 0; i < this.data.imgbox.length; i++) {
      promiseArr.push(new Promise((reslove, reject) => {
        let item = this.data.imgbox[i];
        let suffix = /\.\w+$/.exec(item)[0]; //正则表达式返回文件的扩展名
        let cloudPath = new Date().getTime() + '.' + suffix;
        wx.cloud.uploadFile({
          cloudPath: '图片1/' + cloudPath, // 上传至云端的路径
          filePath: item, // 小程序临时文件路径
          success: res => {
            this.setData({
              fileIDs: this.data.fileIDs.concat(res.fileID)
            })
            console.log(res)
            console.log(this.data.fileIDs)
            reslove();
            wx.hideLoading();
          }
        })

      }))
    }

    let {
      getroom,
      details,
      name1,
      time,
      sum
    } = that.data
    Promise.all(promiseArr).then(res => {
      console.log("fileIDs", that.data.fileIDs) //输出上传后图片的返回地址
      wx.cloud.database().collection('jilu')
        .add({ //添加数据
          data: {
            jianchayuan: name1,
            room: getroom,
            pro: details,
            time: time,
            fileIDs: that.data.fileIDs,
            k11: this.data.index11,
            k12: this.data.index12,
            k13: this.data.index13,
            k14: this.data.index14,
            k15: this.data.index15,
            k16: this.data.index16,
            k21: this.data.index21,
            k22: this.data.index22,
            k23: this.data.index23,
            k24: this.data.index24,
            k31: this.data.index31,
            k32: this.data.index32,
            k33: this.data.index33,
            k41: this.data.index41,
            k42: this.data.index42,
            sum: sum,
            tili:this.data.ind,
            pro1:"",
            fileIDs1:""
          },
          success(res) {
            console.log("添加成功", res)
            // console.log( res.data)

            wx.showToast({
              icon: 'none',
              title: '提交成功',
              // duration:2000,
            })

            that.setData({
              folg:true,
            })
            
            setTimeout(function () {
              wx.reLaunch({
                url: '../dengji/dengji',
              })
            }, 200) //延迟时间 这里是0.2秒


          },
          fail(res) {
            console.log("添加失败", res)

            wx.showToast({
              icon: 'none',
              title: '提交失败',
            })

          }
        })
        wx.cloud.database().collection('ar_sum').where({
          room: that.data.getroom,
          edata: that.data.time.substring(0, 7)
        }).get({
          success: res => {
            console.log(res)
            console.log("成功")
            let temp = res.data
            console.log(temp)
  
            if (temp == "") {
              console.log(that.data)
              wx.cloud.database().collection('ar_sum').add({
                data : {
                  edata: that.data.time.substring(0, 7),
                  room: that.data.getroom,
                  sum: that.data.sum
                }
               
              })
            }else{
              let idd = temp[0]._id
              let sum1 = temp[0].sum
              sum1 += that.data.sum
              console.log(sum1)
              console.log(idd)
              wx.cloud.database().collection('ar_sum').doc(idd).update({
                data:{
                  sum : sum1
                }
               
              })
            }
  
          }
        })
    })
  }
  },

  onLoad: function (options) {
    this.getList()
    user.get({
      success: res => {
        this.setData({
          user: res.data
        })
      }
    })
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let user = wx.getStorageSync('user')
    this.setData({
      name1: user.Account
    })
  },
})