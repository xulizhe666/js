
let obj = JSON.parse($response.body);
obj.data.premium_promo["settings"] = true;
$done({body: JSON.stringify(obj)});
