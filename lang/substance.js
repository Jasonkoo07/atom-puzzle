class Substance {
    constructor() {

    }

    질량() {

    }

    static 텍스트로물질생성(str) {
        var colorList = new Map([['r', 'red'], ['o', 'orange'], ['y', 'yellow'], ['g', 'green'],['b', 'blue'], ['p', 'purple']]);
        if (str.length == 1) return new Atom(colorList.get(str));
        else {
            var result = [];
            var nameIndex = 0;
            var nextIndex = 1;
            while (nameIndex < str.length) {
                while (nextIndex < str.length && !isNaN(str[nextIndex])) nextIndex++;
                result.push([Substance.텍스트로물질생성(str[nameIndex]), Number(str.substring(nameIndex+1, nextIndex))]);
                nameIndex = nextIndex;
                nextIndex++;
            }
            return new Molecule(result);
        }
    }

    static 엘리먼트로생성(element) {
        if (element.classList.contains('무지개원자')) return Atom.엘리먼트로생성(element);
        if (element.classList.contains('분자')) return Molecule.엘리먼트로생성(element);
    }

    깊은복사() {

    }

    엘리먼트생성() {

    }

    세부정보생성(count) {

    }

    동일구성(비교물질) {

    }

    이름변경(이름배열) {

    }

    색존재여부(색) {

    }
}

class Atom extends Substance {
    constructor(color, name) {
        super();
        this.색 = color;
        this.이름 = name;
    }

    질량() {
        var result = 0;
        for (var i = 0; i < 6; i++) {
            if (nameList[i] == this.이름) result = massList[i];
        }
        return result;
    }

    static 엘리먼트로생성(element) {
        var color = null;
        var name = null;
        for (var i = 0; i < 6; i++) {
            if (element.classList.contains(colorList[i])) color = colorList[i];
            if (element.classList.contains(nameList[i])) name = nameList[i];
        }
        return new Atom(color, name);
    }

    깊은복사() {
        return new Atom(this.색, this.이름);
    }

    엘리먼트생성() {
        return 새엘리먼트('div', ['무지개원자', this.색, this.이름], null, this.이름 == null ? '★' : this.이름);
    }

    세부정보생성(count) {
        var 상자 = 새엘리먼트('div', ['세부정보상자'], null, null);
        var 원자아이콘 = this.엘리먼트생성();
        var 개수텍스트 = 새엘리먼트('div', ['개수정보'], null, `× ${count}`);
        var 질량텍스트 = 새엘리먼트('div', ['질량정보'], null, `… ${this.질량() == 0 ? '?' : this.질량()*count}`);
        엘리먼트추가([원자아이콘, 개수텍스트, 질량텍스트], 상자);
        return 상자;
    }

    동일구성(비교물질) {
        if (!(비교물질 instanceof Atom)) return false;
        if (this.색 == 비교물질.색) return true;
        return false;
    }

    이름변경(이름배열) {
        for (var i = 0; i < 6; i++) if (colorList[i] == this.색) this.이름 = 이름배열[i];
    }

    색존재여부(색) {
        return this.색 == 색;
    }
}

class Molecule extends Substance {
    constructor(info) {
        super();
        this.구성 = [];
        for (var i = 0; i < info.length; i++) this.구성.push([info[i][0].깊은복사(), info[i][1]]);
    }

    질량() {
        var result = 0;
        for (var i = 0; i < this.구성.length; i++) {
            if (this.구성[i][0].질량() == 0) return 0;
            result += this.구성[i][0].질량() * this.구성[i][1];
        }
        return result;
    }

    static 엘리먼트로생성(element) {
        var 원자 = Array.from(element.getElementsByClassName('무지개원자'));
        var 개수 = Array.from(element.getElementsByClassName('작은분자텍스트'));
        var 구성 = [];
        for (var i = 0; i < 원자.length; i++) {
            var color = null;
            for (var j = 0; j < 6; j++) {
                if (원자[i].classList.contains(colorList[j])) color = colorList[j];
            }
            구성.push([new Atom(color, 원자[i].textContent), 개수[i].textContent == '' ? 1 : Number(개수[i].textContent)]);
        }
        return new Molecule(구성);
    }

    static 혼합물로생성(mixture) {
        return new Molecule(mixture.구성);
    }

    깊은복사() {
       return new Molecule(this.구성);
    }

    엘리먼트생성() {
        var result = '';
        for (var i = 0; i < this.구성.length; i++) {
            if (this.구성[i][1] == 1) {
                result += `<div class="무지개원자 ${this.구성[i][0].색} ${this.구성[i][0].이름}">${this.구성[i][0].이름 == null ? '★' : this.구성[i][0].이름}</div><div class="작은분자텍스트 ${this.구성[i][0].색}"></div>`;
            }
            else {
                result += `<div class="무지개원자 ${this.구성[i][0].색} ${this.구성[i][0].이름}">${this.구성[i][0].이름 == null ? '★' : this.구성[i][0].이름}</div><div class="작은분자텍스트 ${this.구성[i][0].색}">${this.구성[i][1]}</div>`;
            }
        }
        return 새엘리먼트('div', ['분자'], null, result);
    }

    세부정보생성(count) {
        var 상자 = 새엘리먼트('div', ['세부정보상자'], null, null);
        var 분자아이콘 = this.엘리먼트생성();
        var 개수텍스트 = 새엘리먼트('div', ['개수정보'], null, `× ${count}`);
        var 질량텍스트 = 새엘리먼트('div', ['질량정보'], null, `… ${this.질량() == 0 ? '?' : this.질량()*count}`);
        엘리먼트추가([분자아이콘, 개수텍스트, 질량텍스트], 상자);
        return 상자;
    }

    동일구성(비교물질) {
        if (!(비교물질 instanceof Molecule)) return false;
        var 리스트 = [0, 0, 0, 0, 0, 0];
        for (var i = 0; i < this.구성.length; i++) {
            리스트[colorList.indexOf(this.구성[i][0].색)] += this.구성[i][1];
        }
        for (var i = 0; i < 비교물질.구성.length; i++) {
            리스트[colorList.indexOf(비교물질.구성[i][0].색)] -= 비교물질.구성[i][1];
        }
        for (var i = 0; i < 리스트.length; i++) if (리스트[i] != 0) return false;
        return true;
    }

    이름변경(이름배열) {
        for (var i = 0; i < this.구성.length; i++) this.구성[i][0].이름변경(이름배열);
    }

    색존재여부(색) {
        for (var i = 0; i < this.구성.length; i++) if (this.구성[i][0].색존재여부(색)) return true;
        return false;
    }
}

class Mixture {
    constructor(info, 이름배열, 원자숨기기, 정보숨기기) {
        this.구성 = [];
        for (var i = 0; i < info.length; i++) {
            if (info[i][0] instanceof Substance) {
                this.구성.push([info[i][0].깊은복사(), info[i][1]]);
            }
            else {
                this.구성.push([Substance.텍스트로물질생성(info[i][0]), info[i][1]]);
            }
        }
        this.이름배열 = [];
        for (var i = 0; i < 6; i++) this.이름배열.push(이름배열[i]);
        this.원자숨기기 = 원자숨기기;
        this.정보숨기기 = 정보숨기기;
    }

    초기화() {
        this.구성 = [];
    }

    원자겉보기() {
        var result = [];
        for (var i = 0; i < 6; i++) result.push(this.이름배열[i]);
        if (this.원자숨기기 != null) {
            for (var i = 0; i < 6; i++) {
                if (this.원자숨기기[i] == 'x') result[i] = '★';
            }
        }
        return result;
    }

    이름재설정(이름배열) {
        for (var i = 0; i < 6; i++) this.이름배열[i] = 이름배열[i];
    }

    깊은복사() {
        return new Mixture(this.구성);
    }

    개수정보() {
        var result = [];
        for (var i = 0; i < this.구성.length; i++) result.push(this.구성[i][1]);
        return result;
    }

    질량정보() {
        var result = [];
        for (var i = 0; i < this.구성.length; i++) {
            var 임시 = this.구성[i][0].깊은복사();
            임시.이름변경(this.이름배열);
            result.push(임시.질량()*this.구성[i][1]);
        }
        return result;
    }

    세부정보목록생성() {
        var result = [];
        var 개정 = this.개수정보();
        var 질정 = this.질량정보();
        if (this.정보숨기기 != null) {
            개정 = 배열가리기(개정, this.정보숨기기[0]);
            질정 = 배열가리기(질정, this.정보숨기기[1]);
        }
        for (var i = 0; i < this.구성.length; i++) {
            var 상자 = 새엘리먼트('div', ['세부정보상자'], null, null);
            var 임시 = this.구성[i][0].깊은복사();
            임시.이름변경(this.원자겉보기());
            var 물질아이콘 = 임시.엘리먼트생성();
            임시.이름변경(this.이름배열);
            var 개수텍스트 = 새엘리먼트('div', ['개수정보'], null, `× ${개정[i]}`);
            var 질량텍스트 = 새엘리먼트('div', ['질량정보'], null, `… ${질정[i]}`);
            엘리먼트추가([물질아이콘, 개수텍스트, 질량텍스트], 상자);
            result.push(상자);
        }
        return result;
    }

    물질위치(찾는물질) {
        for (var i = 0; i < this.구성.length; i++) {
            if (this.구성[i][0].동일구성(찾는물질)) return i;
        }
        return -1;
    }
    
    물질추가(추가물질) {
        if (this.물질위치(추가물질) == -1) {
            this.구성.push([추가물질.깊은복사(), 1]);
        }
        else {
            this.구성[this.물질위치(추가물질)][1]++;
        }
    }
    
    물질제거(제거물질) {
        this.구성[this.물질위치(제거물질)][1]--;
        if (this.구성[this.물질위치(제거물질)][1] == 0) {
            this.구성.splice(this.물질위치(제거물질), 1);
        }
    }

    동일구성(비교물질) {
        if (this.구성.length != 비교물질.구성.length) return false;
        for (var i = 0; i < 6; i++) {
            if (this.색존재여부(colorList[i])) {
                if (this.이름배열[i] != 비교물질.이름배열[i]) return false;
            }
        }
        outer: for (var i = 0; i < this.구성.length; i++) {
            for (var j = 0; j < 비교물질.구성.length; j++) {
                if (this.구성[i][0].동일구성(비교물질.구성[j][0]) && this.구성[i][1] == 비교물질.구성[j][1]) continue outer;
            }
            return false;
        }
        return true;
    }

    색존재여부(색) {
        for (var i = 0; i < this.구성.length; i++) if (this.구성[i][0].색존재여부(색)) return true;
        return false;
    }
}
