/***
[rewrite_local]

https?:\/\/ele\.chng\.com\.cn\/api\/ams\/lms\/learnlesson\/userlearnlesson\/uploadLearnData url script-request-body https://raw.githubusercontent.com/xulizhe666/js/main/exue.js

[mitm] 

hostname = ele.chng.com.cn
***/

let body = $request.body;

body = body.replace("\"finished\":0", "\"finished\":1");
body = body.replace("\"exitplaytime\":.*\,", "\"exitplaytime\":0\,");
body = body.replace("\"learntime\":.*\,", "\"learntime\":100\,");
console.log(body)

$notify('成功修改', body, `1`)
$done({body});
