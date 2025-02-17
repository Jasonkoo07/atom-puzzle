

const 주문서내용부 = document.getElementById("주문서중부");
const 병내용물부 = document.getElementById("병정보중부");
const 제출버튼 = document.getElementById("제출버튼");
const 초기화버튼 = document.getElementById("초기화버튼");
const 이전버튼 = document.getElementById("이전버튼");
const 다음버튼 = document.getElementById("다음버튼");
const 원자등록기상자 = document.getElementById("원자등록기집합");
const 재료원자상자 = document.getElementById("무지개원자상자");
const 원자아이콘집합 = document.getElementById("원자아이콘집합");
const 분자제작버튼 = document.getElementById("화살표");
const 분자제작입력부 = document.getElementById("분자제작입력부");
const 분자제작출력부 = document.getElementById("분자제작출력부");
const 원자엘리먼트목록 = Array.from(원자아이콘집합.getElementsByClassName("무지개원자"));

let 원자이름순서 = 원자이름순서얻기(원자등록기상자, '원자등록기');
let 병내용물목록 = new Mixture([], 원자이름순서);
let 분자제작입력원자목록 = new Mixture([], 원자이름순서);
let 현재스테이지번호 = 0;

for (var i = 0; i < 6; i++) 원자이름등록(원자엘리먼트목록[i], 원자이름순서[i]);
정보엘리먼트초기화(주문서내용부, stageInfo[현재스테이지번호]);
정보엘리먼트초기화(병내용물부, 병내용물목록);

function 정보엘리먼트초기화(정보상자, 혼합물) {
    정보상자.innerHTML = null;
    엘리먼트추가(혼합물.세부정보목록생성(), 정보상자);    
}

new Sortable(무지개원자상자, {
    group: {
        name: 'atom',
        pull: 'clone',
        put: false,
    },
    animation: 150,
    sort: false,
});

new Sortable(쓰레기통, {
    group: {
        name: 'bin',
        put: ['atom', 'atomInput', 'molecule']
    },
    animation: 150,
    onAdd: function (event) {
        event.item.remove();
    }
});

/**
 * @param {엘리먼트} 원자
 * @param {문자열} 이름
 * @returns {반환없음}
 */
function 원자이름등록(원자, 이름) {
    for (var i = 0; i < 6; i++) 원자.classList.remove(nameList[i]);
    원자.classList.add(이름);
    원자.textContent = 이름;
}

/**
 * @param {엘리먼트} 원자순서상자
 * @param {문자열} 탐색대상클래스
 * @returns {문자열[]}
 */
function 원자이름순서얻기(원자순서상자, 탐색대상클래스) {
    var result = [];
    var 엘리먼트목록 = Array.from(원자순서상자.getElementsByClassName(탐색대상클래스));
    for (var i = 0; i < 엘리먼트목록.length; i++) {
        for (var j = 0; j < 6; j++) {
            if (엘리먼트목록[i].classList.contains(nameList[j])) {
                result.push(nameList[j]);
                break;
            }
        }
    }
    return result;
}

new Sortable(원자등록기집합, {
    group: {
        name: 'hcnofs',
    },
    animation: 150,
    swap: true,
    onEnd: function (event) {
        원자이름순서 = 원자이름순서얻기(원자등록기상자, '원자등록기');
        for (var i = 0; i < 6; i++) 원자이름등록(원자엘리먼트목록[i], 원자이름순서[i]);
        병내용물목록.이름재설정(원자이름순서);
        정보엘리먼트초기화(병내용물부, 병내용물목록);
    }
});


new Sortable(병, {
    group: {
        name: 'bottle',
        put: ['atom', 'atomInput', 'molecule'],
    },
    animation: 150,
    onAdd: function (event) {
        var 추가할물질 = Substance.엘리먼트로생성(event.item);
        병내용물목록.물질추가(추가할물질);
        정보엘리먼트초기화(병내용물부, 병내용물목록);
        event.item.remove();
    }
});

new Sortable(분자제작입력부, {
    group: {
        name: 'atomInput',
        put: ['atom'],
    },
    animation: 150,
    onAdd: function (event) {
        console.log(Substance.엘리먼트로생성(event.item));
        분자제작입력원자목록.물질추가(Substance.엘리먼트로생성(event.item));
    },
    onRemove: function (event) {
        console.log(event.item);
        분자제작입력원자목록.물질제거(Substance.엘리먼트로생성(event.item));
    }
});

new Sortable(분자제작출력부, {
    group: {
        name: 'molecule',
        put: false,
    },
    animation: 150,
});

제출버튼.addEventListener('click', function(event) {
    if (병내용물목록.동일구성(stageInfo[현재스테이지번호])) {
        현재스테이지번호 = (현재스테이지번호+1)%stageInfo.length;
        병내용물목록.초기화();
        정보엘리먼트초기화(주문서내용부, stageInfo[현재스테이지번호]);
        정보엘리먼트초기화(병내용물부, 병내용물목록);
        제출버튼.classList.add('green');
        setTimeout(() => 제출버튼.classList.remove('green'), 250);
    }
    else {
        제출버튼.classList.add('red');
        setTimeout(() => 제출버튼.classList.remove('red'), 250);
    }
});

이전버튼.addEventListener('click', function(event) {
    현재스테이지번호 = (현재스테이지번호+stageInfo.length-1)%stageInfo.length;
    병내용물목록.초기화();
    정보엘리먼트초기화(주문서내용부, stageInfo[현재스테이지번호]);
    정보엘리먼트초기화(병내용물부, 병내용물목록);
});

다음버튼.addEventListener('click', function(event) {
    현재스테이지번호 = (현재스테이지번호+1)%stageInfo.length;
    병내용물목록.초기화();
    정보엘리먼트초기화(주문서내용부, stageInfo[현재스테이지번호]);
    정보엘리먼트초기화(병내용물부, 병내용물목록);
});

초기화버튼.addEventListener('click', function(event) {
    병내용물목록.초기화();
    정보엘리먼트초기화(병내용물부, 병내용물목록);
});

분자제작버튼.addEventListener('click', function(event) {
    분자제작출력부.innerHTML = '';
    var temp = Molecule.혼합물로생성(분자제작입력원자목록);
    for (var i = 0; i < stageInfo[현재스테이지번호].구성.length; i++) {
        console.log(stageInfo[현재스테이지번호].구성[i][0]);
        if (temp.동일구성(stageInfo[현재스테이지번호].구성[i][0])) {
            temp = stageInfo[현재스테이지번호].구성[i][0].깊은복사();
            break;
        }
    }
    엘리먼트추가([temp.엘리먼트생성()], 분자제작출력부);
    분자제작입력원자목록.초기화();
    분자제작입력부.innerHTML = '';
});