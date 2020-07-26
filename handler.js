
let id = 0;

const addItem = ()=>
{
    let inputField = document.getElementById("todoinput");
    let text = inputField.value;

    let table = document.getElementsByTagName("table")[1];

    let tbody = table.children[1];

    let trow = document.createElement("tr"); 
    trow.setAttribute("id", id.toString());

    let tr0 = document.createElement("th");//To Do Item Description 
    tr0.innerHTML = text;

    let tr1 = document.createElement("th"); // check box
    let checkbox = document.createElement("input");
    checkbox.onclick = ()=> {     //ez pz function
        trow.setAttribute("style", "text-decoration: line-through");
        let audio = new Audio("sound.mp3");
        audio.play();
    }
    checkbox.setAttribute("type", "checkbox");
    tr1.appendChild(checkbox);

    let tr2 = document.createElement("th"); // Delete button
    let delete_button = document.createElement("button");
    delete_button.innerHTML = "Delete Item";
    delete_button.setAttribute("class", "button is-danger");
    delete_button.onclick = ()=>{ trow.remove();}
    tr2.appendChild(delete_button);

 

    trow.appendChild(tr0);
    trow.appendChild(tr1);
    trow.appendChild(tr2);

    tbody.appendChild(trow);

}


const main = async ()=>
{
    let button = document.getElementById("btn_todo");

    button.onclick = addItem;

    let table = document.getElementById("covidtable");
    let tbody = table.children[1];

    let trow = document.createElement("tr");

    let td0 = document.createElement("td");
    td0.innerHTML = await getTotalCases();

    let td1 = document.createElement("td");
    td1.innerHTML = await getTotalDeaths();

    let td2 = document.createElement("td");
    td2.innerHTML = await getTotalRecovered();

    trow.appendChild(td0);
    trow.appendChild(td1);
    trow.appendChild(td2);

    tbody.appendChild(trow);

}


const getAllData = async () =>
{
    let obj = await fetch("https://disease.sh/v3/covid-19/all", {
        "headers": {
            "accept": "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "x-requested-with": "XMLHttpRequest",
          },
          "method": "GET",
        "mode": "cors"
    })
    .then(res => {return res.text();})
    .then(data => {
        return data;
    });
    return await Promise.resolve(obj);
}

const getTotalRecovered = async () =>
{
    let obj = await fetch("https://disease.sh/v3/covid-19/all", {
        "headers": {
            "accept": "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "x-requested-with": "XMLHttpRequest",
          },
          "method": "GET",
        "mode": "cors"
    })
    .then(res => {return res.text();})
    .then(data => {
        let json = JSON.parse(data);
        return json.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // return formatted with commas
    });
    return await Promise.resolve(obj);
}

const getTotalDeaths = async () =>
{
    let obj = await fetch("https://disease.sh/v3/covid-19/all", {
        "headers": {
            "accept": "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "x-requested-with": "XMLHttpRequest",
          },
          "method": "GET",
        "mode": "cors"
    })
    .then(res => {return res.text();})
    .then(data => {
        let json = JSON.parse(data);
        return json.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // return formatted with commas
    });
    return await Promise.resolve(obj);
}

const getTotalCases = async () =>
{
    let obj = await fetch("https://disease.sh/v3/covid-19/all", {
        "headers": {
            "accept": "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "x-requested-with": "XMLHttpRequest",
          },
          "method": "GET",
        "mode": "cors"
    })
    .then(res => {return res.text();})
    .then(data => {
        let json = JSON.parse(data);
        return json.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // return formatted with commas
    });
    return await Promise.resolve(obj);
}


(
    async ()=>{await main();}
)();