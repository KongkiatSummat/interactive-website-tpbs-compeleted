// เริ่มต้น Icons
lucide.createIcons();

// ลงทะเบียน Plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Header Animation (Load ปุ๊บขึ้นปั๊บ)
gsap.to(".header-content", {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power3.out",
    delay: 0.2
});

// 2. Golden Line Animation (ยืดตามการ Scroll)
gsap.to(".golden-line", {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
        trigger: ".timeline-container",
        start: "top center",
        end: "bottom center",
        scrub: true
    }
});

// 3. Card Animations (Fade In ทีละใบ)
const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
    gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// 4. Parallax Ingredients Effect (ของลอยๆ)
const ingredients = document.querySelectorAll('.ingredient');
ingredients.forEach((item) => {
    const speed = item.getAttribute('data-speed');
    gsap.to(item, {
        y: -200 * speed,
        rotation: 360,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });
});const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// ------------------------------
// Video Animation Trigger
// ------------------------------
const videoSection = document.querySelector(".video-animate");

window.addEventListener("scroll", () => {
    if (videoSection && isInViewport(videoSection)) {
        videoSection.classList.add("active");
    }
});




// ------------------------------
// Export Growth Chart Animation (Improved Version)
// ------------------------------

// ------------------------------
// Export Growth Chart: init with zeros, then animate bars on scroll
// ------------------------------

const canvas = document.getElementById("exportChart"); // canvas element
let exportChart = null;

const exportYears = ["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"];
const exportValues = [4.1, 3.5, 5.2, 6.8, 4.9, -2.1, 7.4, 8.2, 5.7, 6.9];

// create an array of zeros same length as exportValues
const zeroValues = exportValues.map(() => 0);

function initChartWithZeros() {
    exportChart = new Chart(canvas, {
        type: "bar",
        data: {
            labels: exportYears,
            datasets: [{
                label: "อัตราการเติบโต (%)",
                data: zeroValues.slice(), // start all bars at 0
                backgroundColor: "#f4b350",
                borderColor: "#d98c00",
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: "#ffcf7a",
                hoverBorderColor: "#ffdca6",
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    backgroundColor: "rgba(0,0,0,0.85)",
                    titleColor: "#fff",
                    bodyColor: "#ffe5b0",
                    padding: 10
                },
                legend: { display: false }
            },
            scales: {
                x: { ticks: { color: "#333" }, grid: { display: false } },
                y: { ticks: { color: "#333" }, grid: { color: "rgba(0,0,0,0.06)" }, beginAtZero: true }
            },
            animation: {
                // delay per data item (staggered). Chart.js passes context where context.type === 'data'
                delay: function(context) {
                    if (context.type === 'data' && typeof context.dataIndex !== 'undefined') {
                        return context.dataIndex * 120; // 120ms stagger between bars
                    }
                    return 0;
                },
                duration: 800,
                easing: 'easeOutQuart'
            }
        }
    });
}

// helper: is canvas in viewport (trigger a bit earlier)
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight - 120;
}

let chartAnimated = false;

// init chart as zero immediately (so canvas is present)
document.addEventListener("DOMContentLoaded", () => {
    if (!canvas) return;
    initChartWithZeros();

    // if already visible on load, animate right away
    if (!chartAnimated && isInViewport(canvas)) {
        chartAnimated = true;
        // set real data and update (Chart.js will animate from zeros to real values, respecting the delay)
        exportChart.data.datasets[0].data = exportValues.slice();
        exportChart.update();
        const wrapper = document.querySelector(".chart-animate");
        if (wrapper) wrapper.classList.add("active");
    }
});

// on scroll: when canvas enters viewport, set real data and update once
window.addEventListener("scroll", () => {
    if (chartAnimated) return;
    if (!canvas) return;

    if (isInViewport(canvas)) {
        chartAnimated = true;
        // show wrapper animation class (if you use it)
        const wrapper = document.querySelector(".chart-animate");
        if (wrapper) wrapper.classList.add("active");

        // set dataset to real values and call update -> Chart.js will animate
        exportChart.data.datasets[0].data = exportValues.slice();
        exportChart.update();
    }
});


// สิ่งที่โลกมาองหาและไทยตอบได้
    
// สายอาหาร

const foodTypeData = {
    spicy: {
        title: "สายจัดจ้าน 🔥",
        img: "images/spicy.jpg",
        desc: "เผ็ด เปรี้ยว เค็มเข้มข้น เหมาะสำหรับคนรักความท้าทาย",
        blocks: [
            {
                color: "#ff3b30",
                icon: "🔥",
                title: "รสชาติประจำสายนี้",
                desc: [
                    "ชอบรสจัด เด็ดทุกสัมผัส",
                    "เป็นคนชอบลองของใหม่ อยู่ไม่อยู่นิ่ง"
                ]
            },
            {
                color: "#ff3b30",
                icon: "🍜",
                title: "เมนูที่ใช่",
                desc: [
                    "ต้มยำทะเล",
                    "ยำแซ่บ",
                    "แกงเผ็ด"
                ]
            }
        ]
    },

    soft: {
        title: "สายนุ่มละมุน 🧡",
        img: "images/soft.jpg",
        desc: "สายหวานนุ่ม ไม่เผ็ด ไม่จัด อารมณ์ละมุนๆ",
        blocks: [
            {
                color: "#ff9f0a",
                icon: "🧡",
                title: "รสชาติประจำสายนี้",
                desc: [
                    "อบอุ่น อ่อนโยน",
                    "ไม่เน้นจัดจ้าน"
                ]
            },
            {
                color: "#ff9f0a",
                icon: "🍲",
                title: "เมนูที่ใช่",
                desc: [
                    "แกงเขียวหวาน",
                    "ต้มจืดเต้าหู้"
                ]
            }
        ]
    },

    healthy: {
        title: "สายสุขภาพ 💚",
        img: "images/healthy.jpg",
        desc: "เน้นกินดี อยู่ดี สายคลีนตัวจริง",
        blocks: [
            {
                color: "#34c759",
                icon: "💚",
                title: "บุคลิกของสายนี้",
                desc: [
                    "มีวินัย ชอบวางแผน",
                    "ใส่ใจสุขภาพตัวเอง"
                ]
            },
            {
                color: "#34c759",
                icon: "🥗",
                title: "เมนูที่ใช่",
                desc: [
                    "สลัดอกไก่",
                    "ปลาย่าง",
                    "เมนูคลีนๆ"
                ]
            }
        ]
    },

    modern: {
        title: "สายทันสมัย ✨",
        img: "images/healthy.jpg",
        desc: "เน้นกินดี อยู่ดี สายคลีนตัวจริง",
        blocks: [
            {
                color: "#a734c7ff",
                icon: "💜",
                title: "บุคลิกของสายนี้",
                desc: [
                    "ครีเอทีฟ ไอเดียเยอะ ชอบของใหม่ไม่จำเจ"

                ]
            },
            {
                color: "#34c759",
                icon: "🥗",
                title: "เมนูที่ใช่",
                desc: [
                    "ผัดไทยฟิวชัน, เบอร์เกอร์ไทยสไตล์, ข้าวหน้าหมูไทย-เกาหลี"


                ]
            }
        ]
    }

};

function showFoodTypeDetail(type) {
    const data = foodTypeData[type];

    // ซ่อนหน้าเลือกสายอาหาร
    document.getElementById("foodTypeSelect").classList.add("hidden");

    // ใส่ข้อมูล
    document.getElementById("foodTypeTitle").innerHTML = data.title;
    document.getElementById("foodTypeDesc").innerHTML = data.desc;

    const img = document.getElementById("foodTypeImg");
    img.src = data.img;
    img.style.display = "block";

    const container = document.getElementById("foodDetailContainer");
    container.innerHTML = "";

    data.blocks.forEach(b => {
        container.innerHTML += `
            <div class="detail-box" style="border-left-color:${b.color}">
                <h3><span class="detail-icon">${b.icon}</span>${b.title}</h3>
                ${b.desc.map(text => `<p>${text}</p>`).join("")}
            </div>
        `;
    });

    // แสดงหน้ารายละเอียด
    document.getElementById("foodTypeDetail").classList.remove("hidden");
}

function backToFoodType() {
    // ซ่อนหน้ารายละเอียด
    document.getElementById("foodTypeDetail").classList.add("hidden");

    // แสดงหน้าเลือกสายอาหาร
    document.getElementById("foodTypeSelect").classList.remove("hidden");
}





// เมนูโปรด

// ข้อมูลเมนูทั้งหมด
const favFoodData = {
    padthai: {
        title: "ผัดไทย",
        img: "assets\images\favfooddetail\ผัดไทย_จานโปรด.png",
        history: "ผัดไทยเป็นอาหารไทยชื่อดังระดับโลก เกิดขึ้นในช่วงสงครามโลกครั้งที่ 2...",
        ingredients: [
            "เส้นจันท์",
            "เต้าหู้",
            "กุ้งสด",
            "หอมแดง",
            "ถั่วงอก",
            "ไข่",
            "น้ำมะขาม"
        ]
    },

    greencurry: {
        title: "แกงเขียวหวาน",
        img: "assets\images\favfooddetail\แกงเขียวหวาน_จานโปรด.png",
        history: "แกงเขียวหวานมีต้นกำเนิดในสมัยรัตนโกสินทร์ เป็นหนึ่งในแกงยอดนิยม...",
        ingredients: [
            "กะทิ",
            "พริกแกงเขียวหวาน",
            "ไก่",
            "ใบโหระพา",
            "มะเขือเปราะ",
            "พริกชี้ฟ้า"
        ]
    },

    tomkakai: {
        title: "ต้มข่าไก่",
        img: "assets\images\favfooddetail\ต้มข่าไก่_จานโปรด.png",
        history: "ส้มตำเป็นอาหารพื้นบ้านอีสานที่นิยมทั่วประเทศ มีหลากหลายสูตร...",
        ingredients: [
            "มะละกอดิบ",
            "มะเขือเทศ",
            "พริกสด",
            "กระเทียม",
            "ถั่วฝักยาว",
            "น้ำปลา",
            "น้ำมะนาว"
        ]
    },

    tomyum: {
        title: "ต้มยำกุ้ง",
        img: "assets\images\favfooddetail\ต้มยำกุ้ง_จานโปรด.png",
        history: "ต้มยำกุ้งเป็นซุปเผ็ดเปรี้ยวที่ได้รับความนิยมทั่วโลก...",
        ingredients: [
            "กุ้ง",
            "ตะไคร้",
            "ใบมะกรูด",
            "พริกสด",
            "เห็ดฟาง",
            "น้ำปลา",
            "มะนาว"
        ]
    },

    taipla: {
        title: "แกงไตปลา",
        img: "assets\images\favfooddetail\แกงไตปลา_จานโปรด.png",
        history: "ผัดไทยเป็นอาหารไทยชื่อดังระดับโลก เกิดขึ้นในช่วงสงครามโลกครั้งที่ 2...",
        ingredients: [
            "เส้นจันท์",
            "เต้าหู้",
            "กุ้งสด",
            "หอมแดง",
            "ถั่วงอก",
            "ไข่",
            "น้ำมะขาม"
        ]
    },

    redcurry: {
        title: "มัสมั่น",
        img: "assets\images\favfooddetail\แกงมัสมั่นไก่_จานโปรด.png",
        history: "แกงเขียวหวานมีต้นกำเนิดในสมัยรัตนโกสินทร์ เป็นหนึ่งในแกงยอดนิยม...",
        ingredients: [
            "กะทิ",
            "พริกแกงเขียวหวาน",
            "ไก่",
            "ใบโหระพา",
            "มะเขือเปราะ",
            "พริกชี้ฟ้า"
        ]
    },

    kaosoi: {
        title: "ข้าวซอย",
        img: "assets\images\favfooddetail\ข่าวซอย_จานโปรด.png",
        history: "ส้มตำเป็นอาหารพื้นบ้านอีสานที่นิยมทั่วประเทศ มีหลากหลายสูตร...",
        ingredients: [
            "มะละกอดิบ",
            "มะเขือเทศ",
            "พริกสด",
            "กระเทียม",
            "ถั่วฝักยาว",
            "น้ำปลา",
            "น้ำมะนาว"
        ]
    },

    stickyrice: {
        title: "ข้าวเหนียวมะม่วง",
        img: "assets\images\favfooddetail\ข้าวเหนียวมะม่วง_จานโปรด.png",
        history: "ต้มยำกุ้งเป็นซุปเผ็ดเปรี้ยวที่ได้รับความนิยมทั่วโลก...",
        ingredients: [
            "กุ้ง",
            "ตะไคร้",
            "ใบมะกรูด",
            "พริกสด",
            "เห็ดฟาง",
            "น้ำปลา",
            "มะนาว"
        ]
    }
};

function showFoodDetail(menu) {
    const selectPage = document.getElementById("favFoodSelect");
    const detailPage = document.getElementById("favFoodDetail");

    selectPage.classList.add("hidden");
    detailPage.classList.remove("hidden");

    const data = favFoodData[menu];

    document.getElementById("foodTitle").innerText = data.title;
    document.getElementById("foodImg").src = data.img;
    document.getElementById("foodHistory").innerText = data.history;

    const ul = document.getElementById("foodIngredients");
    ul.innerHTML = "";
    data.ingredients.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
    });
}

function backToMenu() {
    document.getElementById("favFoodDetail").classList.add("hidden");
    document.getElementById("favFoodSelect").classList.remove("hidden");
}



