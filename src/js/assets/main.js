const dollar = 27.7;
const samsung = 750*dollar;
const xiaomi = 650*dollar;

const Samsung = document.getElementById('samsung');
const Xiaomi = document.getElementById('xiaomi');
const answer = document.getElementById('answer');

if (dollar > 26 || dollar === 26){
Samsung.innerHTML = samsung;
Xiaomi.innerHTML = xiaomi;
}
else {
    document.getElementById('app').style.display = 'none';
    answer.innerHTML = 'Product not founded'
}