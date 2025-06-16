
(function() {
    const modalMask  = document.getElementById('js-modal');
    const modalBody  = document.getElementById('js-modal-body');
    const closeBtn   = modalMask.querySelector('.btn-close');

    function openModal({ type, src, title, alt }) {
        let inner;
        if (type === 'video') {
            inner = document.createElement('video');
            inner.setAttribute('controls', '');
            inner.src = src;
        } else if (type === 'image') {
            inner = document.createElement('img');
            inner.src = src;
            inner.alt = alt || title || '';
        }
        // Очистити старий контент
        modalBody.innerHTML = '';
        modalBody.appendChild(inner);

        modalMask.classList.add('open');

        if (type === 'video') {
            inner.play();
            // дозволимо клік по відео, але без закриття
            inner.addEventListener('click', e => e.stopPropagation());
        }
    }

    function closeModal() {
        const vid = modalBody.querySelector('video');
        if (vid) {
            vid.pause();
            vid.currentTime = 0;
        }
        modalMask.classList.remove('open');
    }

    // Клік по прев’ю відкриває модалку з даними з data-атрибутів
    document.querySelectorAll('.preview').forEach(el => {
        el.addEventListener('click', () => {
            openModal({
                type:  el.dataset.type,
                src:   el.dataset.src,
                title: el.dataset.title,
                alt:   el.dataset.alt
            });
        });
    });

    // Клік по масці (фон) — закрити
    modalMask.addEventListener('click', e => {
        if (e.target === modalMask) closeModal();
    });

    // Клік по хрестику — закрити
    closeBtn.addEventListener('click', e => {
        e.stopPropagation();
        closeModal();
    });
})();
