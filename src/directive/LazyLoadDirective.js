export default {
  mounted: (el) => {
    function loadImage() {
      // let slider_main = document.getElementById("slider_main"); // hide
      // let placeholder = document.getElementById("placeholder"); // visivble
      if (el) {
        // el.addEventListener("load", () => {
        //   setTimeout(() => {
        //   }, 100);
        // });
        el.addEventListener("error", () => console.log("error"));
        el.classList.add("fade_out");
        el.src = el.dataset.src;
        // placeholder.classList.add("hide");
        // slider_main.classList.remove("hide");
      }
    }

    function handleIntersect(entries, observer) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          loadImage();
          observer.unobserve(el);
        }
      });
    }

    function createObserver() {
      const options = {
        root: null,
        threshold: "0",
      };

      const observer = new IntersectionObserver(handleIntersect, options);

      observer.observe(el);
    }

    if (!window["IntersectionObserver"]) {
      loadImage();
    } else {
      createObserver();
    }
  },
};
