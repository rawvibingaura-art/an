/* ── SKILL CARDS: 3D TILT + PROGRESS COUNTER ── */
document.addEventListener("DOMContentLoaded", () => {

    /* ── Intersection Observer: trigger when cards enter viewport ── */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const card = entry.target;
            const idx  = parseInt(card.dataset.index);
            const fill = card.querySelector(".progress-fill");
            const pct  = card.querySelector(".skill-percent");
            const target = parseInt(pct.dataset.target);

            /* staggered entrance */
            setTimeout(() => {
                card.classList.add("in-view");

                /* animate progress bar */
                setTimeout(() => {
                    fill.style.width = fill.dataset.width;

                    /* count-up number */
                    let count = 0;
                    const step = Math.ceil(target / 60);
                    const timer = setInterval(() => {
                        count = Math.min(count + step, target);
                        pct.textContent = count + "%";
                        if (count >= target) clearInterval(timer);
                    }, 25);
                }, 400);

            }, idx * 130);

            observer.unobserve(card);
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".skill-card").forEach(c => observer.observe(c));

    /* ── 3D Magnetic Tilt ── */
    document.querySelectorAll(".skill-card").forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const cx   = rect.left + rect.width  / 2;
            const cy   = rect.top  + rect.height / 2;
            const dx   = (e.clientX - cx) / (rect.width  / 2);
            const dy   = (e.clientY - cy) / (rect.height / 2);

            const rotX = (-dy * 12).toFixed(2);
            const rotY = ( dx * 12).toFixed(2);
            const gX   = (50 + dx * 30).toFixed(1);
            const gY   = (50 + dy * 30).toFixed(1);

            card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`;
            card.querySelector(".card-glow").style.background =
                `radial-gradient(circle at ${gX}% ${gY}%, rgba(255,106,0,0.22), transparent 65%)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
            card.querySelector(".card-glow").style.background = "";
        });
    });
});