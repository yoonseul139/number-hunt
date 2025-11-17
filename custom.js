//html요소 가지고 오기
//let 한 번만 쓰고 뒤에 콤마 찍어서 쭉 써도 됨
let result = document.querySelector("#result"),
  chance = document.querySelector("#chance"),
  user = document.querySelector("#user"),
  playBtn = document.querySelector("#play"),
  resetBtn = document.querySelector("#reset"),
  imgBox = document.querySelector(".imgBox img");
let chances = 5; //5번의 기회
let computerNum;
let history = []; //입력되는 숫자들을 배열에 넣음

// ----------------------------------------------------
// 📌 [추가된 부분 1] 하트 생성 함수
function createHearts(count) {
  return "❤️".repeat(count);
}

// 📌 [추가된 부분 2] 기회 표시 업데이트 함수
function updateChanceDisplay(currentChances) {
  if (currentChances > 0) {
    // ❤️❤️❤️❤️❤️ 형태로 표시
    chance.textContent = `${createHearts(currentChances)}`;
  } else {
    // 기회가 0일 때 (게임 오버 시)
    chance.textContent = `💔`;
  }
}
// ----------------------------------------------------

// random수
function randomNum() {
  computerNum = Math.floor(Math.random() * 100 + 1);
  console.log(computerNum);
}
randomNum();

// ----------------------------------------------------
// 📌 [추가된 부분 3] 초기 화면 하트 표시
updateChanceDisplay(chances);
// ----------------------------------------------------

function play() {
  let userNum = user.value;
  console.log(userNum);

  //입력한 숫자가 1미만(음수)이거나 100초과인 경우(101이상)인 경우 다시 숫자를 입력할 수 있도록 return
  if (userNum < 1 || userNum > 100) {
    // result.textContent = "1부터100까지의 숫자를 입력해주세요";
    result.innerHTML = `<p>1부터100까지의 숫자를 <br>입력해주세요~!</p>`;

    return;
  }
  //아래의 것들을 하기 전에 실행해야 됨
  //return문을 안 쓰면 한 번 훑고 아래로 내려가버림. <예> 500을 입력해도 down이라고 나옴
  //내려가지 못하고 play함수로 반환되도록 return을 씀

  //true이면 history에 내가 입력한 숫자가 있다,라는 의미(같은 숫자가 있는 경우)
  if (history.includes(userNum)) {
    result.innerHTML = `<p>이미 입력한 숫자입니다.<br> 다른 숫자를 입력해주세요</p>`;
    user.value = "";
    return;
  }

  //history배열에 user가 입력한 값userNum을 넣어라
  history.push(userNum);
  console.log(history);

  // 같은 숫자를 입력한 경우 숫자를 다시 입력할 수 있도록 return

  // 애니메이션 클래스 초기화
  imgBox.classList.remove("upAnim", "downAnim", "bingoAnim");
  result.classList.remove("popup");

  if (computerNum > userNum) {
    result.textContent = "up! up!";
    imgBox.src = "img/game2.png";
    imgBox.classList.add("upAnim");
  } else if (computerNum < userNum) {
    result.textContent = "down~ down~";
    imgBox.src = "img/game3.png";
    imgBox.classList.add("downAnim");
  } else if (computerNum == userNum) {
    result.textContent = "bingo~🎉🎉🎉";
    result.classList.add("popup");
    imgBox.src = "img/bingo.png";
    imgBox.classList.add("bingoAnim");

    playBtn.disabled = true; // 👈 정답 맞히면 바로 게임 종료
    return; // 👈 아래 코드(기회 차감)는 실행되지 않음
  } else {
    result.textContent = "숫자를 입력해주세요";
  }

  // result.classList.add("popup");

  chances--; //chances = chances -1;

  // ----------------------------------------------------
  // 📌 [변경/추가된 부분 4] 하트 이모지로 업데이트 (기존 chance.textContent 라인을 대체)
  updateChanceDisplay(chances);

  if (chances < 1) {
    playBtn.disabled = true; //버튼을 비활성화 시킴
    result.textContent = "GAME OVER";

    // 기존 chance.textContent = "남은찬스 : 없음"; 라인이 updateChanceDisplay(0) 호출로 대체됨
    imgBox.src = "img/game4.png";
  }
}

playBtn.addEventListener("click", play);
//play()는 자동으로 함수를 호출함. 그래서 빈 칸일 때도 자동으로 콘솔에 찍힘
//클릭했을 때 함수를 호출하고 싶다면 play 뒤에 ()를 빼야 됨

user.addEventListener("focus", () => {
  user.value = "";
});

//게임 초기화
resetBtn.addEventListener("click", reset);

function reset() {
  // 1. 새로운 랜덤 숫자 생성
  randomNum();

  // 2. 기회 초기화
  chances = 5;
  // ----------------------------------------------------
  // 📌 [변경/추가된 부분 5] reset 시 하트 이모지로 초기화 (기존 chance.textContent 라인을 대체)
  updateChanceDisplay(chances);
  // ----------------------------------------------------

  // 3. 결과 초기화
  result.textContent = "꼭꼭 숨은 숫자 찾기~!";

  // ✅ 애니메이션 클래스 제거
  imgBox.classList.remove("upAnim", "downAnim", "bingoAnim", "shakeAnim");
  result.classList.remove("popup");

  // 4. 입력창 초기화
  user.value = "";

  // 5. 이미지 초기화 (원하는 기본 이미지로 변경 가능)
  imgBox.src = "img/game1.png";

  // 6. play 버튼 다시 활성화
  playBtn.disabled = false;

  // 7. 입력 기록 초기화
  history = [];

  console.log("게임이 초기화되었습니다. 새로운 숫자가 생성됨:", computerNum);
}
