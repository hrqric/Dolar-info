let urlXML = "https://economia.awesomeapi.com.br/xml/available/uniq";

const getAPI = 'https://economia.awesomeapi.com.br/last/'
const value1 = 'USD'

const inp_valorIn = document.querySelector('.valorin'); // criar input pra valor
const cb_cointype = document.querySelector('.coin')
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
        console.log('erro');
    }
}

const renderValue = async (moeda) => {
    const data = await getValue(moeda);
    const conv = Object.keys(data)[0]
    const inp = parseFloat(inp_valorIn.value)
    const valor = parseFloat(data[conv].bid)
    console.log(conv)
    console.log(`input ${inp}`)
    if (data) {
        if (inp > 1) {
            htmlValorOut.innerHTML =  (valor * inp).toLocaleString('en-US', {
                style: 'currency',
                currency: 'BRL',
            });

            console.log(htmlValorOut.innerHTML)
    }
        else{
            htmlValorOut.innerHTML = valor.toLocaleString('en-US', {
                style: 'currency',
                currency: 'BRL',
            })
        }
}
}

const getXML = async (urlXML) => {
    $.ajax(urlXML)
    .done(function(xml){
        $(xml).find('xml').children().each(function(){
            const defaultCode = 'USD'
            const codigo = this.tagName;
            const nome = $(this).text();
            console.log(`${codigo} - ${nome}`);

            if(codigo == defaultCode){
                $('.coin').append(
                    $('<option>', {
                        value: codigo,
                        text: `${codigo} - ${nome}`,
                        selected: true
                    }));
            }

            else{
                $('.coin').append(
                    $('<option>', {
                        value: codigo,
                        text: `${codigo} - ${nome}`
                    }));
            }

        });
    })
    
    .fail(function(){
        alert("Erro na leitura")
    })
}

inp_valorIn.addEventListener('change', function(){
    if (this.value.trim() === ''){
        this.value = '1'
    }
})


cb_cointype.addEventListener("change", (event) => {
    event.preventDefault();
    renderValue(cb_cointype.value.toUpperCase());
})

inp_valorIn.addEventListener("change", (event) => {
    event.preventDefault();
    renderValue(cb_cointype.value)
})


getXML(urlXML)
renderValue(value1) 