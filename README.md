# HneFramework
CocosCreator Framework
## Minio使用安装
* 项目根目录安装minio: `npm install --save minio`
* 使用typescript: `npm install --save-dev @types/minio`
* 导入: `import * as Minio from "minio"`
* 初始化:
  * `this.minioClient = new Minio.Client({`
  * `endPoint: '*.*.*.*',`
  * `port: ****,`
  * `useSSL: false,`
  * `accessKey: '*****',`
  * `secretKey: '*****',`
  * `});`
## tsprc框架使用
* 浏览器、React Native: `tsrpc-browser`
* 小程序: `tsrpc-miniapp`
* NodeJS: `tsrpc`
* 根目录安装: `npm install tsrpc-`
## MongoDB数据库使用
* `npm i mongodb`
* typescript类型定义:`npm i @types/mongodb -D`
