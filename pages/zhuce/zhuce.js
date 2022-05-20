Page({
  data: {
    Account: '',
    Password: '',
    Identity: 'room',
    defaultType: true,
    passwordType: true
  },
  eyeStatus: function () {
    this.data.defaultType = !this.data.defaultType
    this.data.passwordType = !this.data.passwordType
    this.setData({
      defaultType: this.data.defaultType,
      passwordType: this.data.passwordType
    })

  },


  //获取账号
  getAccount(event) {
    // console.log('获取输入的账号',event.detail.value)
    this.setData({
      Account: event.detail.value
    })
  },

  //获取密码
  getPassword(event) {
    // console.log('获取输入的密码',event.detail.value)
    this.setData({
      Password: event.detail.value
    })
  },
  // 获取身份
  getsf(event) {
    this.setData({
      Identity: event.detail.value
    })

  },

  //注册
  register() {
    let Account = this.data.Account
    let Password = this.data.Password
    let Identity = this.data.Identity
    console.log("Account", Account)
    console.log("Password", Password)
    console.log("Identity", Identity)
    //校验用户账号
    if (Account.length != 6) {
      wx.showToast({
        icon: 'none',
        title: '用户账号应为6位',
      })
      return
    }
    else{
    wx.cloud.database().collection('user').where({
      Account: Account
    }).get({
      success(res) {
        console.log(res)
        if (res.data != '') {
          wx.showToast({
            icon: 'none',
            title: '账号已存在,请直接登陆',
          })
          return
        }
//校验用户密码
if (Password.length < 4) {
  wx.showToast({
    icon: 'none',
    title: '用户密码最少4位',
  })
  return
}
//注册功能的实现
wx.cloud.database().collection('user').add({
  data: {
    Account: Account,
    Password: Password,
    Identity: Identity
  },
  success(res) {
    console.log('注册成功', res)
    wx.showToast({
      title: '注册成功',
    })

    setTimeout(function () {
      wx.reLaunch({
        url: '../login/login',
      })
    }, 500) //延迟时间 这里是0.5秒
  },
  fail(res) {
    console.log('注册失败', res)
  }
})   //add end



      
      }//success

    
    }) //get

}//else
  }
  
})