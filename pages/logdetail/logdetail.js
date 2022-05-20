// pages/detail/index.js
Page({
  data: {
    guize:'',
    score:'',
    beizhu:'',
    id:""
  },
  //获取详情
  async getDetail(e) {
    const {
      id
    } = e;
    const db = wx.cloud.database();
    let data = await db
      .collection("rule")
      .doc(id)//两种查找方法 doc只查询对应id
      // .where({
      //   _id: id
      // })
      .get()
    this.setData({
       guize:data.data.guize,
       score:data.data.score,
       beizhu:data.data.beizhu,
       id:data.data._id
    })
  },
  //确认修改
  async set(){
   let{ guize,score,beizhu,id}= this.data
   //更新数据仅创建者可写，没有对应的_openid无法更改，故要用最高权限更改数据
  //  const db =wx.cloud.database();
  //  let data = await db.collection('rule')
  //  .doc(id)
  //  .update({
  //    data:{
  //       guize:guize,
  //       score:score,
  //       beizhu:beizhu
  //    }
  //  })
  const data = await wx.cloud.callFunction({
     //要调用的云函数名称
    name:'update',
    //传递云函数的参数
    data:{
    guize:guize,
    score:score,
    beizhu:beizhu,
    id:id
    }
   })
  wx.showToast({
    title: '修改成功',
    icon:'none'
  })
  setTimeout(function () {
    wx.reLaunch({ 
      url: '../log/log',
  })   
  }, 1000) //延迟时间 这里是1秒
  },

  //页面实例化时触发
  onLoad: function (e) {
    this.getDetail(e)
  }






})