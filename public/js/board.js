let arr = [];

//글쓰기 버튼
const $writeBtn = document.querySelector(".write-btn");
const $boardList = document.querySelector(".board-list");

// login check
const $loginCheck = document.querySelector(".login-check");
const $btnGroup = document.querySelector(".btn-group");
const $selectOption = document.querySelector(".select-option");

$writeBtn.onclick = () => {
  if (!sessionStorage.getItem("login")) {
    console.log("login이 필요합니다.");
    $loginCheck.classList.add("on");
    $btnGroup.onclick = (e) => {
      if (e.target.matches(".btn-yes")) location.assign("../signin.html");
      else if (e.target.matches(".btn-no")) $loginCheck.classList.remove("on");
    };
  } else {
    window.location.href = "./write.html";
  }
};

window.onload = async (e) => {
  const res = await fetch("/board");
  arr = await res.json();
  console.log(arr); // <- 배열안에 객체

  render(arr);
};

$selectOption.onchange = async (e) => {
  // if(최근 날짜순을 클릭했다면)
  if (e.target.value === "least-date") {
    const res2 = await fetch("/board?_sort=id,views&_order=desc,asc");
    const least = await res2.json();
    console.log(least); // <- board db json (배열안에 객체)
    render(least);
  }
  // // if(과거 날짜순을 클릭했다면)
  else if (e.target.value === "last-date") {
    const res3 = await fetch("/board");
    const last = await res3.json();
    console.log(last); // <- board db json (배열안에 객체)
    render(last);
  } else if (e.target.value === "high") {
    console.log(e.target.value);
    const res4 = await fetch("/board/?_sort=clickcount&_order=desc");
    const high = await res4.json();
    console.log(high); // <- board db json (배열안에 객체)
    render(high);
  } else if (e.target.value === "row") {
    const res5 = await fetch("/board/?_sort=clickcount&_order=asc");
    const row = await res5.json();
    console.log(row); // <- board db json (배열안에 객체)
    render(row);
  } else if (e.target.value === "my-content") {
    const res6 = await fetch("/board/");
    arr = await res6.json();

    const LoginUser = JSON.parse(sessionStorage.getItem("login"));
    arr = arr.filter((item) => item.nickname === LoginUser.nickname);

    console.log(arr);
    render(arr);
    // console.log(myContent); // <- board db json (배열안에 객체)
    // render(myContent);
  }
};

const render = async (todo) => {
  let html = "";

  [...todo].forEach((list) => {
    html += `<li id="${list.id}">
      <a href="#">${list.title}</a>
      <span class="author">${list.nickname}</span>
      <time class="time">
        ${list.time}
          <span class="year"></span>
          <span class="month"></span>
          <span class="date"></span>
      </time>
      <span class="click">${list.clickcount}</span>
  </li>`;
  });
  $boardList.innerHTML = html;
};

$boardList.onclick = async (e) => {
  e.preventDefault();
  let counter = 1;

  const res = await fetch("/board");
  arr = await res.json();

  const clickcounter = arr.find((item) => item.id === +e.target.parentNode.id);

  console.log(clickcounter);
  console.log(e.target.parentNode);
  await fetch(`/board/${e.target.parentNode.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ clickcount: clickcounter.clickcount + counter }),
  });

  console.log(counter);
  render(arr);
};
