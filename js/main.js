console.log("postman clone");

//UTILITY FUNCTIONS

// 1) get the DOM element from the string
function getElement(html) {
  let div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
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
addParam.addEventListener('click', () => {
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

  let deleteParams = document.getElementsByClassName('deleteParam');
  for (item of deleteParams) {
    item.addEventListener('click', (e) => {
      // addedParamCount -= 1;
      //e is the event
      //e.target gives where the click is made
      //e.target.paramElement gives the div which we want to remove
      e.target.parentElement.remove();
    })
  }

})