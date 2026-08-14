const passportSkills = document.querySelector(".passport-skills");
const experienceCard = document.querySelector(".experience-card");

if (passportSkills && experienceCard) {
  const certificateCard = document.createElement("article");
  certificateCard.className = "certificate-card reveal";
  certificateCard.setAttribute("aria-labelledby", "certificate-title");
  certificateCard.innerHTML = `
    <div class="certificate-seal" aria-hidden="true"><span>AI</span></div>
    <div class="certificate-copy">
      <p class="certificate-kicker">AI Showcase Certificate</p>
      <h3 id="certificate-title">Certificate of Achievement</h3>
      <p>Awarded for excellence in AI project development</p>
      <p class="certificate-project"><b>Featured project</b> RememberMe: Voice-First AI for Family Coordination</p>
      <dl>
        <div><dt>Completed</dt><dd>July 2026</dd></div>
        <div><dt>Certificate ID</dt><dd>KANZ-CMP-723630CEDE</dd></div>
      </dl>
    </div>
    <div class="certificate-actions">
      <a class="certificate-link" href="assets/raul-garcia-lemus-ai-certificate.pdf" target="_blank" rel="noopener" aria-label="Open Raúl García Lemus AI certificate PDF">View certificate <span aria-hidden="true">↗</span></a>
      <a class="certificate-preview" href="assets/raul-garcia-lemus-ai-certificate.pdf" target="_blank" rel="noopener" aria-label="Open full AI Showcase certificate PDF">
        <img src="assets/ai-certificate-thumbnail.png" alt="Thumbnail of Raúl García Lemus AI Showcase certificate" width="760" height="587">
      </a>
    </div>
  `;
  experienceCard.before(certificateCard);
}

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
