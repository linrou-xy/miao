const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));

const mappedImage = document.querySelector("img[usemap]");
if (mappedImage) {
  const resizeMap = () => {
    if (!mappedImage.naturalWidth || !mappedImage.naturalHeight) return;
    const scaleX = mappedImage.clientWidth / mappedImage.naturalWidth;
    const scaleY = mappedImage.clientHeight / mappedImage.naturalHeight;
    document.querySelectorAll("area[data-coords]").forEach((area) => {
      const original = area.dataset.coords.split(",").map(Number);
      area.coords = original
        .map((value, index) =>
          Math.round(value * (index % 2 === 0 ? scaleX : scaleY)),
        )
        .join(",");
    });
  };
  mappedImage.addEventListener("load", resizeMap);
  window.addEventListener("resize", resizeMap);
  resizeMap();
}

const jumpMenu = document.querySelector("#jump-menu");
if (jumpMenu) {
  jumpMenu.addEventListener("change", (event) => {
    if (event.target.value) window.location.href = event.target.value;
  });
}

const form = document.querySelector("#interest-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = new FormData(form).get("name");
    const result = document.querySelector("#form-result");
    result.textContent = `${name}，预约信息已在本页生成。感谢你关注苗族服饰文化！`;
    result.classList.add("is-shown");
  });

  form.addEventListener("reset", () => {
    const result = document.querySelector("#form-result");
    result.textContent = "";
    result.classList.remove("is-shown");
  });
}
