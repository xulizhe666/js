/***
[rewrite_local]

https?:\/\/ele\.chng\.com\.cn\/api\/ams\/lms\/learnlesson\/userlearnlesson\/uploadLearnData url script-request-body https://github.com/xulizhe666/js/raw/main/exue.js

[mitm] 

hostname = ele.chng.com.cn
***/

let body = $request.body;

body = body.replace("\"finished\":0", "\"finished\":1");
body = body.replace("\"learntime\":.*\,", "\"learntime\":600\,");
console.log(body)

$notify('成功修改', '已完成', `1`)
$done({body});
