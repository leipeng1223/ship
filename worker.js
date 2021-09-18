self.addEventListener('message', function (e) {
    var i = e.data;
    console.log('message:' + i)
    let file = '/slices/slice' + i + '.json'
    let request = new XMLHttpRequest();
    request.open("get", file);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            let json = JSON.parse(request.responseText);
            postMessage(json)
        }
    }
}, false);



// var data = {}
// for (i = 2; i <= 20; i++) {
//     let file = '/slices/slice' + i + '.json'
//     let request = new XMLHttpRequest();
//     request.open("get", file);
//     request.send(null);
//     request.onload = function () {
//         if (request.status == 200) {
//             console.log(i)
//             let json = JSON.parse(request.responseText);
//             postMessage(json)
//         }
//     }
// }

//postMessage(data);

// var data = {}

// var request = new XMLHttpRequest();
// request.open("get", "/slices/slice2.json");
// request.send(null);
// request.onload = function () {
//     if (request.status == 200) {
//         var json = JSON.parse(request.responseText);
//         Object.assign(data, json)
//     }
// }