const app = document.getElementById("wrapper");
const search = document.getElementById("search");

appState = {
  data: [],
};

const searchData = (e) => {
  let searchInput = e.target.value;
  const result = appState.data.find((user) => user.login == `${searchInput}`);
console.log(result)
};


const requestData = async () => {
  let response = await fetch(`https://api.github.com/users`);
  data = await response.json();
  appState.data = data;
};

const renderUsers = () => {
  for (let i = 0; i < appState.data.length; i++) {
    let userBox = document.createElement("div");
    userBox.id = "userbox";
    let userImg = document.createElement("img");
    userImg.id = "userimg";
    let userName = document.createElement("h4");
    userName.id = "username";
    let showBtn = document.createElement("button");
    showBtn.id = "showbtn";
    showBtn.innerText = "Show more";
    let rank = document.createElement("h5");
    rank.id = "rank";
    rank.style.display = "none";
    let admin = document.createElement("h5");
    admin.id = "admin";
    admin.style.display = "none";

    userBox.append(userImg);
    userBox.append(userName);
    userBox.append(showBtn);
    userBox.append(rank);
    userBox.append(admin);

    userImg.src = appState.data[i].avatar_url;
    userName.innerText = appState.data[i].login;
    rank.innerText = appState.data[i].type;
    admin.innerText = appState.data[i].site_admin;

    app.append(userBox);

    const fam = () => {
      rank.style.display = "none";
      admin.style.display = "none";
      showBtn.innerText = "Show more";
      showBtn.removeEventListener("click", fam);
      showBtn.addEventListener("click", foo);
    };

    const foo = () => {
      rank.style.display = "block";
      admin.style.display = "block";
      showBtn.innerText = "Show less";
      showBtn.removeEventListener("click", foo);
      showBtn.addEventListener("click", fam);
    };

    showBtn.addEventListener("click", foo);
  }
};

const init = async () => {
  await requestData();
  console.log(appState.data);
  renderUsers();
  search.addEventListener("input", (e) => {
    searchData(e);
  });
};

init();


