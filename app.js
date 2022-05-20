App({
   globalData : {
      userinfo:null
   },
   onLaunch:function(){
      wx.cloud.init({
         env:'env-3gujshzc0ca142e9',
         traceUser:true
      }) 
   },
})