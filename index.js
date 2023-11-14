const BASE_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-WEB-PT/events";
const mainEl = document.querySelector("main");
const form = document.getElementById("partyName");
form.addEventListener("submit", handleFormSubmit);

async function getEvents() {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  console.log(data.data);
  return data.data;
}
getEvents();

function render(parties) {
  const template = parties
    .map((party) => {
      return `
        <section>
          <h2>${party.name}</h2>
          <p>${party.time}</p>
          <p>${party.location}</p>
          <p>${party.description}</p>
        </section>
      `;
    })
    .join("");
  mainEl.innerHTML = template;
}

async function partyPlanner() {
  const parties = await getEvents();
  render(parties);
}

partyPlanner();

async function handleFormSubmit(event) {
  event.preventDefault();
  const name = form.querySelector('input[name="name"]').value;
  const time = form.querySelector('input[name="time"]').value;
  const location = form.querySelector('input[name="location"]').value;
  const description = form.querySelector('input[name="description"]').value;

  const newEvent = { name, time, location, description };
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEvent),
  });
  if (response.ok) {
    const parties = await getEvents();
    render(parties);
    form.reset();
  }
}
