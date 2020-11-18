const $container = document.querySelector('.container');



let arr = [];

window.onload = async () => {
    const res = await fetch('/board');
    arr = await res.json();
    console.log(arr);
    render(arr);
}


const render = (content) => {

    let html = '';

    content.forEach(item => {

        html += `<h2 class="content-heading">${item.title}</h2>
    <div class="member-info">
      <span class="profile">프사</span>
      <div class="content-info">
        <span class="nickname">${item.nickname}</span>
        <span class="date">${item.time}</span>
      </div>
      <span class="click-count">${item.clickcount}</span>
    </div>
    <div class="content">${item.content}</div>`

    })

    $container.innerHTML += html;
}

