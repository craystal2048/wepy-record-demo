# record_demo
``` bash
# 下载项目到本地
git clone https://github.com/craystal2048/wepy-record-demo.git

cd wepy-record-demo

npm install;
wepy build -w;
用微信开发工具打开wepy-record-demo；
如果需要编码；则每次编码完，需要执行wepy build -w 将小程序打包到dist文件夹

# 开启本地demo-api服务
cd wangyiyun_api
npm install
npm run dev

# 功能
1.逐字歌词
2.背景音乐播放和进度条
3.录音
4.录音文件上传

# 注意事项
1.单位统一用less的unit方法：width: unit(100, rpx)
2.页面中的methods元素只能放置bind/catch等方法，其他方法跟methods同级
3.wepy使用promise:https://github.com/Tencent/wepy/wiki/wepy项目中使用Promise
4.在异步函数中更新数据的时候，必须手动调用$apply方法，才会触发脏数据检查流程的运行
5.播放动画的控制通过animation-play-state的暂停和播放实现
6.修饰符.user为自定义组件绑定事件
7.使用.sync修饰符，同时子组件props中添加的twoWay: true时，就可以实现数据的双向绑定
8.原伴奏切换功能通过切换两个audio的音量来实现