// Ajax 直接传对象的方法
function Ajax(obj = {}) {
	return new Promise((resolve, reject) => {
		let {url, data} = obj,
			XHR = new XMLHttpRequest(),
			method = obj.method.toUpperCase();

		if (!(method && url && data)) reject(new Error('参数不对'));

		XHR.open(method, url + (method==='GET' ? (_=> {
			let dataStr = '';
			for (let item in data) {
				dataStr += (dataStr ? '&' : '?') + item + '=' + data[item];
			}
			return dataStr;
		})() : ''), true);

		XHR.send((method==='POST' ? (_=> {
			let x =  new FormData();
			for (let item in data) {
				x.append(item, data[item]);
			}
			return x;
		})() : ''));

		XHR.addEventListener("readystatechange", function() {
			console.log(XHR.readyState);
			if (XHR.readyState === 4) {
				resolve(XHR.responseText);
			}
		});
	})
}

Ajax({
  method: 'get',
  url: 'https://zs.cqupt.edu.cn/wcx_collegelist.ashx',
  data: {
  	a: 1,
  	b: 2
  }
}).then(console.log);



// Ajax下挂载get，post的方法
Ajax.get = function(url) {
	return Ajax.call(null, {
		method: 'get',
		url,
		data: {}
	})
}

Ajax.get('https://zs.cqupt.edu.cn/wcx_collegelist.ashx').then(console.log);

Ajax.post = function(url, data) {
	return Ajax.call(null, {
		method: 'post',
		url,
		data
	})
}

Ajax.post('http://hongyan.cqupt.edu.cn/redapi2/api/kebiao', {
	stuNum: '04121603',
}).then(console.log)