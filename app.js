document.getElementById("searchButton").addEventListener("click", async () => {
  const playerName = document.getElementById("playerName").value;
  const playerCardDiv = document.getElementById("playerCard");

  // Очистить предыдущие результаты
  playerCardDiv.innerHTML = "";

  if (playerName) {
    try {
      // Получение данных игрока (замените URL на API Futbin или FutGG)
      const response = await fetch(
        `https://example.com/api/player?name=${playerName}`
      );
      const data = await response.json();

      // Проверка, есть ли данные
      if (data && data.player) {
        // Отображение данных игрока
        playerCardDiv.innerHTML = `
                  <h2>${data.player.name}</h2>
                  <img src="${data.player.image}" alt="${data.player.name}" />
                  <p>Общий рейтинг: ${data.player.rating}</p>
                  <button id="showDetailsButton">Подробнее</button>
                  <div id="details" style="display: none;">
                      <p>Скорость: ${data.player.speed}</p>
                      <p>Дриблинг: ${data.player.dribbling}</p>
                      <p>Защита: ${data.player.defense}</p>
                      <p>Цена: ${data.player.price}</p>
                      <p>Лучший стиль сыгранности: ${
                        data.player.bestChemistryStyle
                      }</p>
                      <p>Лучшие линковки: ${data.player.bestLinks.join(
                        ", "
                      )}</p>
                  </div>
              `;

        // Добавить обработчик для кнопки "Подробнее"
        document
          .getElementById("showDetailsButton")
          .addEventListener("click", () => {
            const detailsDiv = document.getElementById("details");
            detailsDiv.style.display =
              detailsDiv.style.display === "none" ? "block" : "none";
          });
      } else {
        playerCardDiv.innerHTML = "<p>Игрок не найден.</p>";
      }
    } catch (error) {
      console.error("Ошибка получения данных:", error);
      playerCardDiv.innerHTML = "<p>Произошла ошибка. Попробуйте еще раз.</p>";
    }
  } else {
    playerCardDiv.innerHTML = "<p>Пожалуйста, введите имя игрока.</p>";
  }
});
