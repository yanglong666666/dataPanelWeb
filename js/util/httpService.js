let httpGetData = function(url,obj){
    return new Promise(function (resolve, reject) {
        const _address = "http://100.11.44.162:3000";
        // const _address = "http://localhost:3000";
        url = _address + url;
        console.log("---- url ----");
        console.log(url);
        $.getJSON(url, obj).done(function (res) {
          console.log("res",res);
          resolve(res);
        }).fail(function (jqxhr, textStatus, error) {
          console.log("---- error ----");
          console.log(error);
          reject(error);
        });
      });
}

export {
    httpGetData
}