# placeholder.js
让低版本的浏览器(主要是 IE8和IE9 )支持 placeholder ，为了便于移植，没有依赖任何框架（比如 Jquery ）。
引用后，使用HTML5 中 placeholder 编写的页面，无需做任何改动，系统全自动分析并处理。

在IE8模式下的显示效果（CSS请自行补充）：
![使用后的效果](https://git.oschina.net/uploads/images/2017/0901/174950_f4e57ca3_82383.jpeg "placeholder.jpg")

```
<div class="form-group">
    <input name="username" class="form-control" placeholder="请填写用户名">
</div>
<div class="form-group">
    <input name="password" type="password" class="form-control" placeholder="请填写用户密码">
</div>
<div class="form-group">
    <div class="input-group">
        <input name="verify" class="form-control" placeholder="请填写验证码">
        <div class="input-group-addon input-group-image"><img class="verify-img" src="verify/login.png"></div>
    </div>
</div>
```