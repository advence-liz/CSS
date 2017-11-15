# 一些关于CSS的终结
## 长度单位
PPI（pixels per inch)像素密度 DPI(DOT per inch)// 莫种程度上说ppi&dpi 一个意思

DPI用来表示输出设备的输出精度，如打印机，显示器

DPI表示的是 像点/英寸（每英寸长度上有多少个打印点或像点）

PPI用来表示输入设备的输入精度，如扫描仪，数码相机

PPI表示的是　像素/英寸（每英寸长度上有多少个像素）

像点和像素关系是这样的，一个像点可以是一个或几个像素，一个像素也可以是一个或几个像点， 比如我们打印一张分辨率为100PPI的照片，打印机的打印分辨率设为300DPI，这时三个打印点表现一个像素，如果我们打印一张600PPI的照片， 同样以300DPI来打印这时一个打印点表现两个像素。

输出尺寸= 像素/DPI

一般显示器 96ppi 96 像素一英寸（48/2.54~=19 1920/96~=20 有点对不上呀囧）
## inline-block

- inline-block element 是块级元素跟行内元素的混合 //.一些特殊的用法可能影响表现        margin: 1em calc(50% - 450px);  不知为何搞的 inlne-block 内部的 block 中文字看不见了
## BFC
浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的BFC（块级格式上下文）。著作权归作者所有。
- Block Formatting Context可以阻止边距折叠（margin collapsing）
- Block Formatting Context可以包含内部元素的浮动。
- Block Formatting Context可以阻止元素被浮动覆盖
## Stacking context level
- 根层叠上下文
指的是页面根元素，也就是滚动条的默认的始作俑者<html>元素。这就是为什么，绝对定位元素在left/top等值定位的时候，如果没有其他定位元素限制，会相对浏览器窗口定位的原因。
-  定位元素与传统层叠上下文
对于包含有position:relative/position:absolute的定位元素，以及FireFox/IE浏览器（不包括Chrome等webkit内核浏览器）（目前，也就是2016年初是这样）下含有position:fixed声明的定位元素，当其z-index值不是auto的时候，会创建层叠上下文。
-  CSS3与新时代的层叠上下文
CSS3的出现除了带来了新属性，同时还对过去的很多规则发出了挑战。例如，CSS3 transform对overflow隐藏对position:fixed定位的影响等。而这里，层叠上下文这一块的影响要更加广泛与显著。

如下：

z-index值不为auto的flex项(父元素display:flex|inline-flex).
元素的opacity值不是1.
元素的transform值不是none.
元素mix-blend-mode值不是normal.
元素的filter值不是none.
元素的isolation值是isolate.
will-change指定的属性值为上面任意一个。
元素的-webkit-overflow-scrolling设为touch
## 属性选择器
- p[class~="warning"]   class="urgent warning"  属性以空格为分隔的值中包含 xxx
- p[class*="win"]       class="window" 包含子串
- [foo^="bar"]
- [foo$="bar"]
- [att|="val"]     val or 以 -val 开头
## 3D转换

- translate（平移） ，rotelate（旋转） ，scale（缩放）transform添加的动画效果的元素依然占据原来的位置（应该是转换的元素stacking context 比较高）transition改变的width&height 影响布局
transform：translateX(45deg )
```
div {
    width: 100px;
    height: 100px;
    background: red;
    transition: width 2s, height 2s, transform 2s;
}

div:hover {
    width: 300px;
    height: 300px;
    transform: rotate(180deg);
}
```
- perspective（透视法画图的视具）
perspective-origin（透视的观察点所在位置）
而浏览器所展现的内容就是在观察点（perspective-origin）所见物体的投影。

transoform-style 子元素是否继承元素的3D转换（即在父元素的基础上转换）


# Tips
       汇总平时遇见的css问题

- z-index:0 时可以生成 stacking context 而 auto 不稳

- 绝对定位元素z-index 调多大都看不见，可能是它的父元素高度不够

- table td 的高度相当于 min-height 的作用

- calc  margin: 1em calc(50% - 450px);

- attr  a:after {  content: attr(title);font-size: 12px;} //目前只能运用于伪元素

- width:100%;与width:auto;的区别<div><p>*****</p></div>
如果是p的width:100%，则说明p的width会得到980px就已经充满div区域，然后自己又有padding，所以会超出div。
而当width:auto时它是总体宽度（包括width，margin,padding,border）等于父级宽度（width，不包含父级的margin,padding,border），所以如果padding已经左右占去10px的空间，那么width给的值就是960px。
但无论是width:100%还是auto，其计算的参照都是父级内容区width值，而非总宽度值.

- box-sizing: border-box; box-sizing: content-box;

- border-collapse:collapse; 有些table显示的时候，下边界消失去掉此属性可以解决（但是不知道为什么） ，或者table设为display：inline-block （此举可能影响布局）;

- button::before { content: ''; position: absolute; top: -10px; right: -10px; bottom: -10px; left: -10px;} 绝对定位可以控制元素大小。
   

# 参考链接

- [PPI&DPI](http://blog.csdn.net/wuyao721/article/details/5286753)
- [bootsrap清楚浮动原理](https://segmentfault.com/a/1190000008424822)
- [CSS2.2](https://www.w3.org/TR/CSS22/)
- [BFC](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)	  
	

