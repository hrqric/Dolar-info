const getAPI = 'https://economia.awesomeapi.com.br/last/'
const value1 = 'USD'

const htmlvalorIn = '1'; // criar input pra valor
const htmlValorOut =  document.querySelector('.valorout')

const getValue = async (moeda) => {
    const param =  `${moeda}-BRL`
    const APIRESPONSE = await fetch(getAPI + param)
    if (APIRESPONSE.status == 200){
        const data = await APIRESPONSE.json();
        console.log(data)
        return data
    }
    else {
        console.log('erro')
    }
}

const renderValue = async (moeda) => {
    const data = await getValue(moeda);
    if (data) {
        htmlValorOut.innerHTML = data.USDBRL.bid
    }
}

renderValue(value1) // criar input pra valor
