// ================================
// SPLASH SCREEN
// ================================

window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const header = document.querySelector(".site-header");

  if (!splash) return;

  setTimeout(() => {
    splash.style.opacity = "0";
    splash.style.visibility = "hidden";
    document.body.style.overflow = "auto";

    // Set initial header state
    if (header) {
      const splashHeight = splash.offsetHeight;

      if (window.scrollY > splashHeight - 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  }, 1500);
});


// ================================
// INFINITE TYPING EFFECT
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector(".main-content h1");

  if (!h1) return;

  const originalHtml = h1.innerHTML;
  const lines = originalHtml.split("<br>");

  // Clear original content
  h1.innerHTML = "";

  const typedSpans = [];
  const fullTexts = [];

  // Create typing lines
  lines.forEach((line) => {
    const lineDiv = document.createElement("div");
    lineDiv.className = "typed-line";

    const textSpan = document.createElement("span");
    textSpan.className = "typed-text";

    const text = line.trim();

    fullTexts.push(text);

    textSpan.textContent = "";

    lineDiv.appendChild(textSpan);
    h1.appendChild(lineDiv);

    typedSpans.push(textSpan);
  });

  // Type one line
  function typeLine(index, callback) {
    if (index >= typedSpans.length) {
      if (callback) callback();
      return;
    }

    const span = typedSpans[index];
    const fullText = fullTexts[index];

    span.textContent = "";

    let i = 0;

    function addChar() {
      if (i < fullText.length) {
        span.textContent += fullText[i];
        i++;

        setTimeout(addChar, 80);
      } else {
        typeLine(index + 1, callback);
      }
    }

    addChar();
  }

  // Erase one line
  function eraseLine(index, callback) {
    if (index < 0) {
      if (callback) callback();
      return;
    }

    const span = typedSpans[index];

    let text = span.textContent;

    function removeChar() {
      if (text.length > 0) {
        text = text.slice(0, -1);
        span.textContent = text;

        setTimeout(removeChar, 50);
      } else {
        eraseLine(index - 1, callback);
      }
    }

    removeChar();
  }

  // Start typing cycle
  function startCycle() {
    typedSpans.forEach((span) => {
      span.textContent = "";
    });

    typeLine(0, () => {
      setTimeout(() => {
        eraseLine(typedSpans.length - 1, () => {
          setTimeout(startCycle, 500);
        });
      }, 3000);
    });
  }

  startCycle();
});


// ================================
// EDUCATION DATA
// ================================

const colleges = [
  {
    name: "Sri Chaitanya Technical Campus",
    class: "B.Tech - Artificial Intelligence and Machine Learning",
    logo: "college_logo.sctc.png",
    rating: "Currently Pursuing",
    description:
      "Pursuing B.Tech in Artificial Intelligence and Machine Learning at (SCTC) Sri Chaitanya Technical Campus, Hyderabad | 2025 – 2028."
  },

  {
    name: "Jayaprakash Narayan College Of Engineering",
    class: "Diploma - Computer Science",
    logo: "jpncelogo.jpg",
    rating: "CGPA: 8.25",
    description:
      "I completed my Diploma in Computer Science and Engineering at JPNCE, Mahabubnagar (2021–2025), achieving a CGPA of 8.25. During this period, I built strong technical and programming skills through practical and academic training."
  },

  {
    name: "Modern High School (Mahaboobnagar)",
    class: "SSC - School",
    logo: "schoollogo.jpeg",
    rating: "CGPA: 8.7",
    description:
      "I completed my Secondary School Certificate (SSC) from Modern High School, Mahabubnagar, studying from Grade I to X (2011–2021) and achieved a CGPA of 8.7. Built a strong academic foundation and essential learning skills."
  }
];


// ================================
// EDUCATION SECTION
// ================================

const collegeList = document.getElementById("collegeList");
const collegeDescription = document.getElementById("collegeDescription");
const collegeName = document.getElementById("collegeName");
const collegeClass = document.getElementById("collegeClass");
const collegeLogo = document.getElementById("collegeLogo");
const collegeProfile = document.getElementById("collegeProfile");
const collegeRating = document.getElementById("collegeRating");
const ratingValue = document.getElementById("ratingValue");

let activeCard = null;

if (collegeList) {
  colleges.forEach((college, index) => {
    const card = document.createElement("div");

    card.className = "college-card";

    card.innerHTML = `
      <img 
        src="${college.logo}" 
        class="college-logo" 
        alt="${college.name} logo"
      >

      <div class="college-info">
        <div class="college-name">
          ${college.name}
        </div>

        <div class="college-class">
          ${college.class}
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      // Remove previous active card
      if (activeCard) {
        activeCard.classList.remove("active");
      }

      // Activate selected card
      card.classList.add("active");
      activeCard = card;

      // Update profile
      if (collegeDescription) {
        collegeDescription.textContent = college.description;
      }

      if (collegeName) {
        collegeName.textContent = college.name;
      }

      if (collegeClass) {
        collegeClass.textContent = college.class;
      }

      if (collegeLogo) {
        collegeLogo.src = college.logo;
        collegeLogo.alt = `${college.name} logo`;
      }

      if (ratingValue) {
        ratingValue.textContent = college.rating || "";
      }

      if (collegeProfile) {
        collegeProfile.style.display = "flex";
      }

      if (collegeRating) {
        collegeRating.style.display = "flex";
      }
    });

    // Activate first card
    if (index === 0) {
      card.click();
    }

    collegeList.appendChild(card);
  });
}


// ================================
// MOBILE MENU
// ================================

const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active");
    navbar.classList.toggle("active");

    document.body.style.overflow =
      navbar.classList.contains("active")
        ? "hidden"
        : "auto";
  });
}


// Close mobile menu when clicking navigation link
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    if (menuIcon) {
      menuIcon.classList.remove("active");
    }

    if (navbar) {
      navbar.classList.remove("active");
    }

    document.body.style.overflow = "auto";
  });
});


// ================================
// SMOOTH SCROLL
// ================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      e.preventDefault();

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});


// ================================
// HEADER BACKGROUND ON SCROLL
// ================================

window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  const splash = document.getElementById("splash");

  if (!header) return;

  let splashHeight = 0;

  if (splash) {
    splashHeight = splash.offsetHeight;
  }

  if (window.scrollY > splashHeight - 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


// ================================
// MODAL POPUP
// ================================

function showModal(type) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");

  if (!modal || !modalImg) {
    console.error("Modal elements not found.");
    return;
  }

  const images = {
    "vspaze-offer": "vspaze-offer.png",
    "vspaze-certificate": "vspaze-certificate.png",
    "cognifyz-offer": "cognifyzofferletter.jpeg",
    "cognifyz-certificate": "cognifyz-certificate.png"
  };

  // Check if requested image exists
  if (!images[type]) {
    console.error(`No image found for modal type: ${type}`);
    return;
  }

  modalImg.src = images[type];

  modal.classList.remove("hidden");

  document.body.style.overflow = "hidden";
}


function closeModal() {
  const modal = document.getElementById("modal");

  if (!modal) return;

  modal.classList.add("hidden");

  document.body.style.overflow = "auto";
}


// ================================
// SCROLL REVEAL ANIMATION
// ================================

const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-scale"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");

          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  // Fallback for older browsers
  revealElements.forEach((element) => {
    element.classList.add("active");
  });
}