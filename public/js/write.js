// 게시판의 ul 이라고 생각하자
let arr = [];

const $registerBtn = document.querySelector('.register-btn');
const $editor = document.querySelector('.editor');
const $titleWrite = document.querySelector('.title-write');
const $languageBox = document.querySelector('.language-box');
const $Editor = document.querySelector('.editor')

// ul
const $boardList = document.querySelector('.board-list');
const reWirte = JSON.parse(sessionStorage.getItem('rewrite'));
console.log(reWirte)

const maxId = () => arr.length ? Math.max(...arr.map(item => item.id)) : 1;



// 등록버튼 클릭이벤트
$registerBtn.onclick = async (e) => {
 if($Editor.value === '') return;
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
if (!reWirte){
    const res2 = await fetch('/users');
    arr = await res2.json();
 
    console.log(sessionStorage.getItem('login'));
    let nickArr = JSON.parse(sessionStorage.getItem('login'));
    console.log(nickArr)

    const newList = {
        title: $titleWrite.value,
        content: $editor.value,
        id: maxId(),
        nickname: nickArr.nickname,
        time: format(dateTime),
        clickcount: 0,
    }
    // console.log(newList);

    const res = await fetch('/board', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newList)
    });
    // console.log(res);

    location.assign('../index.html')
} else {
    console.log('sdgds')
    const res = await fetch(`/board/${reWirte.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: $titleWrite.value, content: $editor.value})
    })
    sessionStorage.setItem('content',JSON.stringify({id: reWirte.id, nickname: reWirte.nickname}));
    location.assign('../../content.html');
    sessionStorage.removeItem('rewrite')
}
}


window.onload = () => {
    const writeName = JSON.parse(sessionStorage.getItem('rewrite'));
    if (writeName) {
        $titleWrite.value = writeName.title;
        $editor.value = writeName.content;
    } else {
        $titleWrite.value = '';
        $editor.value = '';
    }
}