const slider = document.querySelector('.client-reviews-slider');
const menuNav = document.querySelector('.menuNav');
const welcomeContainer = document.querySelector('.welcome-container');
const servicesContainer = document.getElementById('services-container');
const navVector = document.querySelector('.nav-vector');

const urlDiscord = 'https://discord.gg/nyEZmr63vt';
const urlDoc = 'https://docs.codingbots.com.br';

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

function adicionarOuvintesRedesSociais() {
    const redesSociais = [
        { icon: document.querySelector('.social-icon:nth-child(1)'), link: urlDiscord },
        { icon: document.querySelector('.social-icon:nth-child(2)'), link: 'https://www.instagram.com/codingbotsbr/' }
    ];

    redesSociais.forEach(rede => {
        if (rede.icon) {
            const linkElement = document.createElement('a');
            linkElement.href = rede.link;
            linkElement.target = '_blank';
            rede.icon.appendChild(linkElement);

            rede.icon.addEventListener('click', () => {
                window.open(rede.link, '_blank');
            });
        }
    });
}

function bemVindo() {
    if (welcomeContainer) {
        const messages = [
            'Aqui você tem a automação de servidor',
            'Discord com integração perfeita ao FiveM.'
        ];

        const arrow = document.createElement('div');
        arrow.classList.add('arrow');
        arrow.innerHTML = '&#9660;';

        const elements = [
            { tag: 'img', src: 'images/robocoding.png', alt: 'Robô CodingBots', className: 'welcome-image' },
            { tag: 'h1', textContent: 'Seja bem-vindo à', className: 'welcome-greeting' },
            { tag: 'h1', textContent: 'CodingBots', className: 'welcome-title' },
            { tag: 'h1', textContent: messages[0], className: 'welcome-message' },
            { tag: 'h1', textContent: messages[1], className: 'welcome-message2' },
            { element: arrow, listener: arrowClickHandler }
        ];

        elements.forEach(item => {
            const element = document.createElement(item.tag || item.element.tagName);
            if (item.tag) {
                if (item.src) element.src = item.src;
                if (item.alt) element.alt = item.alt;
                if (item.textContent) element.textContent = item.textContent;
                if (item.className) element.classList.add(item.className);
            } else {
                if (item.listener) item.element.addEventListener('click', item.listener);
            }
            welcomeContainer.appendChild(element);
        });
    }
}

function arrowClickHandler() {
    const scrollToPoint = document.querySelector('#services-container');
    if (scrollToPoint) {
        scrollToPoint.scrollIntoView({ behavior: 'smooth' });
    }
}

function createServiceCategory() {
    const serviceCategory = document.createElement('div');
    serviceCategory.classList.add('service-category');

    const elements = [
        { tag: 'div', className: 'service-image', children: [{ tag: 'img', src: 'images/service.png', alt: 'Imagem do Serviço' }] },
        { tag: 'div', className: 'service-details', children: [
            { tag: 'h2', textContent: 'O QUE NOSSO BOT OFERECE?', className: 'service-title' },
            { tag: 'p', innerHTML: 'Oferecemos um conjunto abrangente de <b>soluções automatizadas</b> para <b>servidores</b><br>' +
                                       '<b>FiveM</b>, incluindo sistemas de whitelist, tickets, transcrições, conectividade,<br>' +
                                       'anúncios, changelog, gerenciamento de jogadores, registros de entrada/saída e muito<br>' +
                                       'mais, <b>integrados perfeitamente ao Discord.</b>', className: 'service-description' },
            { tag: 'a', textContent: 'ASSINAR AGORA', className: 'service-cta' }
        ]}
    ];

    elements.forEach(item => {
        const element = document.createElement(item.tag);
        if (item.className) element.classList.add(item.className);
        if (item.textContent) element.textContent = item.textContent;
        if (item.innerHTML) element.innerHTML = item.innerHTML;
        if (item.children) {
            item.children.forEach(child => {
                const childElement = document.createElement(child.tag);
                if (child.className) childElement.classList.add(child.className);
                if (child.textContent) childElement.textContent = child.textContent;
                if (child.innerHTML) childElement.innerHTML = child.innerHTML;
                if (child.src) childElement.src = child.src;
                if (child.alt) childElement.alt = child.alt;
                element.appendChild(childElement);
            });
        }
        serviceCategory.appendChild(element);
    });

    return serviceCategory;
}

function addServiceCategory() {
    const serviceCategory = createServiceCategory();
    servicesContainer.appendChild(serviceCategory);

    const buttonBuy = serviceCategory.querySelector('.service-cta');
    if (buttonBuy) {
        buttonBuy.addEventListener('click', () => {
            window.open(urlDiscord, '_blank');
        });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function events() {
    navVector.addEventListener('click', () => {
        window.open(urlDiscord, '_blank');
    });

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

function simulateDragging() {
    if (!isDragging) {
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
            slider.scrollLeft = 0;
        } else {
            slider.scrollLeft += scrollSpeed;
        }
    }
    animationId = requestAnimationFrame(simulateDragging);
}

window.addEventListener('load', () => {
    if (!isMobileDevice()) {
        simulateDragging();
    }
});

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPosition = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    cancelAnimationFrame(animationId);
});

slider.addEventListener('mouseup', () => {
    isDragging = false;
    if (!isMobileDevice()) {
        simulateDragging();
    }
});

slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.pageX - slider.offsetLeft - startPosition;
    slider.scrollLeft = scrollLeft - deltaX;
});

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

window.addEventListener('DOMContentLoaded', () => {
    categorias();
    events();
    bemVindo();
    createServiceCategory();
    addServiceCategory();
    adicionarOuvintesRedesSociais();
});
