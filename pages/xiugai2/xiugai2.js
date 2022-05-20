var id= ''

Page({
  data:{
  Account:'',
  Password:'',
  defaultType: true,
 passwordType: true
  },
onShow(){
let user=wx.getStorageSync('user')
if(user&&user.Account){
  this.setData({
    Account:user.Account,
  })
}


},


  eyeStatus: function(){
   this.data.defaultType= !this.data.defaultType
   this.data.passwordType= !this.data.passwordType
   this.setData({
     defaultType: this.data.defaultType,
     passwordType: this.data.passwordType
 })
 },




  
    //获取密码
  getPassword(event){
    // console.log('获取输入的密码',event.detail.value)
    this.setData({
      Password:event.detail.value
    })
  },
  
  


  //更新密码
  update() {
    let user=wx.getStorageSync('user')
    let id =user._id
    let Password=this.data.Password
    console.log("点击了修改")
    console.log("Password",Password)
    console.log("id",id)
  
  //校验用户密码
  if(Password.length<4) {
    wx.showToast({
      icon:'none',
      title: '用户密码最少4位',
    })
    return
  } 
  //修改功能的实现


  wx.cloud.database().collection('user')
  .doc(id)
  .update({
  data:{
  Password:Password
  },
  success(res){
  console.log('修改成功',res)
  wx.showToast({
    title: '修改成功',
  })
  wx.navigateTo({
    url: '../login/login',
  })
  wx.setStorageSync('user', null)
  },
  fail(res){
    console.log('修改失败',res)
  }
  })
  
  
  
  
  
  
  }
  
  })
  