(function(){
    const SELECTORS = {
        preview:   '.preview',
        mask:      '.modal-mask',
        video:     'video',
        openClass: 'open',
        closeBtn:  '.btn-close'
    };

    function onPreviewClick(e) {
        const preview = e.currentTarget;
        const mask    = preview.nextElementSibling;     // дивимось на сусідню модалку
        const video   = mask.querySelector(SELECTORS.video);

        mask.classList.add(SELECTORS.openClass);
        if (video) video.play();
    }

    function onMaskClick(e) {
        const mask = e.currentTarget;
        const video = mask.querySelector(SELECTORS.video);
        if(e.target !== video) {
            if(video) video.pause();
            mask.classList.remove(SELECTORS.openClass);
        }
    }

    function init() {
        document.querySelectorAll(SELECTORS.preview)
            .forEach(el => el.addEventListener('click', onPreviewClick));

        document.querySelectorAll(SELECTORS.mask)
            .forEach(mask =>
                mask.addEventListener('click', onMaskClick));

    }

    if (document.readyState !== 'loading') init();
    else document.addEventListener('DOMContentLoaded', init);
})();
