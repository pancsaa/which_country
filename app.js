window.onload = sendRequest();
let randomCountryName;
// Kérés küldése az API felé:
async function sendRequest() {
    const url = "https://restcountries.com/v3.1/region/europe";
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            throw new Error("Request error!", response.status);
        }
        const data = await response.json();
        console.log(data);
        const flags = getFlags(data);
        renderFlags(flags);
        const countryNames = getNames(data);
        startButtonManager(countryNames, data);
    } catch (error) {
        console.log(error.message);
    }
}
// Zászlóképek listáját elkészíti:
function getFlags(data) {
    const flags = data.map(item => item.flags.png);
    // console.log(flags);
    return flags;
}
// Országok neveinek listája:
function getNames(data) {
    const countries = data.map(({ name }) => name.common);
    console.log(countries);
    return countries;
}

// Zászlók renderelése:
function renderFlags(flags) {
    const container = document.querySelector(".flags");
    container.innerHTML = "";
    const content = flags.map(flag => `
        <div><img src="${flag}"></div>
    `).join("");
    container.innerHTML = content;
}
// Indul a játék! *****************************************
// Véletlen-országnév készítése + a név kivétele a listából:
// Nem kell a neveket globálisan tárolni, mert csak referenciát kap a függvény, nem értékeket!!!
function getRandomName(nameList) { // unit-tesztre jó!
    const countryName = nameList.sort(() => Math.random() - 0.5).splice(0, 1);
    return countryName;
}
// A kitalálandó ország nevét sorsoljuk:
function showRandomName(name) {
    const input = document.querySelector("[type='text']");
    if (input instanceof HTMLInputElement) {
        input.value = "";
        input.value = name;
    }
    
}

// Flags manager:
function flagsManager(nameList, data) {
    const flags = document.querySelectorAll(".flags div img");
    console.log("Teszt: ",randomCountryName);
    if (flags.length > 0) {
        flags.forEach(flag => {
            flag.addEventListener("click", (event) => {
                handleClick(event, nameList, data)
            });
        })
    }
}

// A handleClick összefogja az össze alműveletet, amelyek zászlóra kattintáskor működni kezdenek:
// - kattintott zászló "neve"
// - validálás - a megjelenő országnak a zászlójára kattintottak-e
function handleClick(event, nameList, data) {
    const flagURL = getFlagURL(event);
    console.log(randomCountryName);
    // Ha kattintott zászló === országnevével, akkor alert, és új név Különben alert és új katt. lehetőség
    if (isSame(flagURL, data)) {
        alert("Grautlálok!");
        randomCountryName = getRandomName(nameList)[0];
        showRandomName(randomCountryName);
        return;
    }
    alert("Próbálja újra!");
    return;
}

// Zászlóra kattintás --> visszaadja a zászló "nevét" url-címét:
function getFlagURL(event) {
    if (event.target instanceof HTMLImageElement) {
        // console.log(event.target.src);
        return event.target.src;
    }
}

// Validálás:
function isSame(flagURL, data) {
    const dataLength = data.length;
    let i = 0;
    while ((i < dataLength) && (data[i].name.common !== randomCountryName || data[i].flags.png !== flagURL)) {
        i++;
    }
    //console.log(i < dataLength);
    return i < dataLength;
}

// Start button manager:
function startButtonManager(nameList, data) {
    const startButton = document.querySelector("[type='button']");
    startButton.addEventListener("click", () => {
        // A kezdés gomb csak először írat ki országnevet: TODO
        const input = document.querySelector("[type='text']");
        randomCountryName = getRandomName(nameList)[0]; // Unit-teszt round volt random helyett...
        if (input instanceof HTMLInputElement && input.value === "") {
            showRandomName(randomCountryName);
        }        
        flagsManager(nameList, data);
    })
}
