// Load the full build.

// Load the core build.
// Load the FP build for immutable auto-curried iteratee-first data-last methods.

const $htmlCode = document.querySelector('.html-code');
const $cssCode = document.querySelector('.css-code')
const $jsCode = document.querySelector('.js-code');
const $textArea = document.querySelector('.text-area');
const $body = document.querySelector('body');

// 디바운스

const debounce = (callback, delay) => {
  let timerId;
  // debounce 함수는 timerId를 기억하는 클로저를 반환한다.
  return event => {
    // delay가 경과하기 이전에 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머를 재설정한다.
    // 따라서 delay보다 짧은 간격으로 이벤트가 발생하면 callback은 호출되지 않는다.
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};

// html 추가
let text = '';
let style = '';
let js = '';

// textarea html 생성
$htmlCode.oninput = debounce(e => {
  text = `
  ${e.target.value}
`
$textArea.innerHTML = text;
},300)

// htmlarea css 생성
$cssCode.oninput = debounce(e => {
  style = `
  <style>
    ${e.target.value}
  </style>
</head>`;
$textArea.innerHTML = style + text;
},300)

// // script 생성
// const $script = document.createElement('script');


// $jsCode.oninput = debounce(e => {
//  js = `
//   <script>${e.target.value}</script>`
//   $script.innerHTML = `${e.target.value}`;
//   $body.appendChild($script); 
 
// },300)

writeUserData()

function writeUserData(userId, name) {
  firebase.database().ref('users/' + userId ).set({
    username: name
  })
}


firebase.database().ref('users/').on('value', (snapshot) => {
  person = snapshot.val()
})