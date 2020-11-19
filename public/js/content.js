const $container = document.querySelector('.container');
const $containerMain = document.querySelector('.container-main');
const $containerChat = document.querySelector('.container-chat');
const $containerComment = document.querySelector('.container-comment');

let arr = [];

window.onload = async () => {
    const contentId = JSON.parse(sessionStorage.getItem('content'));
    const loginNickname = JSON.parse(sessionStorage.getItem('login'));
    const res = await fetch(`/board/${contentId.id}`);



    arr = await res.json();

    render(arr);

    const res2 = await fetch(`/comment`);
    let arr1 = await res2.json();

    arr1 = arr1.filter(item => item.commentId === arr.id);

    render2(arr1);

    render3(loginNickname);
    const $commentBtn = document.querySelector('.comment-btn');
    const $commentEnrollment = document.querySelector('.comment-enrollment');
    const $commentLeast = document.querySelector('.comment-least');
    const $commentModifyBtn = document.querySelector('.comment-modify-btn');
    const $commentDeleteBtn = document.querySelectorAll('.comment-delete-btn');
    const $written = document.querySelector('.written')


    if (loginNickname) {
        $written.classList.add('on')
    } else {
        $written.classList.remove('on')
    }

    $commentBtn.onclick = async e => {

        // console.log(JSON.parse(sessionStorage.getItem('login')))

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
            const redId = await fetch('/board');

            let arr3 = await redId.json();
            arr3 = arr3.map(item => item.id)

            const res = await fetch('/comment', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    commented: $commenting.value,
                    nickname: loginNickname.nickname,
                    commentDate: format(dateTime),
                    commentId: arr3.find(item => item === contentId.id)
                })
            })

        } else {
            console.log('로그인이 필요합니다')
            let $div = document.querySelector('div')
        }
        render2(arr1);

    }


    // 댓글 등록순을 클릭하면, 
    $commentEnrollment.onclick = async (e) => {
        e.preventDefault();
        // console.log('클릭');
        // console.log(e.target); // 등록순 버튼
        // console.log(e.target.classList);
        // // 클릭한 요소가 갖고있는 class 이름이 comment-enrollment(등록순) 와 매치하는게 true라면
        // if (e.target.matches('.comment-enrollment')) {
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
        const result = arr1.sort(item => item.commentDate);
        console.log(result); // <- 등록순
        render2(result)
        // } else{
        //     // 게시글 번호 1 과 매칭되어있는 댓글들을 가져와서
        //     // 그 댓글들을 그냥 보여줌
        //     console.log(arr1);
        //     render2(arr1)
        // }
    }



    // 댓글 최신순을 클릭하면, 
    $commentLeast.onclick = async (e) => {

        e.preventDefault();

        const res1 = await fetch(`/board/${contentId.id}`);

        const res2 = await fetch('/comment');

        let arr1 = await res2.json();
        arr = await res1.json()

        arr1 = arr1.filter(item => item.commentId === arr.id);

        const result2 = arr1.sort(item => item.commentDate).reverse();
        // console.log(result2); // <- 최신순
        render2(result2)
    }

    // console.log($commentModifyBtn); // <- 얘한테 돌아가면서 이벤트 등록해야 함
    console.log($commentDeleteBtn); // <- 얘한테 돌아가면서 이벤트 등록해야 함



    [...$commentDeleteBtn].forEach(item => item.onclick = async e => {
        console.log('클릭');
        console.log(e.target.id);

        const res = await fetch('/comment');
        arr = await res.json();
        console.log(arr)

        const removeId = arr.find(item => item.id === +e.target.id);
        if (loginNickname.nickname !== contentId.nickname) return;
        await fetch(`/comment/${removeId.id}`, {
            method: 'DELETE'
        });

        //개시글에 달린 id 댓글의 id  코멘트의 id
        // const res1 = await fetch(`/comment/${contentId.id}`, {
        //     method: 'DELETE'
        // });
        // sessionStorage.clear('comment')
    })

    /* 삭제 구현 */

    const $Delete = document.querySelector('.delete');
    $Delete.onclick = async e => {

        if (loginNickname.nickname === contentId.nickname) {
            await fetch(`/board/${contentId.id}`, {
                method: 'DELETE'
            });
            sessionStorage.removeItem('content')
            location.href = '../index.html'
        } else {
            console.log('아닙니다')
        }
    }

    /* 수정하기 구현 */

    const $modify = document.querySelector('.modify');

    $modify.onclick = async e => {
        e.preventDefault();
        console.log(e.target)
        if (loginNickname.nickname !== contentId.nickname) return;
        const res = await fetch(`/board/${contentId}`);
        arr = await res.json();
        console.log(arr);
        sessionStorage.setItem('rewrite', JSON.stringify(...arr))
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

    <div class="written">
    <button class="modify">수정</button>
    <button class="delete">삭제</button>
    </div>
  </div>    
    <div class="content">${item.content}
    
    </div>
    <div class="comment-header">
    <span class="comment-heading">댓글</span>
    <button class="comment-enrollment">등록순</button>
    <button class="comment-least">최신순</button>
    </div>
    `
    })
    $containerMain.innerHTML = html;
}



/* 댓글창 */
const render2 = (content) => {
    let html = '';

    const contentId = JSON.parse(sessionStorage.getItem('login'));

    [...content].forEach(item => {
        html +=
            `<div class="comment">
                <span>${item.nickname}</span>
                <button  class="comment-modify-btn">수정</button>
                <button id="${item.id}" class="comment-delete-btn">삭제</button>
            <div class="comment-list">
                ${item.commented}
            </div>
            <div class="comment-date-info"> 
                <span class="comment-date">${item.commentDate}</span>
                <button class="comment-add-btn">답글쓰기</button>
            </div>
        </div>`
    })
    $containerChat.innerHTML = html;

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

    $containerComment.innerHTML += html;
}