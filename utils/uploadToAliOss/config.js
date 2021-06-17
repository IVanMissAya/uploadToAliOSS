var fileHost = "https://xxxx-bucket.oss-cn-shenzhen.aliyuncs.com" 
var config = {
  //aliyun OSS config
  uploadImageUrl: `${fileHost}`, //默认存在根目录，可根据需求改
  OSSAccessKeyId: 'xxxxx',
  AccessKeySecret: 'xxxxxx',
  timeout: 87600 //这个是上传文件时Policy的失效时间
};
module.exports = config