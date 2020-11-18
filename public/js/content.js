const $container = document.querySelector('.container');



let arr = [];

window.onload = async () => {

    const contentId = JSON.parse(sessionStorage.getItem('content'));
    const res = await fetch(`/board/${contentId.id}`);
    arr = await res.json();
    render(arr);

    // const res1 = await fetch(`/comment`, {
    //     method: "POST",
    //     headers: {'Content-Type': 'application/json' },
    //     body: 
    // })
 

   const res2 = await fetch(`/comment`);
    let arr1  = await res2.json();
    console.log(arr1)
    render2(arr1);

    render3(arr);
    const $commentBtn = document.querySelector('.comment-btn');
   
    
    $commentBtn.onclick = async e => {
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
                nickname: contentId.nickname
            })
        })
        console.log(await res.json())

    }


}


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
    <span class="comment-heading">댓글</span>
    <button class="comment-enrollment">등록순</button>
    <button class="comment-least">최신순</button>
    `

    })

    $container.innerHTML = html;
}


const render2 = (content) => {

    let html = '';

    [...content].forEach(item => {

        html += `<div class="comment">
        <span>${item.nickname}</span>
        <div class="comment-list">
        ${item.commented}
        </div>
      </div>`

    })

    $container.innerHTML += html;
}



const render3 = content => {

    let html = '';

    [content].forEach(item => {
        html += `<div class="comment-register">
        <span class="member">${item.nickname}</span>
        <textarea class="commenting">
  
  
        </textarea>
        <button class="comment-btn">등록</button>
      </div>`
    })
    $container.innerHTML += html;


}
