export default {
  mounted  : (el) => {
    function loadImage() {
      el.src = el.dataset.src;
      console.log("wtfs");
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
