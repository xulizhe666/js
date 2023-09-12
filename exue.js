let body = $request.body;

body = body.replace("\"finished\": 0", "\"finished\": 1");
console.log(body)

$done({body});
