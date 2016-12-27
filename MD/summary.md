# 一些关于CSS的终结

## inline-block

- inline-block element 是块级元素跟行内元素的混合。 

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


            