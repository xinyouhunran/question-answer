//编辑器配置
			function editorConfig(editor){
				// 或者 var editor = new E( document.getElementById('editor') )
				editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
				// editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
				// 隐藏“网络图片”tab
				editor.customConfig.showLinkImg = false;
				editor.customConfig.pasteFilterStyle = false; //使粘贴文本保留样式
				editor.customConfig.fontNames = [
						'宋体',
						'微软雅黑',
						'Arial',
						'Tahoma',
						'Verdana',
						'Times New Roman'
					],
					editor.customConfig.colors = [
						'#000000',
						'#eeece0',
						'#1c487f',
						'#4d80bf',
						'#c24f4a',
						'#8baa4a',
						'#7b5ba1',
						'#46acc8',
						'#f9963b',
						'#ffffff',
						'#cccccc',
						'#eeeeee',
						'#aaaaaa'
					]
				//上传图片到服务器的配置
				// 配置服务器端地址
				/*editor.customConfig.uploadImgServer = '/upload';*/
				editor.customConfig.uploadFileName = 'yourFileName';
				editor.customConfig.uploadImgHeaders = {
					'Accept': 'text/x-json'
				}
				// 将图片大小限制为 3M
				editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
				//限制一次最多能传几张图片
				//默认为 10000 张（即不限制），需要限制可自己配置
				// 限制一次最多上传 5 张图片
				editor.customConfig.uploadImgMaxLength = 5;
				editor.customConfig.uploadImgHooks = {
					before: function(xhr, editor, files) {
						// 图片上传之前触发
						// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
		
						// 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
						// return {
						//     prevent: true,
						//     msg: '放弃上传'
						// }
					},
					success: function(xhr, editor, result) {
						// 图片上传并返回结果，图片插入成功之后触发
						// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
					},
					fail: function(xhr, editor, result) {
						// 图片上传并返回结果，但图片插入错误时触发
						// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
					},
					error: function(xhr, editor) {
						// 图片上传出错时触发
						// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
					},
					timeout: function(xhr, editor) {
						// 图片上传超时时触发
						// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
					},
		
					// 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
					// （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
					customInsert: function(insertImg, result, editor) {
						// 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
						// insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
		
						// 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
						var url = result.url
						insertImg(url)
		
						// result 必须是一个 JSON 格式字符串！！！否则报错
					}
		
				}
		
				/*editor.customConfig.customUploadImg = function (files, insert) {
				    // files 是 input 中选中的文件列表
				    // insert 是获取图片 url 后，插入到编辑器的方法
				
				    // 上传代码返回结果之后，将图片插入到编辑器中
				    insert(imgUrl)
				}*/
		
				//文本内容改变时触发，但是js改变的内容不会触发
				editor.customConfig.onchange = function(html) {
					// html 即变化之后的内容
					/*console.log(editor.$textElem[0]);*/
					var myedit = editor.$textElem[0];
					var myId = editor.textElemId; //获取编辑区的id
					//console.log(editor.txt.html());
					var m = $('#' + myId + '');
					//当检测到上传了音频，则让它加上控价
					if(m.find("audio")) {
						m.find("audio").attr("controls", "controls");
					}
				}
				editor.create();
				
			}