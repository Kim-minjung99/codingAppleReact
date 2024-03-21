// union Type : 타입 2개이상 합친 새로운 타입을 만든다.
// 초기화하면 확정이 된다. -> string타입
var 회원 = 'kim';
// number, string이 들어올 수 있는 배열을 만든다.
var 회원들1 = ['kim', 123];
// 들어오는 모든 값에 대해서 string 이나 number값에 대해 허용하겠다.
var 회원들2 = {
    a: 123,
    1: '123'
};
// 또는 들어오는 값에 대해 제한을 걸고 싶다면?
var 회원들3 = {
    a: 'kim'
};
// any타입은 모든 자료형 허용해준다. 
// 단, 타입 실드 해제 문법이라 아무렇게나 쓰면 그냥 일반 자바스크립트쓰는거랑 다르지 않음
// 타입관련 이상한 버그가 생겨도 잡아주지 앟는데
// 관련하여 unknown이라는 문법도 사용 가능한데 any와 유사하다. 단 조금 더 안전하다.
// any는 모든 자료형에 대해 허용을 하는 타입 실드 문법이기 때문에 any->string, number, array등 다 가능함
// 즉
// 해당 경우처럼 any가 string으로 인식되어 버그를 잡아주지 않는다.
var 회원들4 = {};
var check = 회원들4;
// unknwon을 쓰면 더 안전한 문법 사용이 가능하다.
var 회원들5 = {};
//let check2: string = 회원들5;
// 타입 스크립트는 연산시 타입을 중요시 여긴다.
// 즉 간단한 수학연산도 타입이 맞아야 연산이 가능하다.
// union 타입에서도 엄격한 타입 검사가 가능하기에 number끼리의 수학 연산만 가능하다.
// unknown도 마찬가지이다.
var 나이;
//let tot = 나이 + 1;
var 나이2 = 1;
//나이2 - 1;
// 이러한 문제는 narrowing과 같은 해결방식으로 문제를 풀어나갈수 있다.
var 학교 = {
    score: [100, 97, 84],
    teacher: 'phil',
    friends: 'Jor'
};
학교.score[4] = false;
학교.friends = ['lee', 학교.teacher];
/**
 * function
 */
// 파라미터 타입 값 지정, 함수 리턴값 형식 지정을 해줄 수 있다.
// 함수에서 리턴시 void도 지정해줄 수 있다. (void란 리턴값이 없는 형식을 말하는 것이다.)
// 타입지정된 파라미터는 필수이다. -> 필수가 아니길 바란다면 ? 문법을 사용해야 한다.
// 파라미터가 옵션인 경우는? -> (x: number| undefined) 과 동일하다.
// 타입 narrowing을 통해서 타입에 대한 분기를 쳐서 ? 문법에 대해 정확히 정의 할 수 있다.
function 함수(x) {
    if (x != undefined) {
        return x * 2;
    }
    else {
        return 0 * 2;
    }
}
var 결과 = 함수(3);
var 결과2 = 함수();
var isCanMarry = function (money, isHaveHouse, charmingPoint) {
    var moneyPoint = money;
    var housePoint = isHaveHouse === true ? 500 : 600;
    var totCharmingPoint = charmingPoint === '상' ? 100 : 0;
    var isCanMarryPoint = moneyPoint + housePoint + totCharmingPoint;
    if (isCanMarryPoint >= 600) {
        return "결혼가능";
    }
};
var 결혼가능 = isCanMarry(300, true, '상');
/**!SECTION
 * type narrowing, Assertion
 */
// 변수의 타입이 Union type처럼 다수의 타입을 가지고 있다면 정확한 연산이 불가능한데,
// 이럴때 사용하는 것은 narrowing 방법이다.
/**
 * 대표적인 narrowing방법은 typeof 연산자를 이용하는 것이다.
 */
function 내함수(x) {
    if (typeof x === 'string') {
        return x + '1';
    }
    else if (typeof x === 'number') {
        return x * 2;
    }
}
// 불확실한 변수를 타입 지정된 변수에 집어넣을때도 마찬가지
// if문 썼으면 끝까지 써주어야 한다. -> else if
// 또는 assertion문법을 사용하면 된다. -> as 로 지정하여 타입을 덮어씌우겠습니다.
// 
var array = [];
// if(typeof x === 'number'){
//     array[0] = x;
// }else if(typeof x === 'string'){
//     array[0] = 0;
// }
//array[0] = x as number;     // 해당 문법이 assertion인데 이는 as로써 타입 지정을 강제로 하여 덮어 씌우는 것이다.
var 이름 = 'kim';
//이름 as number;         // assertion은 타입이 지정된 변수에 대해서 덮어씌우기가 불가능하다.
// 빠따 안맞기 위한 assertion문법의 용도
// 1. narrowing할때 사용한다.
// 2. 들어오는 변수에 대해서 타입 지정이 확실할때만 사용가능하다.
// 하지말자... 버그추적 못한다.
var cleanArray = [1, '2', 3];
var cleanFunction = function (x) {
    var convertedArray = [];
    x.map(function (element, index) {
        if (typeof element === 'string') {
            //convertedArray[index] = +element;
            convertedArray.push(+element);
            //return +element;
        }
        else if (typeof element === 'number') {
            //convertedArray[index] = element;
            convertedArray.push(element);
            //return element;
        }
        return convertedArray;
    });
    return convertedArray;
    // const convertedArray:number[] = [];
    // x.forEach((element)=>{
    //     if(typeof element === 'string'){
    //         //convertedArray[index] = +element;
    //         convertedArray.push(+element);
    //     }else if(typeof element === 'number'){
    //         //convertedArray[index] = element;
    //         convertedArray.push(element);
    //     }
    //     return convertedArray;
    // });
    // return convertedArray;
};
console.log('cleanedArray??:::', cleanFunction(cleanArray));
// 네이밍 규칙은 뜻을 유추할 수 있게 긴 단어여도 풀이하여 기재한다.
var getLastSubjectName = function (subject) {
    // 가르치는 subject
    var teachSubject = subject;
    var checkSubjectValue = teachSubject.subject;
    if (typeof checkSubjectValue === 'string') {
        return checkSubjectValue;
    }
    else if (Array.isArray(checkSubjectValue)) {
        return checkSubjectValue[checkSubjectValue.length - 1];
    }
    else {
        return "There is No data";
    }
};
console.log("return subject:::", getLastSubjectName({ subject: ['science', 'art'] }));
var 동물 = "호랑이";
var 사람 = {
    age: 28,
    name: 'Minjung',
};
console.log("사람:::", 사람);
var 좌표 = { x: '1', y: 1 };
// 해당 리터럴 타입외의 내용을 넣어주면 에러가 난다.
// var whatIsResult: RockScissorPaper = "crown";
// const rockScissorPaper: RockScissorPaper = (whatItIs : RockScissorPaper) : RockScissorPaper[] => {
//     const resultBattleWin: RockScissorPaper[] = [];
//     if(whatItIs === "rock"){
//         resultBattleWin.push("paper");
//     }else if(whatItIs === "scissor"){
//         resultBattleWin.push("rock");
//     }else if(whatItIs === "paper"){
//         resultBattleWin.push("scissor");
//     }
//     return resultBattleWin;
// }
// console.log(rockScissorPaper("rock"));
/**
 * as const : object자료형을 readonly + literal type 지정 해주기
 */
// const란?
// 초기화와 동시에 변경 불가능한 자료형이다.
var whatIsName = 'kim';
// whatIsName = 'Min';    에러발생
// literal type는 const 상위호환 타입 지정이다.
// 관련해서 설명해줄 개념
var nameIs = {
    name: 'kim'
};
var getMyName = function (myName) {
    return myName;
};
// 분명히 nameIs.name 은 kim이 올텐데 왜 에러가 나는가??
// nameIs.name은 자료값이 kim인 것이지 type이 kim이 아니다
// 이럴때 사용할 수 있는방법?
// Assertion을 사용하거나, as const를 사용하면 된다.
//console.log("getNyName:::", getMyName(nameIs.name));
console.log("getNyName:::", getMyName(nameIs.name));
// as const의 효과
// 1. 선언 변수가 read-only가 된다.
// 2. 선언 변수 내에서 key의 타입이 value형이 된다. (name은 'kim'의 타입으로 지정합니다.)
// object를 잠그고 싶다면 as const를 이용하면 된다.
