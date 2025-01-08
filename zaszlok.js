document.onload=getData();
let randomCountryName;

async function getData() {
    const url = "https://restcountries.com/v3.1/region/europe";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        //console.log(data);
        const flags = getFlags(data);
        renderFlags(flags);
        const countryNames=getNames(data)
        startButtonManager(countryNames,data)//toDo
    } catch (error) {
        console.error(error.message);
    }
}

function getFlags(data) {
    const flags = data.map(item => item.flags.png);
    return flags;
}

function renderFlags(flags) {
    const zaszlokhelye = document.querySelector(".flag");
    flags.forEach(flagUrl => {
        const img = document.createElement("img");
        img.src = flagUrl;
        zaszlokhelye.appendChild(img);
    });
}

function getNames(data){
    const countries=data.map(({name}) =>name.common)
    console.log(countries);
    return countries;
}
//////////////////////////////////////////////////////

function getRandomName(nameList){
    const countryName=nameList.sort(()=>Math.random()-.5).splice(0, 1)
    console.log(countryName=randomCountryName);
}

function showRandomName(name){
    const input = document.querySelector("[type='text']");
    if (input instanceof HTMLInputElement) {
        input.value = "";
        input.value = name;
    }
}

function startButtonManager(){
    const startButton=document.querySelector("[type='button']")
    startButton.addEventListener("click",()=>{
        const input=document.querySelector("[type='text']");
        getRandomName()
        if(input instanceof HTMLInputElement && input.value===""){
            
        }
    })
}