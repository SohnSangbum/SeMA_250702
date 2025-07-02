const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

const $h1 = get('#nav h1');
const $nav = get('#nav');
window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

window.addEventListener('scroll', (e) => {
    const ty = window.scrollY;
    if (ty <= 343) {
        $nav.style.opacity = 1;
        $h1.classList.remove('on');
        $nav.classList.remove('on');
    } else if (ty > 343 && ty <= 1700) {
        $h1.classList.add('on');
        $nav.classList.add('on');
        $nav.style.opacity = 1;
    } else if (ty > 1650) {
        $nav.style.opacity = 0;
        $nav.style.transition = '0.3s';
    }

    console.log(ty);
});

const $Allchk = get('.sub1 .con1 .filter-wrap .col p input.all-checkbox');
const $chk = getAll('.location');

$Allchk.addEventListener('change', (e) => {
    $chk.forEach((item) => {
        item.checked = $Allchk.checked;
    });
});

$chk.forEach((item) => {
    item.addEventListener('change', (e) => {
        const allChecked = Array.from($chk).every((itemLi) => itemLi.checked);
        $Allchk.checked = allChecked;
    });
});

const $category = getAll('.category');
$category.forEach((item) => {
    item.addEventListener('change', (e) => {
        const selected = Array.from($category)
            .filter((item) => item.checked)
            .map((item) => item.nextElementSibling.textContent); // 또는 el.value

        console.log('선택된 항목:', selected);
    });
});

const $button = get('.sub1 .con1 .filter-wrap .button-wrap button:last-child');
const $con2 = get('.con2');

$con2.style.display = 'none';
$button.addEventListener('click', (e) => {
    $con2.style.display = 'block';
});
