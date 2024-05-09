const slider = document.querySelector('.client-reviews-slider');
const menuNav = document.querySelector('.menuNav');
const welcomeContainer = document.querySelector('.welcome-container');
const servicesContainer = document.getElementById('services-container');
const navVector = document.querySelector('.nav-vector');

const urlDiscord = 'https://discord.gg/nyEZmr63vt';
const urlDoc = 'https://docs.codingbots.com.br';
const urlInsta = 'https://instagram.com/codingbotsbr';
const urlYouTube = 'https://www.youtube.com/@CodingBots';

function categorias() {
    const links = {
        'INÍCIO': 'https://codingbots.com.br/',
        'SERVIÇOS': urlDiscord,
        'DOCUMENTAÇÃO': urlDoc
    };

    ['INÍCIO', 'SERVIÇOS', 'DOCUMENTAÇÃO'].forEach(categoria => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = links[categoria];
        a.textContent = categoria;
        li.appendChild(a);
        menuNav.appendChild(li);
    });
}

function scrollToTarget() {
    event.preventDefault();
    var targetElement = document.getElementById('service-title');
    var targetPosition = targetElement.getBoundingClientRect().top;
    var offset = -75;
    window.scrollTo({
        top: targetPosition + window.pageYOffset + offset,
        behavior: 'smooth'
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function events() {

    menuNav.addEventListener('click', event => {
        const alvo = event.target;
        if (alvo.tagName === 'A' && alvo.textContent === 'SERVIÇOS') {
            event.preventDefault();
            window.open(urlDiscord, '_blank');
        }

        if (alvo.tagName === 'A' && alvo.textContent === 'DOCUMENTAÇÃO') {
            event.preventDefault();
            window.location.href = urlDoc;
        }

        if (alvo.tagName === 'A' && alvo.textContent === 'INÍCIO') {
            scrollToTop();
        }
    });
}

let isDragging = false;
let startPosition = 0;
let startScrollLeft = 0;

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPosition = e.pageX;
    startScrollLeft = slider.scrollLeft;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.pageX - startPosition;
    slider.scrollLeft = startScrollLeft - deltaX;
});

slider.addEventListener('mouseleave', () => {
    isDragging = false;
});


function loginButtonClickHandler(event) {
    event.preventDefault();

    const overlay = $('#overlay');
    const loginModal = $('#loginModal');
    const usernameInput = $('#username');
    const passwordInput = $('#password');

    overlay.css('display', 'block').on('click', function(e) {
        if (e.target === this) {
            $(this).css('display', 'none');
            loginModal.removeClass('animate__animated animate__fadeIn');
            loginModal.css('display', 'none');
            usernameInput.val('');
            passwordInput.val('');
        }
    });

    loginModal.css({
        'display': 'block',
        'position': 'fixed',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%, -50%)',
        'z-index': '9999'
    }).addClass('animate__animated animate__fadeIn');

    $('.register').on('click', function(event) {
        event.preventDefault();
        var url = $(this).attr('href');
        window.open(url, '_blank');
    });

    $('.close').on('click', function() {
        overlay.css('display', 'none');
        loginModal.removeClass('animate__animated animate__fadeIn');
        loginModal.css('display', 'none');
        usernameInput.val('');
        passwordInput.val('');
    });
}

function loginButtonHandler() {
    const usernameInput = $('#username');
    const passwordInput = $('#password');
    const username = usernameInput.val();
    const password = passwordInput.val();

    if (!username || !password) {
        showNotification('Por favor, preencha todos os campos!', false);
        return;
    }

    fetch("http://181.215.254.155:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
            const dados = data.user;
            console.log(dados);
            showNotification('Logado com sucesso!', true);
        } else {
            console.error('Erro:', data.error);
            showNotification('Usuário ou senha inválidos!', false);
        }
    })
    .catch(() => {
        showNotification('Sistema indisponível! Tente novamente mais tarde!', false);
    });
}


function showNotification(message, isSuccess) {
    const notification = document.getElementById('notification');
    const iconSuccess = notification.querySelector('.notification-icon.success');
    const iconError = notification.querySelector('.notification-icon.error');
    const span = notification.querySelector('span');
    span.textContent = message;

    if (isSuccess) {
        iconSuccess.style.display = 'inline-block';
        iconError.style.display = 'none';
        notification.classList.remove('error');
        notification.classList.add('success');
    } else {
        iconSuccess.style.display = 'none';
        iconError.style.display = 'inline-block';
        notification.classList.remove('success');
        notification.classList.add('error');
    }

    notification.style.top = '50px';

    setTimeout(() => {
        notification.style.top = '-100px';
    }, 4000);
}

window.addEventListener('DOMContentLoaded', () => {
    categorias();
    events();
    $('.loginButton').on('click', loginButtonClickHandler);
    $('#loginForm').on('submit', function(event) {
        loginButtonClickHandler(event);
        loginButtonHandler();
    });
});
