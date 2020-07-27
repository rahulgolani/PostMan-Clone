console.log("postman clone");
//fLehGQotgcMvU5o7z4DYbXCi0qE2
//UTILITY FUNCTIONS

// 1) get the DOM element from the string
function getElement(html) {
  let div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
}

// 2) get the DOM element for the output response
function getResponseElement(text) {
  let div = document.createElement('div');
  div.innerHTML = text;
  console.log(div);
  return div;
}


//since the default value is json, so onload of the page the parameterbox should not display
let parameterBox = document.getElementById('parameterBox');
parameterBox.style.display = 'none';

//getting the parameter radio
let paramsRadio = document.getElementById('params');

//adding event listener to manage visibility of parameter box and json box
paramsRadio.addEventListener('click', () => {
  document.getElementById('jsonBox').style.display = 'none';
  document.getElementById('parameterBox').style.display = 'block';
})

//getting the json radio
let jsonRadio = document.getElementById('json')

//adding event listener to manage visibility of parameter box and json box
jsonRadio.addEventListener('click', () => {
  document.getElementById('parameterBox').style.display = 'none';
  document.getElementById('jsonBox').style.display = 'block';
})

let addedParamCount = 1;

//getting the + parameter button
let addParam = document.getElementById('addParams');

//on clicking + parameter, user should get the option to add the parameter and its value
addParam.addEventListener('click', (e) => {
  e.preventDefault();
  addedParamCount += 1;
  let newPparams = document.getElementById('newParams');

  let html = `<div class="form-row my-2">
    <label for="urlField" class="col-sm-2 col-form-label">Parameter ${addedParamCount}</label>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parameterKey${addedParamCount}" placeholder="Parameter Key">
    </div>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parameterValue${addedParamCount}" placeholder="Parameter Value">
    </div>
    <button id="addParams" class="btn btn-primary deleteParam">-</button>
  </div>`;
  //convert the element string to DOM node
  let paramElement = getElement(html);
  console.log(paramElement);
  newParams.appendChild(paramElement);

  // paramElement.addEventListener('click', (e) => {
  //   let flag = confirm("Press OK to remove parameter");
  //   if (flag) {
  //     e.target.parentElement.remove();
  //   }
  //
  // });
  //adding event listener to - button
  let deleteParams = document.getElementsByClassName('deleteParam');
  for (item of deleteParams) {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      // addedParamCount -= 1;
      //e is the event
      //e.target gives where the click is made
      //e.target.paramElement gives the div which we want to remove
      e.target.parentElement.remove();
    })
  }
})


//onSubmit
let submit = document.getElementById('submit');
submit.addEventListener('click', (e) => {
  e.preventDefault();
  //add a wait message in the response box
  // document.getElementById('responseBox').value = "Please Wait...";
  document.getElementById('responsePrism').innerHTML = "Please Wait...";

  let url = document.getElementById('urlField').value;
  let requestType = document.querySelector("input[name='requestType']:checked").value;
  let contentType = document.querySelector("input[name='contentType']:checked").value;

  if (contentType == 'params') {
    data = {};
    for (let i = 1; i <= addedParamCount; i++) {
      if (document.getElementById('parameterKey' + i) != undefined) {
        let key = document.getElementById('parameterKey' + i).value;
        let value = document.getElementById('parameterValue' + i).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data)
    console.log(data);
  } else {
    data = document.getElementById('jsonFieldBox').value;
    console.log(data);
  }
  console.log(url);
  console.log(requestType);
  console.log(contentType);
  console.log(data);

  // https://jsonplaceholder.typicode.com/
  // https://randomuser.me/api/

  if (requestType == 'GET') {
    if (contentType == "params") {
      parameters = JSON.parse(data)
      let totalKeys = Object.keys(parameters).length;
      let countKeys = 0;
      for (key in parameters) {
        if (countKeys == 0) {
          url += '?';
        }
        console.log(key, parameters[key]);
        url += `${key}=${parameters[key]}`;
        countKeys += 1;
        if (countKeys < totalKeys) {
          url += '&';
        }
      }
      console.log(url);
    }
    fetch(url, {
      method: 'GET',
    }).then((response) => response.text()).then(text => {
      // console.log(json);
      // document.getElementById('responseBox').value = text;
      document.getElementById('responsePrism').innerHTML = text;
      // let responseElement = getResponseElement(text);
      // document.getElementById('responsePrism').innerHTML = responseElement;
      Prism.highlightAll();
    })
  } else {
    fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then((response) => response.text()).then(text => {
      // document.getElementById('responseBox').value = text;
      document.getElementById('responsePrism').innerHTML = text;
      Prism.highlightAll();
    })
  }
})