// Splash screen timeout
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("splash").style.opacity = "0";
    document.getElementById("splash").style.visibility = "hidden";
    document.body.style.overflow = "auto";
  }, 1500);
});

// Infinite repeating typing effect
document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector(".main-content h1");
  const originalHtml = h1.innerHTML;
  const lines = originalHtml.split("<br>");

  // Clear and setup structure
  h1.innerHTML = "";
  const typedSpans = [];
  const fullTexts = [];

  lines.forEach((line, i) => {
    const lineDiv = document.createElement("div");
    lineDiv.className = "typed-line";
    const textSpan = document.createElement("span");
    textSpan.className = "typed-text";
    const text = line.trim();
    textSpan.textContent = text;
    fullTexts.push(text);
    textSpan.textContent = ""; // Start empty
    lineDiv.appendChild(textSpan);
    h1.appendChild(lineDiv);
    typedSpans.push(textSpan);
  });

  let currentCycle = 0;

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

  function startCycle() {
    // Reset all spans to empty
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


// Education data
const colleges = [
  {
    name: "Sri Chaitanya Technical Campus",
    class: "B.Tech - Artificial Intelligence and Machine Learning",
    logo: "college_logo.sctc.png",
    description:
      "Pursuing B.Tech in Artificial Intelligence and Machine Learning at (SCTC) Sri Chaitanya Technical Campus,  Hyderabad |  2025 – 2028  .",
  },
  {
    name: "Jayaprakash Narayan College Of Engineering",
    class: "Diploma - Computer Science",
    logo: "jpncelogo.jpg",
    description:
      "I completed my Diploma in Computer Science and Engineering at JPNCE, Mahabubnagar (2021–2025), achieving a CGPA of 8.25. During this period, I built strong technical and programming skills through practical and academic training.",
  },
  {
    name: "Modern High School (Mahaboobnagar)",
    class: "SSC - School",
    logo: "schoollogo.jpeg",
    description:
      "I Completed my Secondary School Certificate (SSC) from Modern High School, Mahabubnagar, studying from Grade I to X (2011–2021) and achieved a CGPA of 8.7. Built a strong academic foundation and essential learning skills.",
  },
];

// Initialize education section
const collegeList = document.getElementById("collegeList");
const collegeDescription = document.getElementById("collegeDescription");
const collegeName = document.getElementById("collegeName");
const collegeClass = document.getElementById("collegeClass");
const collegeLogo = document.getElementById("collegeLogo");
const collegeProfile = document.getElementById("collegeProfile");
const collegeRating = document.getElementById("collegeRating");
const ratingValue = document.getElementById("ratingValue");

let activeCard = null;

colleges.forEach((college, index) => {
  const card = document.createElement("div");
  card.className = "college-card";
  card.innerHTML = `
        <img src="${college.logo}" class="college-logo" alt="Logo">
        <div class="college-info">
          <div class="college-name">${college.name}</div>
          <div class="college-class">${college.class}</div>
        </div>`;

  card.addEventListener("click", () => {
    if (activeCard) activeCard.classList.remove("active");
    card.classList.add("active");
    activeCard = card;

    collegeDescription.textContent = college.description;
    collegeName.textContent = college.name;
    collegeClass.textContent = college.class;
    collegeLogo.src = college.logo;
    ratingValue.textContent = college.rating;
    collegeProfile.style.display = "flex";
    collegeRating.style.display = "flex";
  });

  // Activate first card by default
  if (index === 0) {
    card.click();
  }

  collegeList.appendChild(card);
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    const icon = document.querySelector(".menu-icon");
    const nav = document.getElementById("navbar");
    if (nav.classList.contains("active")) {
      icon.classList.remove("active");
      nav.classList.remove("active");
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Header background change on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".site-header");
  const splash = document.getElementById("splash");
  const splashHeight = splash.offsetHeight;

  if (window.scrollY > splashHeight - 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Also add this to your existing load event listener to handle initial state
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("splash").style.opacity = "0";
    document.getElementById("splash").style.visibility = "hidden";
    document.body.style.overflow = "auto";

    // Check initial scroll position
    const header = document.querySelector(".site-header");
    const splash = document.getElementById("splash");
    const splashHeight = splash.offsetHeight;

    if (window.scrollY > splashHeight - 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, 2000);
});

// Mobile menu toggle
const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  navbar.classList.toggle("active");

  document.body.style.overflow =
    navbar.classList.contains("active") ? "hidden" : "auto";
});

// Close menu when nav link clicked
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    menuIcon.classList.remove("active");
    navbar.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});


// Close menu when clicking on a link
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    const menuIcon = document.querySelector(".menu-icon");
    const navbar = document.querySelector(".navbar");

    if (navbar.classList.contains("active")) {
      menuIcon.classList.remove("active");
      navbar.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});


//model popup 
function showModal(type) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");

  const images = {
    "vspaze-offer": "vspaze-offer.png",
    "vspaze-certificate": "vspaze-certificate.png",
    "cognifyz-offer": "cognifyzofferletter.jpeg",
    "cognifyz-certificate": "cognifyz-certificate.png",
  };

  modalImg.src = images[type];
  modal.classList.remove("hidden");

  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  document.body.style.overflow = "auto";
}
document.body.appendChild(document.getElementById("modal"));


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

document
  .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
  .forEach((el) => {
    observer.observe(el);
  });
