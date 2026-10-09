document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    const closeMenu = () => {
      links.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.classList.toggle("active", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const current = document.body.dataset.page;
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.dataset.page === current) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll("a.watch-link").forEach((link) => {
    const match = link.href.match(
      /(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/
    );
    if (!match) return;

    const videoId = match[1];
    const originalText = link.textContent;
    let embed = null;

    link.addEventListener("click", (event) => {
      event.preventDefault();

      if (embed) {
        embed.remove();
        embed = null;
        link.textContent = originalText;
        return;
      }

      embed = document.createElement("div");
      embed.className = "video-embed";
      embed.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      link.insertAdjacentElement("afterend", embed);
      link.textContent = "▲ Hide demo";
    });
  });

  const newsToggle = document.getElementById("news-toggle");
  const extraNews = document.querySelectorAll(".news-item.news-extra");

  if (newsToggle && extraNews.length) {
    const count = extraNews.length;
    newsToggle.addEventListener("click", () => {
      const expanded = newsToggle.getAttribute("aria-expanded") === "true";
      extraNews.forEach((item) => item.classList.toggle("hidden", expanded));
      newsToggle.setAttribute("aria-expanded", String(!expanded));
      newsToggle.innerHTML = expanded
        ? `더보기 <span class="count">(+${count})</span> ↓`
        : `접기 ↑`;
    });
  }
});
