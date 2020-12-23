export function sleep(ms: number) {
  var r: number = Date.now() + ms;
  while (Date.now() < r) {}
}

export function langformat (message: string, arr: Array<string>) {
    arr.forEach((element: string, index: number) => {
        message = message.replace(`%${index}$`, element);
    });
    return message;
}