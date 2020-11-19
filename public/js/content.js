const $container = document.querySelector('.container');



let arr = [];

window.onload = async () => {




    const contentId = JSON.parse(sessionStorage.getItem('content'));



    const res = await fetch(`/board/${contentId.id}`);
    arr = await res.json();
    render(arr);


    const res2 = await fetch(`/comment`);
    let arr1 = await res2.json();
    render2(arr1);



    render3(arr);


    const $commentBtn = document.querySelector('.comment-btn');
    const $commentEnrollment = document.querySelector('.comment-enrollment');
    const $commentLeast = document.querySelector('.comment-least');
    const $commentModifyBtn = document.querySelector('.comment-modify-btn');


    $commentBtn.onclick = async e => {
        /*--------------------------버튼 누른 시각 함수----------------------------------------*/
        const padLeft = date => {
            if (date < 10) {
                return '0' + date;
            } else {
                return date + '';
            }
        }

        const format = a => {
            let yyyy = a.getFullYear();
            let month = padLeft(a.getMonth() + 1);
            let dd = padLeft(a.getDate());
            let HH = padLeft(a.getHours());
            let mm = padLeft(a.getMinutes());
            let ss = padLeft(a.getSeconds());

            let format1 = `${[yyyy, month, dd].join('-')} ${[HH, mm, ss].join(':')}`;

            return format1;
        }

        let dateTime = new Date();

        if (JSON.parse(sessionStorage.getItem('login'))) {
            const $commenting = document.querySelector('.commenting');

            const contentId = JSON.parse(sessionStorage.getItem('content'));
            console.log(contentId);
            const res = await fetch('/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    commented: $commenting.value,
                    nickname: contentId.nickname,
                    commentDate: format(dateTime)
                })
            })
            console.log(await res.json())
        } else {
            console.log('로그인이 필요합니다')
            let $div = document.querySelector('div')
        }

    }


    console.log($commentEnrollment);

    // 댓글 등록순을 클릭하면, 
    $commentEnrollment.onclick = async (e) => {

        e.preventDefault();
        console.log('클릭');
        console.log(e.target); // 등록순 버튼
        console.log(e.target.classList);




        // 클릭한 요소가 갖고있는 class 이름이 comment-enrollment 와 매치하는게 true라면
        if (e.target.matches('.comment-enrollment')) {

            // 게시글의 id를 세션스토리지에 저장했음.
            // 세션스토리지에 저장한 게시글의 id를 가져옴
            const res1 = await fetch(`/board/${contentId.id}`);

            // comment DB를 가져옴
            const res2 = await fetch('/comment');
            // comment DB를 제이슨으로 변환한(배열)걸 arr1 이라는 변수에 할당하고, 
            let arr1 = await res2.json();

            // 세션스토리지에 저장한 게시글의 id를 제이슨으로 변환한(객체)걸, arr 이라는 빈 배열에 삽입하고, 
            arr = await res1.json()

            // comment DB를 제이슨으로 변환한(배열)걸 arr1 이라는 변수에 할당한(배열)것의
            // id만 뽑아낸거랑 === 게시글의 id가 들어있는 객체의 프로퍼티키의 id의 값이 같은것만 뽑아내라
            arr1 = arr1.filter(item => item.commentId === arr.id);

            console.log(arr1);
            // 그 댓글들의 과거날짜순으로 정렬

        } else {
            // 게시글 번호 1 과 매칭되어있는 댓글들을 가져와서

            // 그 댓글들을 그냥 보여줌

        }
    }



    console.log($commentLeast);
    // 댓글 최신순을 클릭하면, 
    $commentLeast.onclick = (e) => {

        e.preventDefault();

        // 클릭한 요소의 class 이름이 commentLeast 맞는게 맞다면,
        if (e.target.classList === 'commentLeast') {
            // 게시글 번호 1 과 매칭되어있는 댓글들을 가져와서


            // 혹은 그 댓글들의 최근날짜순으로 정렬

        } else {
            // 게시글 번호 1 과 매칭되어있는 댓글들을 가져와서

            // 그 댓글들을 그냥 보여줌
        }

    }





}

/* 작성글 */
const render = (content) => {

    let html = '';

    [content].forEach(item => {

        html += `<span class="board-name">TECH Board</span>
        <h2 class="content-heading">${item.title}</h2>
    <div class="member-info">
      <span class="profile">프사</span>
      <div class="content-info">
        <span class="nickname">${item.nickname}</span>
        <span class="date">${item.time}</span>
      </div>
      <span class="click-count">${item.clickcount}</span>
    </div>
    <div class="content">${item.content}</div>
    
    <div class="comment-header">
    <span class="comment-heading">댓글</span>
    <button class="comment-enrollment">등록순</button>
    <button class="comment-least">최신순</button>
    </div>
    `

    })

    $container.innerHTML = html;
}

/* 댓글창 */
const render2 = (content) => {

    let html = '';

    [...content].forEach(item => {

        html +=
            `<div class="comment">
                <span>${item.nickname}</span>
                <button class="comment-modify-btn">수정</button>
                <button class="comment-delete-btn">삭제</button>
            <div class="comment-list">
                ${item.commented}
            </div>
            <div class="comment-date-info"> 
                <span class="comment-date">${item.commentDate}</span>
                <button class="comment-add-btn">답글쓰기</button>
            </div>
        </div>`

    })

    $container.innerHTML += html;
}


/*---------------------작성자 댓글 쓰기(로그인 한 사람)----------------------------*/
const render3 = content => {

    let html = '';

    [content].forEach(item => {
        html +=
            `<div class="comment-register">
            <span class="member">${item.nickname}</span>
            <textarea class="commenting">
  
  
            </textarea>
            <div class="comment-btn">
                <button class="comment-cancel-btn">취소</button>
                <button class="comment-enrollment-btn">등록</button>
            </div>
        </div>
            `
    })
    $container.innerHTML += html;


}