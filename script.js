// --- MOBILE NAV TOGGLE ---
const mobileToggle = document.getElementById('mobile-nav-toggle');
const navMenuBar = document.getElementById('nav-menu-bar');

if (mobileToggle && navMenuBar) {
    mobileToggle.addEventListener('click', () => {
        navMenuBar.classList.toggle('show');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            if (navMenuBar.classList.contains('show')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        }
    });

    // Close menu when a link is clicked
    const navLinks = navMenuBar.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenuBar.classList.remove('show');
            const icon = mobileToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });
}

// --- 7-DAY BUFFER INTERACTIVE TIMELINE ---
const timelineNodes = document.querySelectorAll('.timeline-node');
const timelineBar = document.getElementById('active-timeline-bar');
const detailsTitle = document.getElementById('details-box-title');
const detailsText = document.getElementById('details-box-text');

const bufferContent = {
    "7": {
        title: "7 Days Before Deadline: Core Working Code",
        text: "All core features are fully programmed and functional. I complete the main logical architecture of the application by this stage, establishing a secure, working baseline.",
        barWidth: "0%"
    },
    "5": {
        title: "5 Days Before Deadline: Edge Cases & Debugging",
        text: "Deep testing begins. I hunt for unexpected user inputs, edge cases, mobile viewport overflows, and boundary value errors, cleaning up the validation logic.",
        barWidth: "33%"
    },
    "3": {
        title: "3 Days Before Deadline: Optimization & Refactoring",
        text: "Refactoring for clean architecture. I clean up duplicate code, optimize rendering/logic paths, check variable scopes, and format CSS and JavaScript to standard guidelines.",
        barWidth: "66%"
    },
    "1": {
        title: "1 Day Before Deadline: Final Sandbox Run",
        text: "Verifying project compliance. I run lint tests, build the final packages, check console diagnostics, and perform a dry run of the application on a separate user setup.",
        barWidth: "100%"
    },
    "0": {
        title: "Deadline Day (D-Day): Perfect, Stress-Free Submission",
        text: "The project is delivered 100% complete and polished, way ahead of standard last-minute crunches. This ensures code quality, robust operations, and peace of mind.",
        barWidth: "100%"
    }
};

if (timelineNodes.length > 0 && timelineBar && detailsTitle && detailsText) {
    // Helper function to update node state
    function updateTimeline(day) {
        const data = bufferContent[day];
        if (!data) return;

        // Fade effect for panel
        const panel = document.getElementById('timeline-details-box');
        if (panel) {
            panel.style.opacity = '0.3';
            panel.style.transform = 'translateY(10px)';
        }

        setTimeout(() => {
            detailsTitle.textContent = data.title;
            detailsText.textContent = data.text;
            timelineBar.style.width = data.barWidth;

            if (panel) {
                panel.style.opacity = '1';
                panel.style.transform = 'translateY(0)';
            }
        }, 150);

        // Highlight nodes
        let passedCurrent = false;
        timelineNodes.forEach(node => {
            const nodeDay = node.getAttribute('data-day');
            
            // Handle node classes
            node.classList.remove('active', 'reached');
            
            if (nodeDay === day) {
                node.classList.add('active');
                passedCurrent = true;
                if (day === "0") {
                    node.classList.add('reached');
                }
            } else if (!passedCurrent) {
                node.classList.add('active', 'reached');
            }
        });
    }

    // Attach click events
    timelineNodes.forEach(node => {
        node.addEventListener('click', () => {
            const day = node.getAttribute('data-day');
            updateTimeline(day);
        });
    });

    // Initialize timeline to Day -7
    updateTimeline("7");
}

// --- CONTACT FORM SUBMISSION ---
// Form submissions are handled natively via POST to FormSubmit.co. No JavaScript override needed.

// --- ENTRANCE ANIMATION (SCROLL OBSERVER) ---
// Add simple class transitions to make elements feel alive
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Track headings and cards
    const elementsToAnimate = document.querySelectorAll('.focus-card, .project-card, .value-point, .timeline-details-panel, .contact-card');
    
    // Add transition styling dynamically
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        animateOnScroll.observe(el);
    });
});

// Dynamic injection of scroll animation class
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .scroll-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(styleSheet);
