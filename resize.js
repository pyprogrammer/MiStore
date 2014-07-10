function resize()
{
	var applists = document.getElementsByClassName('appList');
	var APP_WIDTH = 60; //width of icon/caption
	var MIN_BORDER_WIDTH = 73/2; //minimum spacing between app items
	var MAX_BORDER_WIDTH = 2*MIN_BORDER_WIDTH + APP_WIDTH;
	styleElement = document.getElementById('customStyles');
	if (!styleElement)
	{
		styleElement = document.createElement('style');
		styleElement.id = 'customStyles';
		styleElement.type="text/css";
		document.head.appendChild(styleElement);
	}
	var list;
	var borderWidth;
	var parentWidth;
	var numElements;
	var children;
	var style;
	var className;
	var classList;
	resize._class_index = resize._class_index || 0;
	for(var i=0, m=applists.length; i < m; i++)
	{
		list = applists[i];
		if (list.classList.contains('resize'))
		{
			classList = list.classList;
			for (var ind=0, l=classList.length;ind<l;ind++)
			{
				className = classList[ind];
				if (className.indexOf("appList-") !== -1)
				{
					break;
				}
			}
		}
		else
		{
			list.classList.add('resize');
			className = "appList-"+resize._class_index;
			list.classList.add(className);
			resize._class_index++;
		}
		parentWidth = parseFloat(window.getComputedStyle(list).width);
		numElements = Math.floor((parentWidth + MIN_BORDER_WIDTH)/(APP_WIDTH + MIN_BORDER_WIDTH));
		do {
		  borderWidth = ((parentWidth - numElements * APP_WIDTH) / (2*(numElements-1)));
		  numElements++;
		}
		while (borderWidth > MAX_BORDER_WIDTH)
		numElements--;
		borderWidth += 'px';
		styleElement.sheet.insertRule("."+className+" > li {margin-left:"+borderWidth+";\n" + "margin-right:"+borderWidth+";}\n",0);
		styleElement.sheet.insertRule("."+className+" > li:nth-child("+numElements+"n+1) {margin-left:0;}",0);
		styleElement.sheet.insertRule("."+className+" > li:nth-child("+numElements+"n) {margin-right:0;}",0);
	}
}
window.addEventListener('load',resize);
window.addEventListener('resize',resize);
window.addEventListener('orientationChange',resize);