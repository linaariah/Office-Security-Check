Page({
  data: {
    list1:[],
    list2:[],
    list3:[],
    list4:[],
    newRule: "",
    xuhao1: '',
    xuhao2:'',
    xuhao3:'',
    xuhao4:'',
    newScore: "",
    newBeiz: "",
   type:"",
   currentTab:0
    
  },
  //获取数据第一类规则库
  async getList1() {
    //初始化指令
    const db = wx.cloud.database();
    //指定当前库名
    let {
      data
    } = await db.collection("rule")
      .where({
        type:"1"
      }) //根据条件查找
      .get() //获取查找的结果
    this.setData({
      list1: data,
      xuhao1:data.length,
      type:"1"
    })
  },
    //获取数据第二类规则库
  async getList2() {
    //初始化指令
    const db = wx.cloud.database();
    //指定当前库名
    let {
      data
    } = await db.collection("rule")
      .where({
        type:"2"
      }) //根据条件查找
      .get() //获取查找的结果
    this.setData({
      list2: data,
      xuhao2:data.length,
      type:"2"
    })
  },
    //获取数据第三类规则库
  async getList3() {
    //初始化指令
    const db = wx.cloud.database();
    //指定当前库名
    let {
      data
    } = await db.collection("rule")
      .where({
        type:"3"
      }) //根据条件查找
      .get() //获取查找的结果
    this.setData({
      list3: data,
      xuhao3:data.length,
      type:"3"
    })
  },
    //获取数据第四类规则库
  async getList4() {
    //初始化指令
    const db = wx.cloud.database();
    //指定当前库名
    let {
      data
    } = await db.collection("rule")
      .where({
        type:"4"
      }) //根据条件查找
      .get() //获取查找的结果
    this.setData({
      list4: data,
      xuhao4:data.length,
      type:"4"
    })
  },
  //一类新增数据
  set1() {
    let {
      newRule,
      xuhao1,
      newScore,
      newBeiz,
      type
    } = this.data
    if (newScore.length < 1 || newRule.length < 1 || newBeiz.length < 1) {
      wx.showToast({
        title: '请补全规则',
        icon: "none"
      })
      return
    } else {
      const db = wx.cloud.database();
      db.collection('rule').add({
        data: {
          guize: newRule,
          score: newScore,
          xuhao: xuhao1+1+".",
          beizhu: newBeiz,
          type:"1"
        },

      })
      wx.showToast({
        title: '添加成功',
        icon: 'none'
      })
      setTimeout(function () {
        wx.reLaunch({ 
          url: '../log/log',
      })   
      }, 1000) //延迟时间 这里是1秒
  }},
  //二类新增数据
  set2() {
    let {
      newRule,
      xuhao2,
      newScore,
      newBeiz,
      type
    } = this.data
    if (newScore.length < 1 || newRule.length < 1 || newBeiz.length < 1) {
      wx.showToast({
        title: '请补全规则',
        icon: "none"
      })
      return
    } else {
      const db = wx.cloud.database();
      db.collection('rule').add({
        data: {
          guize: newRule,
          score: newScore,
          xuhao: xuhao2+1+".",
          beizhu: newBeiz,
          type:"2"
        },

      })
      wx.showToast({
        title: '添加成功',
        icon: 'none'
      })
      setTimeout(function () {
        wx.reLaunch({ 
          url: '../log/log',
      })   
      }, 1000) //延迟时间 这里是1秒
    }
  },
  set3() {
    let {
      newRule,
      xuhao3,
      newScore,
      newBeiz,
      type
    } = this.data
    if (newScore.length < 1 || newRule.length < 1 || newBeiz.length < 1) {
      wx.showToast({
        title: '请补全规则',
        icon: "none"
      })
      return
    } else {
      const db = wx.cloud.database();
      db.collection('rule').add({
        data: {
          guize: newRule,
          score: newScore,
          xuhao: xuhao3+1+".",
          beizhu: newBeiz,
          type:"3"
        },

      })
      wx.showToast({
        title: '添加成功',
        icon: 'none'
      })
      setTimeout(function () {
        wx.reLaunch({ 
          url: '../log/log',
      })   
      }, 1000) //延迟时间 这里是1秒
      
    }
  },
  set4() {
    let {
      newRule,
      xuhao4,
      newScore,
      newBeiz,
      type
    } = this.data
    if (newScore.length < 1 || newRule.length < 1 || newBeiz.length < 1) {
      wx.showToast({
        title: '请补全规则',
        icon: "none"
      })
      return
    } else {
      const db = wx.cloud.database();
      db.collection('rule').add({
        data: {
          guize: newRule,
          score: newScore,
          xuhao: xuhao4+1+".",
          beizhu: newBeiz,
          type:"4"
        },

      })
      wx.showToast({
        title: '添加成功',
        icon: 'none'
      })
      setTimeout(function () {
        wx.reLaunch({ 
          url: '../log/log',
      })   
      }, 1000) //延迟时间 这里是1秒
    }
  },
  //滑动切换
  swiperTab: function (e) {//滑动切换
            var that = this;
            that.setData({
              currentTab: e.detail.current
            });
          },
          clickTab: function (e) {
            var that = this;
            if (this.data.currentTab === e.target.dataset.current) {
              return false;
            } else {
              that.setData({
                currentTab: e.target.dataset.current
              })
            }
          },
   
   
   
    //
  to(e) {
    let id =e.currentTarget.dataset.id
    wx.navigateTo({
    url: '../logdetail/logdetail?id='+id
     })
  },
  onLoad() {
    this.getList1()
    this.getList2()
    this.getList3()
    this.getList4()
  }
})

