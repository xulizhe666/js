/******************************
[rewrite_local]
^https?:\/\/api-xcx-qunsou\.weiyoubot\.cn\/xcx\/ques\/v3\/detail\?access_token.*  script-response-body http://192.168.31.244:5244/d/ben/dati.js?sign=tnuAITutpJbXQCDkbkfLhurdU4PN3cwC4zpUoEqTYrI=:0
[mitm]
hostname = api-xcx-qunsou.weiyoubot.cn
*******************************/

const pythonServerIp = "YOUR_PYTHON_PC_IP";
const pythonServerPort = 8888;
const pythonServerEndpoint = "/receive_content";

let responseBody = $response.body;
let requestUrl = $request.url;

console.log(`[QuanX Script] Matched URL: ${requestUrl}`);
console.log(`[QuanX Script] Response Body Length: ${responseBody ? responseBody.length : 0}`);

if (!responseBody || responseBody.trim().length === 0) {
    console.warn(`[QuanX Script] Response body is empty or null for ${requestUrl}. Still attempting to send.`);
    responseBody = "";
}

let sendContentType = $response.headers['Content-Type'] || 'text/plain';
let sendData = responseBody;

if (sendContentType.includes('json') || responseBody.trim().startsWith('{') || responseBody.trim().startsWith('[')) {
    try {
        const parsedBody = JSON.parse(responseBody);
        sendData = JSON.stringify(parsedBody);
        sendContentType = 'application/json';
    } catch (e) {
        console.warn(`[QuanX Script] Failed to parse response body as JSON for ${requestUrl}. Sending as plain text. Error: ${e}`);
        sendContentType = 'text/plain';
    }
} else {
    sendContentType = 'text/plain';
}

fetch(`http://${pythonServerIp}:${pythonServerPort}${pythonServerEndpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': sendContentType,
            'X-From-QuanX': 'true',
            'X-Original-URL': encodeURIComponent(requestUrl)
        },
        body: sendData
    })
    .then(response => {
        if (!response.ok) {
            console.error(`[QuanX Script] Failed to send data to Python server. Status: ${response.status} ${response.statusText}`);
        } else {
            console.log(`[QuanX Script] Data for ${requestUrl} successfully sent to Python server.`);
        }
        return response.text();
    })
    .then(data => {
    })
    .catch(error => {
        console.error(`[QuanX Script] Error sending data to Python server for ${requestUrl}:`, error);
    });

$done($response);
