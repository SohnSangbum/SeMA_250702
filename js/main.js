const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

const $wrap = get('#wrap');
const $posters = getAll('.con1 .inner .poster-wrap .poster');
const $dot = getAll('.con4 .inner .col > li ul li');
const $txt1 = getAll('dt');
const $txt2 = getAll('dd');
const $txt3 = getAll('h2');
const $txt4 = getAll('li a');
const $txt5 = getAll('li p');

const $line1 = get('#visual .inner');
const $line2 = get('.con1 .inner');
const $line3 = get('.con2 .inner');
const $line4 = get('.con3 .inner');
const $line5 = get('.con4 .inner');

const $h1 = get('#nav h1');
const $h1on = get('#nav h1.on');
const $nav = get('#nav');

const $popup1 = get('#visual .popup1');
const $popup1icon = get('#visual .right p .xi-info-o');

const $popup2icon = get('#visual .right p .xi-calendar-check');
const $popup2 = get('#visual .popup2');
const $close = get('#visual .popup2 h3 .xi-close');
const $exhTitle = get('.thum-wrap h2');

const $bigIMG = get('#visual .bigimg li a');
const $prev = get('.right p .xi-angle-left-min');
const $next = get('.right p .xi-angle-right-min');
const $play_stop = get('.right p .xi-play-circle');

const imgList = [
    {
        id: 1,
        img: './images/bigimg0.png',
        title: '《말하는 머리들》',
    },
    {
        id: 2,
        img: './images/bigimg1.png',
        title: '권진규의 영원한 집',
    },
    {
        id: 3,
        img: './images/bigimg2.png',
        title: '《광채 光彩: 시작의 순간들》',
    },
    {
        id: 4,
        img: './images/bigimg3.png',
        title: '《스토리지 스토리》',
    },
    {
        id: 4,
        img: './images/bigimg4.png',
        title: '《그림이라는 별세계: 이건희컬렉션과 함께》',
    },
];
let cnt = 0,
    timer = null,
    interval = 3000,
    size = imgList.length,
    isPlay = true,
    isOpen = true;

// 공통으로 이미지/제목 업데이트하는 함수
const banner = () => {
    $exhTitle.textContent = imgList[cnt].title;
    $bigIMG.style.backgroundImage = `url(${imgList[cnt].img})`;
};

const $thumList = getAll('.thumimg li'); // 썸네일 li들 가져오기

//썸네일 이미지
$thumList.forEach((item, idx) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        cnt = idx; // 클릭한 썸네일의 인덱스를 현재 이미지 index로 설정
        banner(); // 이미지/타이틀 업데이트
        if (isPlay) {
            stopTimer(); // 자동재생 중이면 멈췄다가
            startTimer(); // 다시 시작
        }
    });
});

// 자동 재생 함수
const make = () => {
    cnt++;
    if (cnt >= size) cnt = 0;
    banner();
};

// 타이머 시작
const startTimer = () => {
    timer = setInterval(make, interval);
};

// 타이머 멈춤
const stopTimer = () => {
    clearInterval(timer);
};

// 초기 세팅
banner();
timer = setInterval(make, interval);

$bigIMG.addEventListener('mouseenter', () => {
    if (isPlay) {
        stopTimer();
        $play_stop.classList.replace('xi-pause-circle', 'xi-play-circle');
    }
});
$bigIMG.addEventListener('mouseleave', () => {
    if (isPlay) {
        startTimer();
        $play_stop.classList.replace('xi-play-circle', 'xi-pause-circle');
    }
});

// 이전 버튼
$prev.addEventListener('click', () => {
    cnt--;
    if (cnt < 0) cnt = size - 1;
    banner();
    if (isPlay) {
        stopTimer();
        startTimer();
    }
});

// 다음 버튼
$next.addEventListener('click', () => {
    cnt++;
    if (cnt >= size) cnt = 0;
    banner();
    if (isPlay) {
        stopTimer();
        startTimer();
    }
});

// 초기값
$play_stop.classList.add('xi-pause-circle');

$play_stop.addEventListener('click', () => {
    isPlay
        ? (stopTimer(), $play_stop.classList.replace('xi-pause-circle', 'xi-play-circle'))
        : (startTimer(), $play_stop.classList.replace('xi-play-circle', 'xi-pause-circle'));
    isPlay = !isPlay;
});

$popup1icon.addEventListener('click', (e) => {
    e.preventDefault();
    isOpen = !isOpen;
    $popup1.classList.toggle('on');
});

//팝업
$popup2icon.addEventListener('click', (e) => {
    e.preventDefault();
    isOpen = !isOpen;
    $popup2.classList.toggle('on');
});
$close.addEventListener('click', (e) => {
    $popup2.classList.remove('on');
});

window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

window.addEventListener('load', () => {});

window.addEventListener('scroll', (e) => {
    const ty = window.scrollY;
    if (ty <= 343) {
        $nav.style.opacity = 1;
        $h1.classList.remove('on');
        $nav.classList.remove('on');
        $h1.style.backgroundImage = 'url(../images/museumlogo_01.png)';
        $wrap.style.background = ''; // 또는 원래 색상으로 복원
        $posters.forEach((item) => item.classList.remove('scrolled'));
        $dot.forEach((item) => item.classList.remove('scrolled'));
        $txt1.forEach((item) => (item.style.color = ''));
        $txt2.forEach((item) => (item.style.color = ''));
        $txt3.forEach((item) => (item.style.color = ''));
        $txt4.forEach((item) => (item.style.color = ''));
        $txt5.forEach((item) => (item.style.color = ''));
        $line1.classList.remove('on');
        $line2.classList.remove('on');
        $line3.classList.remove('on');
        $line4.classList.remove('on');
        $line5.classList.remove('on');
    } else if (ty > 343 && ty <= 1200) {
        $nav.style.display = 'block';
        $h1.classList.add('on');
        $h1.style.backgroundImage = 'url(../images/museumlogo_02.png)';
        $nav.classList.add('on');
        $wrap.style.background = ''; // 또는 원래 색상으로 복원
        $posters.forEach((item) => item.classList.remove('scrolled'));
        $dot.forEach((item) => item.classList.remove('scrolled'));
        $txt1.forEach((item) => (item.style.color = ''));
        $txt2.forEach((item) => (item.style.color = ''));
        $txt3.forEach((item) => (item.style.color = ''));
        $txt4.forEach((item) => (item.style.color = ''));
        $txt5.forEach((item) => (item.style.color = ''));
        $line1.classList.remove('on');
        $line2.classList.remove('on');
        $line3.classList.remove('on');
        $line4.classList.remove('on');
        $line5.classList.remove('on');
    } else if (ty > 1200 && ty <= 2850) {
        $nav.style.opacity = 1;
        $wrap.style.background = '#fff';
        $h1.style.backgroundImage = 'url(../images/museumlogo_03.png)';
        $posters.forEach((item) => item.classList.add('scrolled'));
        $dot.forEach((item) => item.classList.add('scrolled'));
        $txt1.forEach((item) => (item.style.color = '#000'));
        $txt2.forEach((item) => (item.style.color = '#000'));
        $txt3.forEach((item) => (item.style.color = '#000'));
        $txt4.forEach((item) => (item.style.color = '#000'));
        $txt5.forEach((item) => (item.style.color = '#000'));
        $line1.classList.add('on');
        $line2.classList.add('on');
        $line3.classList.add('on');
        $line4.classList.add('on');
        $line5.classList.add('on');
    } else if (ty > 2850) {
        $nav.style.transition = '0.3s';
        $nav.style.opacity = 0;
    }

    console.log(ty);
});
