const colorList = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
const nameList = ['H', 'C', 'N', 'O', 'F', 'S'];
const massList = [1, 12, 14, 16, 19, 32];

/**
 * @param {문자열} 태그
 * @param {문자열[]} 클래스목록
 * @param {문자열} 아이디
 * @param {문자열} 내용
 * @returns {엘리먼트}
 */
function 새엘리먼트(태그, 클래스목록, 아이디, 내용) {
    var result = document.createElement(태그);
    for (var i = 0; i < 클래스목록.length; i++) result.classList.add(클래스목록[i]);
    if (아이디 != null) result.id = 아이디;
    result.innerHTML = 내용;
    return result;
}

/**
 * @param {엘리먼트[]} 추가할것
 * @param {엘리먼트} 추가할내용
 * @returns {반환없음}
 */
function 엘리먼트추가(추가할것목록, 추가할장소) {
    for (var i = 0; i < 추가할것목록.length; i++) 추가할장소.appendChild(추가할것목록[i]);
}

function 배열가리기(배열정보, 가리기정보) {
    var result = [];
    for (var i = 0; i < 배열정보.length; i++) result.push(배열정보[i]);
    var set = getSet(가리기정보);
    for (var i = 1; i < set.length; i++) {
        if (set[i].length == 0) continue;
        var gcdVar = 배열정보[set[i][0]];
        for (var j = 1; j < set[i].length; j++) {
            gcdVar = gcd(gcdVar, 배열정보[set[i][j]]);
        }
        for (var j = 0; j < set[i].length; j++) {
            result[set[i][j]] = 배열정보[set[i][j]]/gcdVar + String.fromCharCode(64+i);
        }
    }
    for (var i = 0; i < 배열정보.length; i++) if (가리기정보[i] == -1) result[i] = '?';
    return result;
}

function gcd(a, b) {
    for (var i = a; i > 0; i--) {
        if (a % i == 0 && b % i == 0) return i;
    }
}

function getSet(shoInf) {
    var max = 0;
    for (var i = 0; i < shoInf.length; i++) {
        if (shoInf[i] > max) max = shoInf[i];
    }
    var result = [];
    for (var i = 0; i <= max; i++) result.push([]);
    for (var i = 0; i < shoInf.length; i++) {
        if (shoInf[i] >= 1) result[shoInf[i]].push(i);
    }
    return result;
}
