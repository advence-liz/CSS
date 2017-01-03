# 平时遇见的一些CSS

       汇总平时遇见的css问题

- z-index:0 时可以生成 stacking context 而 auto 不稳

- table td 的高度相当于 min-height 的作用

- calc  margin: 1em calc(50% - 450px);

- attr  a:after {  content: attr(title);font-size: 12px;}

- width:100%;与width:auto;的区别<div><p>*****</p></div>
如果是p的width:100%，则说明p的width会得到980px就已经充满div区域，然后自己又有padding，所以会超出div。
而当width:auto时它是总体宽度（包括width，margin,padding,border）等于父级宽度（width，不包含父级的margin,padding,border），所以如果padding已经左右占去10px的空间，那么width给的值就是960px。
但无论是width:100%还是auto，其计算的参照都是父级内容区width值，而非总宽度值.

- box-sizing: border-box; box-sizing: content-box;

- border-collapse:collapse; 有些table显示的时候，下边界消失去掉此属性可以解决（但是不知道为什么） ，或者table设为display：inline-block （此举可能影响布局）
   

	  
	

