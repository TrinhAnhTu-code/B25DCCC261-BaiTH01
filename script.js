const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", function () {
    nav.classList.toggle("show");

    if (nav.classList.contains("show")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});


/* Đóng menu sau khi click vào link */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        nav.classList.remove("show");
        menuBtn.textContent = "☰";
    });
});


/* =========================
   2. DARK / LIGHT MODE
========================= */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";

        localStorage.setItem("theme", "dark");
    } else {
        themeBtn.textContent = "🌙";

        localStorage.setItem("theme", "light");
    }
});


/* Giữ lại giao diện sau khi reload */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
}


/* =========================
   3. SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });

});


/* =========================
   4. TÌM KIẾM / LỌC DỰ ÁN
========================= */

const searchInput = document.getElementById("projectSearch");
const filterSelect = document.getElementById("projectFilter");

const projectCards = document.querySelectorAll(".project-card");
const noResult = document.getElementById("noResult");


function filterProjects() {

    const keyword = searchInput.value.toLowerCase().trim();
    const category = filterSelect.value;

    let visibleProjects = 0;

    projectCards.forEach(function (project) {

        const title =
            project.dataset.title.toLowerCase();

        const categories =
            project.dataset.category.toLowerCase();

        const matchKeyword =
            title.includes(keyword);

        const matchCategory =
            category === "all" ||
            categories.includes(category);

        if (matchKeyword && matchCategory) {

            project.style.display = "block";
            visibleProjects++;

        } else {

            project.style.display = "none";

        }

    });


    if (visibleProjects === 0) {
        noResult.style.display = "block";
    } else {
        noResult.style.display = "none";
    }
}


searchInput.addEventListener("input", filterProjects);

filterSelect.addEventListener("change", filterProjects);


/* =========================
   5. VALIDATE FORM
========================= */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const subjectError =
        document.getElementById("subjectError");

    const messageError =
        document.getElementById("messageError");

    const formMessage =
        document.getElementById("formMessage");


    // Xóa lỗi cũ

    nameError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";
    messageError.textContent = "";
    formMessage.textContent = "";


    let isValid = true;


    /* Kiểm tra họ tên */

    if (name === "") {

        nameError.textContent =
            "Vui lòng nhập họ và tên.";

        isValid = false;

    } else if (name.length < 2) {

        nameError.textContent =
            "Họ tên phải có ít nhất 2 ký tự.";

        isValid = false;
    }


    /* Kiểm tra email */

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        emailError.textContent =
            "Vui lòng nhập email.";

        isValid = false;

    } else if (!emailRegex.test(email)) {

        emailError.textContent =
            "Email không đúng định dạng.";

        isValid = false;
    }


    /* Kiểm tra chủ đề */

    if (subject === "") {

        subjectError.textContent =
            "Vui lòng nhập chủ đề.";

        isValid = false;

    } else if (subject.length < 3) {

        subjectError.textContent =
            "Chủ đề phải có ít nhất 3 ký tự.";

        isValid = false;
    }


    /* Kiểm tra nội dung */

    if (message === "") {

        messageError.textContent =
            "Vui lòng nhập nội dung.";

        isValid = false;

    } else if (message.length < 10) {

        messageError.textContent =
            "Nội dung phải có ít nhất 10 ký tự.";

        isValid = false;
    }


    /* Kết quả */

    if (isValid) {

        formMessage.textContent =
            "Gửi tin nhắn thành công!";

        formMessage.style.color = "green";

        contactForm.reset();

        document.getElementById("charCount").textContent = "0";
    }

});


/* =========================
   6. ĐẾM KÝ TỰ
========================= */

const messageInput =
    document.getElementById("message");

const charCount =
    document.getElementById("charCount");


messageInput.addEventListener("input", function () {

    charCount.textContent =
        messageInput.value.length;

});


/* =========================
   7. SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


function revealOnScroll() {

    const windowHeight =
        window.innerHeight;

    revealElements.forEach(function (element) {

        const elementTop =
            element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {

            element.classList.add("active");

        }

    });

}


window.addEventListener("scroll", revealOnScroll);


/* Chạy lần đầu khi trang vừa mở */

revealOnScroll();


/* =========================
   8. HIỂN THỊ NĂM HIỆN TẠI
========================= */

const currentYear =
    document.getElementById("currentYear");

currentYear.textContent =
    new Date().getFullYear();
