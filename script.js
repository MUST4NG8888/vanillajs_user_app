const app = document.getElementById("wrapper");
const search = document.getElementById("search");
const spinner = document.getElementById("loading");

appState = {
  data: [],
};

// const searchData = (e) => {
//   let searchInput = e.target.value;
//   // const result = appState.data.find((user) => user.login == `${searchInput}`);
//     const test = Object.values(appState.data[0]).includes(`${searchInput}`);
// console.log(test)
// };

const searchData = (e) => {
  
  const filterString = e.target.value;
  const datas = appState.data;
  filteredData = datas.filter(function (data) {
    let testData = "";
    for (let i = 0; i < filterString.length; i++) {
      testData += data.login[i];
      if (testData === filterString) {
        return data;
      }
    }
  });
  wrapper.innerHTML = "";
  if (filteredData.length === 0 && e.target.value.length != 0) {
    wrapper.innerHTML = "Nothing found";
  }
  if (e.target.value.length === 0) {
    renderUsers(appState.data);
  }
  renderUsers(filteredData);
  console.log(filteredData);
};

const requestData = async () => {
  spinner.removeAttribute('hidden');
  let response = await fetch(`https://api.github.com/users`);
  let data = await response.json();
  spinner.setAttribute('hidden', '');
  appState.data = data;
};

const renderUsers = (data) => {
  for (let i = 0; i < data.length; i++) {
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

    userImg.src = data[i].avatar_url;
    userName.innerText = data[i].login;
    rank.innerText = `Rank: ${data[i].type}`;
    admin.innerText = `Admin: ${data[i].site_admin}`;

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
  renderUsers(appState.data);

};

search.addEventListener("input", (e) => {
  searchData(e);
});

init();