// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var hot_words = [];
 // 实例化数据库连接
try{
  return await db.collection('jilu').where({
    room: "C303"
  }).get()
}
catch(e)
{
  console.log(e)
  hot_words=e.data
}
var result = {}
result.errCode = 0
result.errMsg = '获取成功'

var data = {}
data.hot_words = hot_words
result.data = data


}


/*var hot_words = [];

await db.collection('jilu')
.orderby('time','desc')
.limit(MAX_LIMIT)
.get()
.then(res =>{
  console.log('操作成功')
  console.log(res.data)

  hot_words=res.data
})
var result = {}
result.errCode = 0
result.errMsg = '获取成功'

var data = {}
data.hot_words = hot_words
result.data = data
return result*/