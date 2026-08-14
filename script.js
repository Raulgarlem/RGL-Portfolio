const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const timeline = document.querySelector(".timeline");

if (timeline) {
  const marker = document.createElement("div");
  marker.className = "timeline-marker";
  marker.setAttribute("aria-hidden", "true");
  marker.innerHTML = "<span><i></i></span>";
  timeline.prepend(marker);

  let previousScrollY = window.scrollY;
  let ticking = false;

  const updateTimeline = () => {
    const bounds = timeline.getBoundingClientRect();
    const viewportGuide = window.innerHeight * 0.55;
    const travel = Math.max(bounds.height, 1);
    const progress = Math.min(1, Math.max(0, (viewportGuide - bounds.top) / travel));
    const currentScrollY = window.scrollY;

    timeline.style.setProperty("--timeline-progress", `${(progress * 100).toFixed(2)}%`);
    timeline.classList.toggle("scrolling-up", currentScrollY < previousScrollY);
    timeline.classList.toggle("is-active", progress > 0 && progress < 1);

    previousScrollY = currentScrollY;
    ticking = false;
  };

  const requestTimelineUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateTimeline);
      ticking = true;
    }
  };

  window.addEventListener("scroll", requestTimelineUpdate, { passive: true });
  window.addEventListener("resize", requestTimelineUpdate);
  updateTimeline();
}
