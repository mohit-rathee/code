// I m learning from namaste javascript

function a() {
  for (let i = 0; i < 6; i++) {
    setTimeout(function () {
      if (i == 6) i = 1;
      console.log(i);
      i++;
    }, i * 1000);
  }
}

function magic(x) {
  setTimeout(function () {
    console.log(x);
  }, x * 1000);
}
function b() {
  for (let i = 0; i < 6; i++) {
    magic(i);
  }
}

function c() {
  for (let i = 0; i < 6; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
}

a();
b();
c();
