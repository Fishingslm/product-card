const STORAGE_KEY = "homework-15-users";
const TOTAL_COUNT_KEY = "homework-15-total-count";

const mainElement = document.querySelector("main");
const usersList = document.querySelector("#users-list");
const userTemplate = document.querySelector("#user-template");
const statusElement = document.querySelector("#status");
const getAllButton = document.querySelector("#get-all-button");
const deleteAllButton = document.querySelector("#delete-all-button");

let isLoading = false;

function getSavedUsers() {
  const savedUsers = localStorage.getItem(STORAGE_KEY);
  if (savedUsers === null) return null;

  const users = JSON.parse(savedUsers);
  if (!Array.isArray(users)) {
    throw new Error("В хранилище должен находиться массив пользователей");
  }

  return users;
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function fetchWithDelay(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(url).then(resolve).catch(reject);
    }, 2000);
  });
}

function setLoading(value) {
  isLoading = value;

  // При первой загрузке оставляем по центру только сообщение.
  mainElement.classList.toggle(
    "initial-loading",
    value && usersList.children.length === 0
  );

  document.querySelectorAll("button").forEach((button) => {
    button.disabled = value;
  });
}

function renderUsers(users) {
  usersList.innerHTML = "";

  users.forEach((user) => {
    const card = userTemplate.content.cloneNode(true);
    const cardElement = card.querySelector(".user-card");

    card.querySelector(".user-name").textContent = `${user.name} ${user.surname}`;
    card.querySelector(".user-id").textContent = user.id;
    card.querySelector(".user-email").textContent = user.email;
    card.querySelector(".user-age").textContent = user.age;

    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      deleteUser(user.id, cardElement);
    });

    usersList.appendChild(card);
  });
}

async function loadUsers() {
  if (isLoading) return;

  setLoading(true);
  statusElement.textContent = "Данные загружаются";

  try {
    const response = await fetchWithDelay("./users.json");

    if (!response.ok) {
      throw new Error(`Ошибка при загрузке данных: HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.users)) {
      throw new Error("В файле отсутствует массив users");
    }

    saveUsers(data.users);
    localStorage.setItem(TOTAL_COUNT_KEY, String(data.users.length));

    renderUsers(data.users);
    statusElement.textContent = "";
    if (data.users.length === 0) {
      statusElement.textContent = "В файле нет пользователей";
    }
  } catch (error) {
    statusElement.textContent = "Ошибка при загрузке данных";
    console.error(error);
  } finally {
    setLoading(false);
  }
}

function deleteUser(id, cardElement) {
  if (isLoading) return;

  try {
    const users = getSavedUsers();
    const remainingUsers = users.filter((user) => user.id !== id);

    saveUsers(remainingUsers);
    cardElement.remove();

    statusElement.textContent = "Карточка удалена";
    if (remainingUsers.length === 0) {
      statusElement.textContent = "Список пользователей пуст";
    }
  } catch (error) {
    statusElement.textContent = "Не удалось удалить карточку";
    console.error(error);
  }
}

function deleteAllUsers() {
  if (isLoading) return;

  try {
    const users = getSavedUsers();

    if (users === null) {
      statusElement.textContent = "Нет карточек для удаления";
      return;
    }

    if (users.length === 0) {
      statusElement.textContent = "Все карточки уже удалены";
      return;
    }

    // Пустой список сохраняем: после перезагрузки он остаётся пустым.
    saveUsers([]);
    renderUsers([]);
    statusElement.textContent = "Все карточки удалены";
  } catch (error) {
    statusElement.textContent = "Не удалось удалить карточки";
    console.error(error);
  }
}

function getAllUsers() {
  if (isLoading) return;

  try {
    const savedCount = localStorage.getItem(TOTAL_COUNT_KEY);
    const displayedCount = usersList.children.length;

    if (savedCount !== null && displayedCount === Number(savedCount)) {
      statusElement.textContent = "Все пользователи уже отображены";
      return;
    }

    loadUsers();
  } catch (error) {
    statusElement.textContent = "Не удалось проверить данные";
    console.error(error);
  }
}

function initialize() {
  try {
    const users = getSavedUsers();

    if (users === null) {
      loadUsers();
      return;
    }

    renderUsers(users);
    if (users.length === 0) {
      statusElement.textContent = "Список пользователей пуст";
    }
  } catch (error) {
    statusElement.textContent = "Ошибка чтения сохранённых данных";
    console.error(error);
  }

  setLoading(false);
}

getAllButton.addEventListener("click", getAllUsers);
deleteAllButton.addEventListener("click", deleteAllUsers);

initialize();
