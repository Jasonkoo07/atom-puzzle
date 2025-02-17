
/*
for (var i = 0; i < classList[0].length; i++) {
    classList[0][i].addEventListener('click', function(event) {
        event.target.classList.add('selected');
        var btnIndex = getColorIndex(getColor(event.target));
        selectButton(0, 0, btnIndex);
    });
}

for (var i = 0; i < classList[1].length; i++) {
    classList[1][i].addEventListener('click', function(event) {
        var btnIndex = getMassIndex(getMass(event.target));
        selectButton(1, 1, btnIndex);
    });
}

for (var i = 0; i < classList[7].length; i++) {
    classList[7][i].addEventListener('click', function(event) {
        var btnIndex = getClassIndex(7, event.target);
        selectButton(5, 6, btnIndex);
        mode[3][btnIndex]++;
        changeCount(colorName[btnIndex], mode[3][btnIndex]);
    });
}

for (var i = 0; i < classList[8].length; i++) {
    classList[8][i].addEventListener('click', function(event) {
        var btnIndex = getClassIndex(8, event.target);
        selectButton(5, 6, btnIndex);
        if (mode[3][btnIndex] > 0) {
            mode[3][btnIndex]--;
            changeCount(colorName[btnIndex], mode[3][btnIndex]);
        }
    });
}

idList[1].addEventListener('click', function(event) {
    resetCount();
});

idList[2].addEventListener('click', function(event) {
    registerMass(colorName[mode[0]], massName[mode[1]]);
});

function random() {
    var result = [colorName[Math.floor(Math.random()*6)], massName[Math.floor(Math.random()*6)], Math.floor(Math.random()*5)+1];
    return result;
}

function clearFilter(ind) {
    if (classList[2][ind].classList.contains('hidden')) classList[2][ind].classList.remove('hidden');
    if (classList[3][ind].classList.contains('hidden')) classList[3][ind].classList.remove('hidden');
    if (classList[4][ind].classList.contains('hidden')) classList[4][ind].classList.remove('hidden');
    if (classList[2][ind].classList.contains('semi-hidden')) classList[2][ind].classList.remove('semi-hidden');
    if (classList[3][ind].classList.contains('semi-hidden')) classList[3][ind].classList.remove('semi-hidden');
    if (classList[4][ind].classList.contains('semi-hidden')) classList[4][ind].classList.remove('semi-hidden');
    
}

function resetCount() {
    for (var i = 0; i < 6; i++) {
        mode[3][i] = 0;
        changeCount(colorName[i], mode[3][i]);
    }
}

function haveNoCrash(rList, r) {
    for (var i = 0; i < rList.length; i++) {
        if (rList[i][0] == r[0] || rList[i][1] == r[1]) return false;
    }
    return true;
}

function makeNewElement(tag, cla, ide, tex) {
    var result = document.createElement(tag);
    for (var i = 0; i < cla.length; i++) result.classList.add(cla[i]);
    result.id = ide;
    result.textContent = tex;
    return result;
}

function isCorrect() {
    for (var i = 0; i < 6; i++) {
        if (mode[4][i] == 0) {
            if (mode[3][i] != 0) return false;
        }
        else {
            if (mode[2][i] != mode[5][i]) return false;
            if (mode[4][i] != mode[3][i]) return false;
        }
    }
    return true;
}

function makeNewOrder(ordInf, shoInf, ratInf) {
    clearOrder();
    for (var i = 0; i < ordInf.length; i++) {
        makeNewOrderElement(ordInf[i], shoInf[i], ratInf[i]);
    }
}

*/

/*orderInfo = getRandomOrderInfo();
showInfo = getRandomShowInfo(orderInfo.length);*/
/*
orderInfo = getOrderInfo(currentStage);
showInfo = getShowInfo(currentStage);
ratioInfo = getRatioInfo(orderInfo, showInfo);
makeNewOrder(orderInfo, showInfo, ratioInfo);

function getRandomOrderInfo() {
    var randomCount = customRandom(6, [99, 0, 1, 0, 0, 0])+1;
    var r = [];
    for (var i = 0; i < randomCount; i++) {
        temp = random();
        console.log(temp);
        var runCount = 0;
        while (!haveNoCrash(r, temp)) {
            temp = random();
            runCount++;
            if (runCount > 10000) {
                alert('충돌하지 않는 방법이 있는지 확인해 주세요');
                break;
            }
        }
        r.push(temp);
    }
    return r;
}

function getOrderInfo(sta) {
    return stageInfo[sta][0];
}

function getRandomShowInfo(len) {
    var result = [];
    for (var i = 0; i < len; i++) result.push([-1, -1, -1]);
    var knoInf = knownInfo(result);
    var set = getSet(result);
    while (!isKnownAll(knoInf)) {
        var r2 = Math.random();
        if (r2 < 0.1) {
            var r3 = Math.floor(Math.random()*len);
            var r4 = Math.floor(Math.random()*3);
            if (knoInf[r3][r4] == -1) result[r3][r4] = 0;
            else continue;
        }
        else {
            var r3 = Math.floor(Math.random()*len);
            var r4 = Math.floor(Math.random()*2)+1;
            var r5 = Math.floor(Math.random()*len);
            var r6 = r4;
            if (knoInf[r3][r4] == 0 && knoInf[r5][r6] == -1) {
                if (result[r3][r4] > 0) {
                    result[r5][r6] = result[r3][r4];
                }
                else {
                    result[r3][r4] = set.length;
                    result[r5][r6] = set.length;
                }
            }
            else if (knoInf[r3][r4] == -1 && knoInf[r5][r6] == 0) {
                if (result[r5][r6] > 0) {
                    result[r3][r4] = result[r5][r6];
                }
                else {
                    result[r3][r4] = set.length;
                    result[r5][r6] = set.length;
                } 
            }
            else continue;
        }
        knoInf = knownInfo(result);
        set = getSet(result);
    }
    return result;
}

function getShowInfo(sta) {
    return stageInfo[sta][1];
}

function getRatioInfo(ordInf, shoInf) {
    var result = [];
    for (var i = 0; i < orderInfo.length; i++) result.push([-1, -1, -1]);
    var set = getSet(shoInf);
    for (var i = 1; i < set.length; i++) {
        if (set[i].length == 0) continue;
        if (set[i][0][1] == 1) {
            var gcdVar = ordInf[set[i][0][0]][2];
            for (var j = 1; j < set[i].length; j++) {
                gcdVar = gcd(gcdVar, ordInf[set[i][j][0]][2]);
            }
            for (var j = 0; j < set[i].length; j++) {
                result[set[i][j][0]][1] = ordInf[set[i][j][0]][2]/gcdVar;
            }
        }
        else {
            var gcdVar = getMassNumber(ordInf[set[i][0][0]][1])*ordInf[set[i][0][0]][2];
            for (var j = 1; j < set[i].length; j++) {
                gcdVar = gcd(gcdVar, getMassNumber(ordInf[set[i][j][0]][1])*ordInf[set[i][j][0]][2]);
            }
            for (var j = 0; j < set[i].length; j++) {
                result[set[i][j][0]][2] = getMassNumber(ordInf[set[i][j][0]][1])*ordInf[set[i][j][0]][2]/gcdVar;
            }
        }
    }
    return result;
}

function gcd(a, b) {
    for (var i = a; i > 0; i--) {
        if (a % i == 0 && b % i == 0) return i;
    }
}

function customRandom(num, lst) {
    var sum = 0;
    for (var i = 0; i < num; i++) sum += lst[i];
    var rand = Math.floor(Math.random()*sum);
    var sum2 = 0;
    for (var i = 0; i < num; i++) {
        sum2 += lst[i];
        if (rand < sum2) return i;
    }
    console.log("ERROR");
    return -1;
}

function getSet(shoInf) {
    var max = 0;
    for (var i = 0; i < shoInf.length; i++) {
        if (shoInf[i][0] > max) max = shoInf[i][0];
        if (shoInf[i][1] > max) max = shoInf[i][1];
        if (shoInf[i][2] > max) max = shoInf[i][2];
    }
    var result = [];
    for (var i = 0; i <= max; i++) result.push([]);
    for (var i = 0; i < shoInf.length; i++) {
        if (shoInf[i][0] >= 1) result[shoInf[i][0]].push([i, 0]);
        if (shoInf[i][1] >= 1) result[shoInf[i][1]].push([i, 1]);
        if (shoInf[i][2] >= 1) result[shoInf[i][2]].push([i, 2]);
    }
    return result;
}

function knownInfo(shoInf) {
    var result = [];
    for (var i = 0; i < shoInf.length; i++) {
        result.push([]);
        for (var j = 0; j < 3; j++) {
            if (shoInf[i][j] == 0) result[i].push(1);
            else result[i].push(-1);
        }
    }
    var set = getSet(shoInf);
    var changed = true;
    while (changed) {
        changed = false;
        for (var i = 0; i < shoInf.length; i++) {
            if (result[i][0] >= 0 && result[i][1] >= 0 && result[i][2] < 0) {
                result[i][2] = 0;
                changed = true;
            }
            if (result[i][0] >= 0 && result[i][1] < 0 && result[i][2] >= 0) {
                result[i][1] = 0;
                changed = true;
            }
            if (result[i][0] < 0 && result[i][1] >= 0 && result[i][2] >= 0) {
                result[i][0] = 0;
                changed = true;
            }
        }
        for (var j = 1; j < set.length; j++) {
            var hasKnown = false;
            var hasUnknown = false;
            for (var k = 0; k < set[j].length; k++) {
                if (result[set[j][k][0]][set[j][k][1]] >= 0) hasKnown = true;
                else hasUnknown = true;
            }
            if (hasKnown && hasUnknown) {
                for (var k = 0; k < set[j].length; k++) {
                    if (result[set[j][k][0]][set[j][k][1]] < 0) result[set[j][k][0]][set[j][k][1]] = 0;
                }
                changed = true;
            }
        }
    }
    return result;
}

function isKnownAll(knoInf) {
    for (var i = 0; i < knoInf.length; i++) {
        for (var j = 0; j < knoInf[i].length; j++) {
            if (knoInf[i][j] < 0) return false;
        }
    }
    return true;
}
*/

function getMass(ele) {
    for (var i = 0; i < 6; i++) {
       if (ele.classList.contains(massName[i])) return massName[i];
    }
    return null;
}

function setIconColor(ele, col) {
    if (getColor(ele) != null) ele.classList.remove(getColor(ele));
    ele.classList.add(col);
}

function setIconMass(ele, mas) {
    if (getMass(ele) != null) ele.classList.remove(getMass(ele));
    ele.classList.add(mas);
    ele.textContent = mas;
}

function setIcon(ele, col, mas) {
    setIconColor(ele, col);
    setIconMass(ele, mas);
}

function clearIconColor(ele) {
    if (getColor(ele) != null) ele.classList.remove(getColor(ele));
}

function clearIconMass(ele) {
    if (getMass(ele) != null) ele.classList.remove(getMass(ele));
    ele.textContent = '?';
}

function clearIcon(ele) {
    clearIconColor(ele);
    clearIconMass(ele);
}

function registerMass(col, mas) {
    setIconMass(classList[0][getColorIndex(col)], mas);
    setIconMass(classList[5][getColorIndex(col)], mas);
    mode[5][getColorIndex(col)] = mas;
}

function changeCount(col, cou) {
    classList[6][getColorIndex(col)].textContent = `× ${cou}`;
}

function clearOrder() {
    for (var i = 0; i < classList[10].length; i++) {
        classList[10][i].remove();
    }
    classList[10] = [];
    classList[2] = [];
    classList[3] = [];
    classList[4] = [];
    mode[2] = [null, null, null, null, null, null];
    mode[4] = [0, 0, 0, 0, 0, 0];
}

function addOrderMode(col, mas, cou) {
    mode[2][getColorIndex(col)] = mas;
    mode[4][getColorIndex(col)] = cou;
}

function selectButton(num, mod, ind) {
    console.log(num + " " + mode[mod] + " " + ind + " " + classList[num][mode[mod]]);
    classList[num][mode[mod]].classList.remove('selected');
    mode[mod] = ind;
    classList[num][mode[mod]].classList.add('selected');
}


window.addEventListener("keydown", (e) => {
    for (var i = 0; i < classKey.length; i++) {
        for (var j = 0; j < classKey[i].length; j++) {
            if (classKey[i][j] == e.key) classList[i][j].click();
        }
    }
    for (var i = 0; i < classMove.length; i++) {
        if (classMove[i][1] == e.key) {
            selectButton(i, classMove[i][0], (mode[classMove[i][0]]+(classList[i].length-1))%classList[i].length);
        }
        if (classMove[i][2] == e.key) {
            selectButton(i, classMove[i][0], (mode[classMove[i][0]]+1)%classList[i].length);
        }
    }
    for (var i = 0; i < idKey.length; i++) {
        if (idKey[i] == e.key) idList[i].click();
    }
    if (e.key == '2') {
        classList[7][mode[6]].click();
    }
    if (e.key == '1') {
        classList[8][mode[6]].click();
    }
    console.log(e.key);
});

function getClassIndex(cla, ele) {
    for (var i = 0; i < 6; i++) {
        if (classList[cla][i] == ele) return i;
     }
     return -1;
}

function getColorIndex(col) {
    for (var i = 0; i < 6; i++) {
        if (colorName[i] == col) return i;
     }
     return -1;
}

function getMassIndex(mas) {
    for (var i = 0; i < 6; i++) {
        if (massName[i] == mas) return i;
     }
     return -1;
}

function getMassNumber(name) {
    for (var i = 0; i < 6; i++) {
        if (massName[i] == name) return massNumber[i];
    }
    console.log('존재하지 않는 이름');
    return -1;
}

function getColor(ele) {
    for (var i = 0; i < 6; i++) {
       if (ele.classList.contains(colorName[i])) return colorName[i];
    }
    return null;
}


/**
 * @param {기본정보[]} 기본정보
 * @returns {문자열}
 */

function 기본정보를분자문자열로(기본정보) {
    var result = '';
    for (var i = 0; i < 기본정보.length; i++) {
        if (기본정보[i][2] == 1) {
            result += `<span class="큰분자텍스트 ${기본정보[i][0]}">${기본정보[i][1]}</span><span class="작은분자텍스트 ${기본정보[i][0]}"></span>`;
        }
        else {
            result += `<span class="큰분자텍스트 ${기본정보[i][0]}">${기본정보[i][1]}</span><span class="작은분자텍스트 ${기본정보[i][0]}">${기본정보[i][2]}</span>`;
        }
    }
    return result;
}

/**
 * @param {기본정보[]} 기본정보
 * @param {문자열[]} 정렬기준
 * @returns {기본정보[]}
 */
function 기본정보정렬(기본정보, 정렬기준) {
    var result = [];
    for (var i = 0; i < 기본정보.length; i++) result.push(기본정보[i]);
    for (var i = result.length-1; i >= 0; i--) {
        for (var j = 0; j < i; j++) {
            var 첫번째정렬값 = 정렬기준.indexOf(result[j][1]);
            var 두번째정렬값 = 정렬기준.indexOf(result[j+1][1]);
            if (첫번째정렬값 > 두번째정렬값) {
                var temp = result[j];
                result[j] = result[j+1];
                result[j+1] = temp;
            }
        }
    }
    return result;
}

/**
 * @param {문자열} 추가할것
 * @param {문자열} 추가할내용
 * @returns {엘리먼트}
 */
function 새무지개원자(색, 이름) {
    return 새엘리먼트('div', ['무지개원자', 색, 이름], null, 이름 == null ? '?' : 이름);
}

/**
 * @param {기본정보[]} 기본정보
 * @returns {엘리먼트}
 */
function 새분자(기본정보) {
    return 새엘리먼트('div', ['분자'], null, 기본정보를분자문자열로(기본정보));
}

const classCount = 100;
const idCount = 100;
let classList = [];
let classKey = [];
let classMove = [];
for (var i = 0; i < classCount; i++) {
    classList.push(Array.from(document.getElementsByClassName(`class${i}`)));
    classKey.push([]);
    classMove.push([-1, null, null]);
    for (var j = 0; j < classList[i].length; j++) classKey[i].push(null);
}
classMove[0] = [0, 'q', 'a'];
classMove[1] = [1, 'w', 's'];
classMove[5] = [6, 'e', 'd'];
let idList = [];
let idKey = [];
for (var i = 0; i < idCount; i++) {
    idList.push(document.getElementById(`id${i}`));
    idKey.push(null);
}
idKey[0] = 'x';
idKey[1] = 'c';
idKey[2] = 'z';
let mode = [
    0, 
    0, 
    [null, null, null, null, null, null], 
    [0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0], 
    [null, null, null, null, null, null], 
    0
];
let orderInfo;
let showInfo;
let ratioInfo;


/**
 * @param {[문자열, 문자열, 정수]} 기본정보
 * @param {[정수, 정수, 정수]} 보이기정보
 * @param {[정수, 정수, 정수]} 비율정보
 * @returns {엘리먼트}
 */
function 새세부정보엘리먼트(기본정보, 보이기정보, 비율정보) {
    var 상자 = 새엘리먼트('div', ['세부정보상자'], null, null);
    var 원자아이콘 = 새무지개원자(기본정보[0], 기본정보[1]);
    var 개수텍스트 = 새엘리먼트('div', ['개수정보'], null, `× ${기본정보[2]}`);
    var 질량텍스트 = 새엘리먼트('div', ['질량정보'], null, `… ${getMassNumber(기본정보[1])*기본정보[2]}`);
    if (보이기정보[0] == -1) {
        원자아이콘 = 새무지개원자(기본정보[0], '?');
        원자아이콘.classList.add('hidden');
    }
    if (보이기정보[1] == -1) {
        개수텍스트.textContent = '× ?';
        개수텍스트.classList.add('hidden');
    }
    else if (보이기정보[1] > 0) {
        개수텍스트.textContent = `× ${비율정보[1]}${String.fromCharCode(64 + 보이기정보[1])}`;
        개수텍스트.classList.add('semi-hidden');
    }
    if (보이기정보[2] == -1) {
        질량텍스트.textContent = '… ???';
        질량텍스트.classList.add('hidden');
    }
    else if (보이기정보[2] > 0) {
        질량텍스트.textContent = `… ${비율정보[2]}${String.fromCharCode(64 + 보이기정보[2])}`;
        질량텍스트.classList.add('semi-hidden');
    }
    엘리먼트추가([원자아이콘, 개수텍스트, 질량텍스트], 상자);
    return 상자;
}

/**
 * @param {[기본정보[], 보이기정보[]]} 정보목록
 * @returns {비율정보[]}
 */
function 비율정보생성(정보목록) {
    var result = [];
    console.log(정보목록);
    for (var i = 0; i < 정보목록[0].length; i++) result.push([-1, -1, -1]);
    var set = getSet(정보목록[1]);
    for (var i = 1; i < set.length; i++) {
        if (set[i].length == 0) continue;
        if (set[i][0][1] == 1) {
            var gcdVar = 정보목록[0][set[i][0][0]][2];
            for (var j = 1; j < set[i].length; j++) {
                gcdVar = gcd(gcdVar, 정보목록[0][set[i][j][0]][2]);
            }
            for (var j = 0; j < set[i].length; j++) {
                result[set[i][j][0]][1] = 정보목록[0][set[i][j][0]][2]/gcdVar;
            }
        }
        else {
            var gcdVar = getMassNumber(정보목록[0][set[i][0][0]][1])*정보목록[0][set[i][0][0]][2];
            for (var j = 1; j < set[i].length; j++) {
                gcdVar = gcd(gcdVar, getMassNumber(정보목록[0][set[i][j][0]][1])*정보목록[0][set[i][j][0]][2]);
            }
            for (var j = 0; j < set[i].length; j++) {
                result[set[i][j][0]][2] = getMassNumber(정보목록[0][set[i][j][0]][1])*정보목록[0][set[i][j][0]][2]/gcdVar;
            }
        }
    }
    return result;
}

const 기본분자목록 = [
    [['H', 2]],
    [['O', 2]],
    [['N', 2]],
    [['F', 2]],
    [['H', 2], ['O', 1]],
    [['N', 1], ['H', 3]],
    [['C', 1], ['H', 4]],
    [['O', 1], ['F', 2]],
    [['C', 1], ['H', 4], ['O', 1]],
    [['C', 2], ['H', 6], ['O', 1]],
    [['C', 1], ['H', 2], ['O', 1]],
    [['C', 2], ['H', 4], ['O', 2]],
    [['C', 6], ['H', 12], ['O', 6]],
    [['N', 1], ['O', 2]],
    [['C', 1], ['O', 1]],
    [['C', 1], ['O', 2]],
    [['N', 2], ['O', 1]],
    [['C', 2], ['H', 4]],
    [['S', 1], ['H', 4]],
    [['S', 1], ['O', 1]],
    [['S', 1], ['O', 2]],
    [['S', 1], ['O', 3]],
    [['C', 1], ['S', 2]],
    [['N', 1], ['O', 1]],
    [['C', 3], ['H', 8]],
    [['N', 2], ['O', 3]],
    [['N', 2], ['O', 4]],
    [['N', 2], ['O', 5]],
    [['S', 1], ['F', 4]],
    [['H', 1], ['F', 1]],
    [['C', 1], ['F', 4]],
    [['N', 1], ['F', 3]],
    [['O', 2], ['F', 2]],
    [['N', 2], ['F', 2]],
    [['N', 2], ['F', 4]],
    [['C', 2], ['F', 2]],
    [['C', 2], ['F', 4]],
    [['C', 2], ['F', 6]],
];