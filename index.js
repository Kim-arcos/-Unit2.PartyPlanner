const BASE_URL = https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-WEB-PT/events
const mainEl = document.querySelector("main");

async function getEvents () {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data.data);
    return data.data;
}
getEvents();

function render(parties){
    const template = parties.map(parties =>{
        return (
            <section>
        <h2>${parties.name}</h2>
        <p>${parties.time}</p>
        <p>${parties.location}</p>
        <p>${parties.description}</p>
      </section>
        )
    }).join('');
    mainEl.innerHTML = template;
}

async function partyPlanner(){
    const parties = await partyPlanner();
    render (parties);
}
partyPlanner();
