var data = [];
var dataStr = '1、响应式设计<br>\
<br>\
·忘记设备尺寸，一套代码适配多终端，响应式设计网站。<br>\
·响应式网站设计(Responsive Web design)的理念是：<br>\
·集中创建页面的图片排版大小，可以智能地根据用户行为以及使用的<br>\
·设备环境（系统平台、屏幕尺寸、屏幕定向等）进行相对应的布局。<br>\
·PS:可在多终端打开查看效果<br>\
<br>\
<br>\
2、2048<br>\
<br>\
·《2048》是一款比较流行的数字游戏，最早于2014年3月20日发行。<br>\
·原版2048首先在GitHub上发布，原作者是Gabriele Cirulli，后被移植到各个平台。<br>\
·这款游戏是基于《1024》和《小3传奇》的玩法开发而成的新型数字游戏。<br>\
<br>\
<br>\
3、github<br>\
<br>\
·Git是一个分布式的版本控制系统，最初由Linus Torvalds编写，用作Linux内核代码的管理。<br>\
·在推出后，Git在其它项目中也取得了很大成功，尤其是在Ruby社区中。<br>\
·目前，包括Rubinius、Merb和Bitcoin在内的很多知名项目都使用了Git。<br>\
·Git同样可以被诸如Capistrano和Vlad the Deployer这样的部署工具所使用。<br>\
·PS:github个人主页<br>\
<br>\
<br>\
4、旋转图插件<br>\
<br>\
·JS实现“旋转木马”幻灯片效果<br>\
<br>\
<br>\
5、fullpage<br>\
<br>\
·fullpage.js和move.js插件的小demo<br>\
<br>\
<br>\
6、webapp<br>\
<br>\
·webapp版的个人简介<br>\
·PS:使用移动端或浏览器的调试工具打开查看效果<br>\
';
var d = dataStr.split('<br><br><br>');
for (var i = 0; i < d.length; i++) {
    var c = d[i].split('<br><br>');
    data.push({
        img: c[0].replace('、', ' ') + '.png',
        caption: c[0].split('、')[1],
        desc: c[1]
    });
    // console.log(c[0].replace('、', ' ') + '.jpg');
}
data[0].href = "xys.html";
data[1].href = "2048.html";
data[2].href = "https://github.com/marshallstan";
data[3].href = "xzmm.html";
data[4].href = "fullpage.html";
data[5].href = "webapp.html";