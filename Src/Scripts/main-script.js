let body = document.querySelector("body");
let heroSectionVideo = document.querySelector(".hero-video video");

const heroSection = () => {
  gsap.to(heroSectionVideo, {
    // duration: 1,
    ease: "power2.inOut",
    width: "70%",
    scrollTrigger: {
      trigger: heroSectionVideo,
      scroll: body,
      scrub: 3,
      // markers: true,
      start: "20% 10%",
      end: "70% 80%",
    },
  });
};

const theMain = () => {
  heroSection();
};

const executioner = () => {
  theMain();
};

executioner();

function heading() {
  // Variables
  const width = 1950;
  const height = 400;
  let count = 100;
  const rowsize = 20;
  let dotsize = 6;
  const dotmin = 0.5;
  const dotsizebase = 8;

  // Calc
  const canvases = document.querySelectorAll(".CanvasDots");
  canvases.forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    // Add GSAP animation for smoother mouse enter
    gsap.to(canvas, {
      duration: 1,
      ease: "power4.inOut",
      onStart: () => {
        canvas.addEventListener("mousemove", (event) => {
          mouseOver(canvas, ctx, event);
        });
      },
    });
  });

  function mouseOver(canvas, ctx, event) {
    let PosX, PosY, LocX, LocY, GlobalX, GlobalY;
    PosX = getPositionX(event);
    PosY = getPositionY(event);

    LocX = canvas.getBoundingClientRect().left;
    LocY = canvas.getBoundingClientRect().top;

    GlobalX = PosX - LocX;
    GlobalY = PosY - LocY;

    ctx.clearRect(0, 0, width, height);

    let counter = 5.56;
    for (let ix = 4; ix <= count - 3; ix++) {
      for (let iy = 4; iy <= count - 3; iy++) {
        ctx.beginPath();
        const scaler = Math.hypot(
          GlobalX / rowsize - ix,
          GlobalY / rowsize - iy
        );
        dotsize = dotsizebase - scaler * 1.05;
        if (dotsize < dotmin) {
          dotsize = dotmin;
        }
        ctx.arc(rowsize * ix, rowsize * iy, dotsize, 0, 2 * Math.PI);
        counter *= 1.2;
        const nr = String(counter).charAt(2);
        ctx.fillStyle = "#fff";
        ctx.globalAlpha = 0.2;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    ctx.globalAlpha = 1; // Change opacity to 1
  }

  // Get X position of mouse
  function getPositionX(event) {
    return event.clientX;
  }

  // Get Y position of mouse
  function getPositionY(event) {
    return event.clientY;
  }
}

heading();

const warper = document.querySelector(".warper");

for (let i = 0; i < 7; i++) {
  warper.innerHTML += `<div class="swiper-slide">
  <div class="card">
    <div class=".caed-img" style="position: relative">
      <img draggable="false" style="border-radius: 6px; filter: blur(5px)" src="https://img.freepik.com/free-vector/abstract-vector-colorful-mesh-dark-background-futuristic-style-card-corrupted-point-sphere_1217-4940.jpg?t=st=1714383354~exp=1714386954~hmac=688461c9b359430054ffa4d93a4458509fc314222faa5850785e00497d4bddba&w=740" />
      <img draggable="false" style="border-radius: 3px" src="https://img.freepik.com/free-vector/abstract-vector-colorful-mesh-dark-background-futuristic-style-card-corrupted-point-sphere_1217-4940.jpg?t=st=1714383354~exp=1714386954~hmac=688461c9b359430054ffa4d93a4458509fc314222faa5850785e00497d4bddba&w=740" />
    </div>
    <div class="c-btm">
      <h1>Ninja H2R</h1>
      <h5>₹ 79, 00, 000</h5>
      <p>A precision-crafted, 998cc four-cylinder powerhouse, engineered for extreme performance.</p>
      <button>Check it Out</button>
    </div>
    </div>
  </div>`;
}

gsap.to(".warper", {
  left: "0", // Move the warper horizontally to the left
  scrollTrigger: {
    marker: true,
    start: "top 60%",
    end: "bottom 70%",
    trigger: ".warper",
    // scroller:'#page2',
    scrub: 2,
    ease: "power1.out",
  },
});

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 2.7,
  spaceBetween: 20,

  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});




window.addEventListener("DOMContentLoaded", () => {
  const blockContainer = document.getElementById('blocks');
  const blockSize = 20;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const numCols = Math.ceil(screenWidth / blockSize);
  const numRows = Math.ceil(screenHeight / blockSize);
  const numBlocks = numCols * numRows;

  function create() {
    for (let i = 0; i < numBlocks; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      block.dataset.index = i;
      block.addEventListener('mousemove', highlightRandomNeighbors);
      blockContainer.appendChild(block);
    }
  }

  function highlightRandomNeighbors(event) {
    const index = parseInt(event.target.dataset.index);
    const neighbors = [
      index - 1,
      index + 1,
      index - numCols,
      index + numCols,
      index - numCols - 1,
      index - numCols + 1,
      index + numCols - 1,
      index + numCols + 1,
    ].filter(
      (i) =>
        i >= 0 &&
        Math.abs((i % numCols) - (index % numCols)) <= 1
    );

    event.target.classList.add("highlight");
    setTimeout(() => {
      event.target.classList.remove('highlight');
    }, 500);

    shuffleArray(neighbors)
      .slice(0, 1)
      .forEach((nIndex) => {
        const neighbor = blockContainer.children[nIndex];
        if (neighbor) {
          neighbor.classList.add('highlight');
          setTimeout(() => {
            neighbor.classList.remove('highlight');
          }, 500);
        }
      });
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  create();
});
