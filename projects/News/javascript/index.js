const URL = "https://polisen.se/api/events";

window.onload = function() {
  populateTable()
}
setInterval(populateTable, 20000);

function getData() {
  var request = new XMLHttpRequest();
  request.open("GET", URL, false);
  request.send(null);

  const returnValue = {
    requestStatus: request.status,
    requestText: request.responseText
  }

  return returnValue;
}

function newUpdate() {
  const alert = document.createElement("img");
  alert.src = 'images/alert.ico'
  alert.id = 'alertImage'
  document.getElementById("images").appendChild(alert);
  const data = getData();
  const parsedData = parseJsonString(data.requestText);
  const parsedID = parsedData[0].name.toString()

  setTimeout(function() {
    alert.remove()
  }, 15000);
}

function populateTable(inputString) {
  const date = new Date(inputString)

  const data = getData();


  const parsedData = parseJsonString(data.requestText);
  const parsedID = parsedData[0].id.toString()

  // Adds the oldEvent cookie if it doesn't exist.
  if (getCookie("oldEvent") == null) {
    document.cookie = "oldEvent=" + parsedID;
  }

  // Detect and handle new events
  if (getCookie("oldEvent") !== parsedID) {
    newUpdate()
    console.log(getCookie("oldEvent"), parsedID, "News!")
    document.cookie = "oldEvent=" + parsedID;
  } else {
    console.log(getCookie("oldEvent"), parsedID, "Nothing new.")
  }

  // Adds and removes the Reload icon
  let table = document.getElementById("dataTableBody");
  const reload = document.createElement("img");
  reload.src = 'images/reload.ico'
  reload.id = 'reloadImage'
  reload.style.paddingLeft = '5px'
  const div = document.getElementById("images");
  document.getElementById("images").appendChild(reload);
  setTimeout(function() {
    reload.remove()
  }, 10000);

  table.innerHTML = "";




  let count = 0
  parsedData.forEach(item => {
    // Adds row
    let row = table.insertRow();
    
    // Adds class to row
    row.classList.add("Row");
    
    // Makes row correct color
    if (count % 2 == 0) {
      row.id = 'darkRow';
    } else {
      row.id = 'whiteRow';
    }
    count++



    //Id
    //let idCell = row.insertCell(0);
    //idCell.innerHTML = item.id;

    //Type
    let typeCell = row.insertCell(0);
    typeCell.innerHTML = item.type;
    //let aMore = document.createElement('a');
    //let infoLinkText = document.createTextNode(item.type);
    //aMore.appendChild(infoLinkText);
    //aMore.title = item.location.type;
    //aMore.href = "https://www.polisen.se" + item.url;
    //aMore.target = "_blank";
    //typeCell.appendChild(aMore)

    //Short Info

    let infoCell = row.insertCell(1);
    let aInfo = document.createElement('a');
    let infoLink = document.createTextNode(item.summary);
    aInfo.appendChild(infoLink);
    aInfo.href = `https://polisen.se${item.url}`;
    aInfo.target = "_blank";
    infoCell.appendChild(aInfo)

    //Location Name
    let locationCell = row.insertCell(2);
    let aLocation = document.createElement('a');
    let locationLink = document.createTextNode(item.location.name);
    aLocation.appendChild(locationLink);
    aLocation.href = `https://www.google.com/maps/search/${item.location.gps}`;
    aLocation.target = "_blank";
    locationCell.appendChild(aLocation)
    //Adds button -
    //let dropdownButton = document.createElement('button');
    //dropdownButton.textContent = item.location.name;
    //Adds div -
    //let dropdownContent = document.createElement('div');
    //dropdownContent.style.display = 'none';
    //Makes button do stuff -
    //dropdownButton.addEventListener('click', function() {
    //  locationCell.innerHTML = `<iframe
    //    src="https://www.google.com/maps/search/${item.location.gps}">
    //  </iframe>`;
    //});

    //dropdownButton.appendChild(dropdownContent);

    //dropdownButton.addEventListener('click', function() {
    //  dropdownContent.style.display = dropdownContent.style.display === 'none' ? 'block' : 'none';
    //});

    //locationCell.appendChild(dropdownButton);


    //Date
    const formattedDate = formatDateString(item.datetime);
    let datetimeCell = row.insertCell(3);
    datetimeCell.innerHTML = formattedDate

    //date sort test
    //let sorttest = row.insertCell(6);
    //const parsedDate = Date.parse(item.datetime);
    //sorttest.innerHTML = parsedDate
  })

}

function parseJsonString(data) {
  return JSON.parse(data);
}



function formatDateString(inputString) {
  const date = new Date(inputString) //Date.parse(inputString);

  //0 in Date
  let dayOfMonth = date.getDate();
  dayOfMonth < 10 ? dayOfMonth = "0" + dayOfMonth : null;

  //0 in Hour
  let hourOfDay = date.getHours();
  hourOfDay < 10 ? hourOfDay = "0" + hourOfDay : null;

  //0 in Minute
  let minuteOfHour = date.getMinutes();
  minuteOfHour < 10 ? minuteOfHour = "0" + minuteOfHour : null;

  //Creates Date String
  let parsedDateString = dayOfMonth + " " + getMonthString(date.getMonth()) + " " + hourOfDay + ":" + minuteOfHour;
  return parsedDateString;
}

function getMonthString(month) {
  switch (month) {
    case 0:
      return "Januari";
    case 1:
      return "Februari";
    case 2:
      return "Mars";
    case 3:
      return "April";
    case 4:
      return "Maj";
    case 5:
      return "Juni";
    case 6:
      return "Juli";
    case 7:
      return "Augusti";
    case 8:
      return "September";
    case 9:
      return "Oktober";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "N/A";
  }
}
