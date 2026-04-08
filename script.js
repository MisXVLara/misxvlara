document.addEventListener('DOMContentLoaded', () => {
    const musica = document.getElementById('musica-fondo');
    const btnMusica = document.getElementById('btn-musica');
    const btnMusicConsent = document.getElementById('btn-music-consent');
    const btnCloseConsent = document.getElementById('btn-close-consent');
    const musicConsent = document.getElementById('music-consent');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const envelope = document.querySelector('.envelope');
    const envelopeSeal = document.getElementById('envelope-seal');
    let estaReproduciendo = false;

    // Mostrar modal de audio al cargar
    setTimeout(() => {
        musicConsent.classList.remove('hidden');
    }, 500);

    function actualizarBoton() {
        btnMusica.innerText = estaReproduciendo ? '⏸️ Pausar Música' : '🎵 Reproducir Música';
    }

    function iniciarMusica() {
        musica.play()
            .then(() => {
                estaReproduciendo = true;
                actualizarBoton();
            })
            .catch((error) => {
                console.warn('Reproducción de audio bloqueada:', error);
                btnMusica.innerText = '🎵 Toca para activar';
            });
    }

    function pausarMusica() {
        musica.pause();
        estaReproduciendo = false;
        actualizarBoton();
    }

    btnMusica.addEventListener('click', () => {
        if (estaReproduciendo) {
            pausarMusica();
        } else {
            iniciarMusica();
        }
    });

    btnMusicConsent.addEventListener('click', () => {
        iniciarMusica();
        musicConsent.classList.add('hidden');
    });

    btnCloseConsent.addEventListener('click', () => {
        musicConsent.classList.add('hidden');
    });

    actualizarBoton();

    // Animación del sobre
    envelopeSeal.addEventListener('click', () => {
        envelope.classList.add('open');
        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
            mainContent.style.display = 'block';
            // Iniciar animaciones de secciones
            const animatable = document.querySelectorAll('.hero-content, .section-card');
            const revelarSecciones = new IntersectionObserver((entradas, observador) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add('visible');
                    } else {
                        entrada.target.classList.remove('visible');
                    }
                });
            }, {
                threshold: 0.2,
            });

            animatable.forEach((elemento) => {
                revelarSecciones.observe(elemento);
            });
        }, 800);
    });

    const fechaEvento = new Date('Feb 20, 2027 21:30:00').getTime();

    const actualizarContador = setInterval(() => {
        const ahora = Date.now();
        const distancia = fechaEvento - ahora;

        const dias = Math.max(0, Math.floor(distancia / (1000 * 60 * 60 * 24)));
        const horas = Math.max(0, Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const minutos = Math.max(0, Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60)));
        const segundos = Math.max(0, Math.floor((distancia % (1000 * 60)) / 1000));

        document.getElementById('dias').textContent = dias < 10 ? `0${dias}` : dias;
        document.getElementById('horas').textContent = horas < 10 ? `0${horas}` : horas;
        document.getElementById('minutos').textContent = minutos < 10 ? `0${minutos}` : minutos;
        document.getElementById('segundos').textContent = segundos < 10 ? `0${segundos}` : segundos;

        if (distancia <= 0) {
            clearInterval(actualizarContador);
            const contador = document.querySelector('.contador-container');
            contador.innerHTML = '<span class="tiempo"><strong>¡Llegó el gran día!</strong></span>';
        }
    }, 1000);
});
