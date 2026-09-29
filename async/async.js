const STORAGE_KEY = "homework-15-users";
const TOTAL_COUNT_KEY = "homework-15-total-count";

const usersList = document.querySelector("#users-list");
const userTemplate = document.querySelector("#user-template");
const statusElement = document.querySelector("#status");
const getAllButton = document.querySelector("#get-all-button");
const deleteAllButton = document.querySelector("#delete-all-button");

let isLoading = false;

function setLoading(value) {
  isLoading = value;

  // При первой загрузке оставляем по центру только сообщение.
  document.querySelector("main").classList.toggle(
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

    card.querySelector(".user-name").textContent = `${user.name} ${user.surname}`;
    card.querySelector(".user-id").textContent = user.id;
    card.querySelector(".user-email").textContent = user.email;
    card.querySelector(".user-age").textContent = user.age;

    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      deleteUser(user.id);
    });

    usersList.appendChild(card);
  });
}

async function loadUsers() {
  if (isLoading) return;

  setLoading(true);
  statusElement.textContent = "Данные загружаются";

  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    const response = await fetch("./users.json");

    if (!response.ok) {
      throw new Error(`Ошибка при загрузке данных: HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.users)) {
      throw new Error("В файле отсутствует массив users");
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.users));
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

function deleteUser(id) {
  if (isLoading) return;

  try {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const remainingUsers = users.filter((user) => user.id !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(remainingUsers));
    renderUsers(remainingUsers);

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
    const savedUsers = localStorage.getItem(STORAGE_KEY);

    if (savedUsers === null) {
      statusElement.textContent = "Нет карточек для удаления";
      return;
    }

    const users = JSON.parse(savedUsers);

    if (users.length === 0) {
      statusElement.textContent = "Все карточки уже удалены";
      return;
    }

    // Пустой список сохраняем: после перезагрузки он остаётся пустым.
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
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
    const savedUsers = localStorage.getItem(STORAGE_KEY);

    if (savedUsers === null) {
      loadUsers();
      return;
    }

    const users = JSON.parse(savedUsers);

    if (!Array.isArray(users)) {
      throw new Error("В хранилище должен находиться массив пользователей");
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
