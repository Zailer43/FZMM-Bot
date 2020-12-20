exports.sleep = function sleep(ms) {
  var r = Date.now() + ms;
  while (Date.now() < r) {}
}

exports.langformat = function langformat (message, arr) {
    arr.forEach((element, index) => {
        message = message.replace(`%${index}$`, element);
    });
    return message;
}