

Page({
  data:{
  Account:'',
  },
     //获取账号
    getAccount(event){
      // console.log('获取输入的账号',event.detail.value)
      this.setData({
        Account:event.detail.value
      })
    },

   
  //确认账号
  queren() {
   
    let Account=this.data.Account
    console.log("点击了确认")
    console.log("Account",Account)
  
    //校验用户账号
  wx.cloud.database().collection('user').where({
    Account:Account
  }).get({
success(res){
  console.log(res)
  let user=res.data[0]
  console.log('user',user)
if (Account==user.Account){
  wx.navigateTo({
    url: '/pages/xiugai2/xiugai2',
  })

  wx.setStorageSync('user', user)//保存到本地
}
// 账号不存在判断
// if(user){
// wx.showToast({
//   icon:"none",
//   title: '账号不存在',
// })
// }

},
fail(res){
  console.log('获取数据室失败',res)
}
  
  
  
  })

  }
  })
  