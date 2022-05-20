Page({
  data: {
    Account: '',
    Password: '',
    defaultType: true,
    passwordType: true
  },
  // 隐藏密码
  eyeStatus: function () {
    this.data.defaultType = !this.data.defaultType
    this.data.passwordType = !this.data.passwordType
    this.setData({
      defaultType: this.data.defaultType,
      passwordType: this.data.passwordType
    })

  },

  //去修改密码
  xiugai() {
    wx.navigateTo({
      url: '/pages/xiugai/xiugai',
    })
  },

  // 去注册
  zhuce() {
    wx.navigateTo({
      url: '/pages/zhuce/zhuce',
    })
  },
  //获取输入账号
  getAccount(event) {
    // console.log('账号',event.detail.value)
    this.setData({
      Account: event.detail.value
    })
  },

  //获取输入密码
  getPassword(event) {
    // console.log('密码',event.detail.value)
    this.setData({
      Password: event.detail.value
    })
  },

  //点击登陆
  login() {
    let Account = this.data.Account
    let Password = this.data.Password
    console.log('账号', Account, '密码', Password)
    if (Account.length != 6) {
      wx.showToast({
        icon: 'error',
        title: '用户账号错误',
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
    //登陆操作
    wx.cloud.database().collection('user').where({
      Account: Account
    }).get({
      success(res) {
        if(res.data.length!=0){
        console.log("获取数据成功", res)
        let user = res.data[0]
        getApp().globalData.userinfo = res.data[0]
        console.log("user", user)
        console.log(getApp().globalData.userinfo.Account)

        if (Password == user.Password) {
          console.log('登陆成功')
          wx.showToast({
            title: '登陆成功',
          })
          if (user.Identity == 'inspector') {
            wx.switchTab({
              url: '/pages/dengji/dengji',
            })
          } else if (user.Identity == 'tutor') {
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/daoshi/daoshi'
              })
            }, 500) //延迟时间 这里是0.5秒

          } else {
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/room/room'
              })
            }, 500) //延迟时间 这里是0.5秒
          }
          wx.setStorageSync('user', user) //保存到本地
        } 
        else {
          console.log('登陆失败')
          wx.showToast({
            icon: 'none',
            title: '密码不正确',
          })
        } //else
      } //if
else
{
  wx.showToast({
    icon: 'error',
    title: '账号不存在',
  })


}




      }, //success


      fail(res) {
        console.log("获取数据失败", res)
      }



    }) //get

  }, //login



}) //page