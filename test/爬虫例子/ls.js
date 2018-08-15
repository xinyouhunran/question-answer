var http = require("http");
var cheerio = require("cheerio");
var fs = require("fs");
var https = require("https");

http.get("http://www.szga.gov.cn", function (res) {
    var data = "";
    res.setEncoding('UTF8');
	
    // 处理流事件 --> data, end, and error
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        var $ = cheerio.load(data);
        var arr = [];
        //console.log(data);
        /*$("img").each(function(index,ele){
            console.log($(ele).attr("src"));
        })*/
        $("a").each(function(index,ele){
        	var str = $(ele).attr("href").replace(/^\./,"http://www.szga.gov.cn");
        	if(/^http:/.test(str)){
        		arr.push(str);
        	}
        })
        console.log(arr);
        http.get(arr[0],function(res1){
        	var data1 = "";
        	var arr2 = []
        	res1.setEncoding('utf-8');
        	
        	res1.on('data',chunk1=>{
        		data1+=chunk1;
        	});
        	res1.on('end',()=>{
        		$("img").each((index1,ele1)=>{
        			arr2.push($(ele1).attr("src"));
        		});
        		console.log(arr2[0]);
        		https.get(arr2[0],function(res2){
        			var writeStream1 = fs.createWriteStream('1.png');
        			res2.pipe(writeStream1);
        		})
        		var str = arr2.join(",");
        		/*console.log(str);*/
        		var writeStream = fs.createWriteStream('output.txt');
        		writeStream.write(str,'utf-8');
        		writeStream.end();
        	})
        })
    });
    
})
