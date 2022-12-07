const open = document.getElementById('gerarbilhete');
const modal_container = document.getElementById('modal_container');
const ok = document.getElementById('ok');

open.addEventListener('click', ()=> {
    modal_container.classList.add('show');
});

close.addEventListener('click', () => {
    modal_container.classList.remove('show');
});