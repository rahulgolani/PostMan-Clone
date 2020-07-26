console.log("postman clone");

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