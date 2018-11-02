console.log('test');

const btn = document.getElementById('btn');

btn.onclick = () => {};
import(/* webpackChunkName:"hello" */ './subPageC').then(() => {
  console.log('hdfalsfdsa');
});

const btn1 = document.getElementById('btn1');

import(/* webpackChunkName:"lll" */ './subPageA').then(function(subPageA) {
  console.log(subPageA);
});

import('./subPageB').then(function(subPageB) {
  console.log(subPageB);
});
