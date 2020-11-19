// 게시판의 ul 이라고 생각하자
let arr = [];

const $registerBtn = document.querySelector('.register-btn');
const $editor = document.querySelector('.editor');
const $titleWrite = document.querySelector('.title-write');
const $languageBox = document.querySelector('.language-box');

// ul
const $boardList = document.querySelector('.board-list');



const maxId = () => arr.length ? Math.max(...arr.map(item => item.id)) : 1;



// 등록버튼 클릭이벤트
$registerBtn.onclick = async (e) => {

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

    const res2 = await fetch('/users');
    arr = await res2.json();
    console.log(arr);
    // const test = arr.map(ar => ar.id)
    // console.log(test);
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
}