var hello = "hello";
let hello2 = "hello2";
let timeoutPromise = new Promise((reslove, reject) => {
  setTimeout(() => {
    reslove("1 sec");
  }, 1000);
})

timeoutPromise.then(console.log);