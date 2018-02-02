/**
 * worker-js
 *
 * 用更简单的方式来创建 `Worker`
 */
module.exports = function(func) {
  var blobContent = `
onmessage=(
  function(func){
    return function(event){
      try{
        postMessage({data: func.apply(null, event.data)});
      } catch(e){
        postMessage({error: {name: e.name, message: e.message, stack: e.stack}});
      }
    };
  }
)(${func})`;
  var url = URL.createObjectURL(
    new Blob([blobContent])
  );
  return function() {
    var args = Array.prototype.slice.call(arguments);
    return new Promise(function(resolve, reject) {
      var worker = new Worker(url);
      worker.onmessage = function(event){
        if(event.data.error){
          reject(event.data.error);
        } else{
          resolve(event.data.data);
        }
        worker.terminate();
      };
      worker.postMessage(args);
    });
  };
};
