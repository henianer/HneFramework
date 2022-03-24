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
