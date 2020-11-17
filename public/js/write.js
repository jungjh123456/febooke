//  import {$boardList} from './board.mjs';
//  console.log($boardList);


// 게시판의 ul 이라고 생각하자
// let todos = [];

 const $registerBtn = document.querySelector('.register-btn');
 const $editorValue = document.querySelector('.editor');
 const $titleWrite = document.querySelector('.title-write');
 const $languageBox = document.querySelector('.language-box');
 const languageCheckBox = $languageBox.querySelectorAll('input');
 
 // ul
 const $boardList = document.querySelector('.board-list');
 const $label = $languageBox.querySelectorAll('label');
 console.log($label);



// const fetchTodo = () => {
// todos = [ {id: 1, title: 'SEO관점으로서의 접근', completed: true}]
    // render();
// }

//  const render = () => {

//      let listItem = '';
//      $boardList.forEach(element => {
         
//      });

//      listItem += 
//      `    <li> <a href="#">${titleWrite.value}</a>
//            <span class="author">주혀늬</span>
//            <time class="time">
//                <span class="year"></span>
//                <span class="month"></span>
//                <span class="date"></span>
//            </time>
//            <span class="click">38</span>
//        </li>`

//  }
let todos = [];

todos = [ {id: 1, title: 'SEO관점으로서의 접근', completed: true}];


 const addList = (title) => {
     // console.log(title); // 2. 강주현

    // 에디터에 작성한 것 + 기존 게시판 글 
    const newList = [{id: 3, title, completed: true}];
    // console.log(newList); // [ {id: 3, title: "강주현", completed: true}]
    todos = newList.concat(todos);
    console.log(todos);
    //  <- render 해야 함
 }



 // 등록버튼 클릭이벤트
 $registerBtn.onclick = () => {
    //  console.log(e.target);
     console.log('클릭했습니다'); // 1. 클릭했습니다.

     // 게시판의 ul의 li가 추가되는 함수 실행

     // 인수 = 제목의 값
     addList($titleWrite.value);
     // render();
 }

$label.onclick = (e) => {
   if(!e.target.matches('$languageBox > input')) return;


}


