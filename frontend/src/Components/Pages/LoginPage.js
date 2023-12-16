import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';
import Navbar from '../Navbar/Navbar';
import { setAuthenticatedUser } from '../../utils/auths';

const LoginPage = () => {
  clearPage();
  renderLoginForm();
};

function renderLoginForm() {
  const main = document.querySelector('main');

  const formDiv = document.createElement('div');
  formDiv.className = 'formWrapper';

  const form = document.createElement('form');
  form.className = 'p-5';
  form.id = 'loginForm'

  const title = document.createElement('h1');
  title.className = 'text-center';
  title.innerHTML = 'Login';
  title.id = 'titleForm';

  const username = document.createElement('input');
  username.type = 'text';
  username.id = 'username';
  username.placeholder = 'Username';
  username.className = 'form-control mb-3';

  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'password';
  password.placeholder = 'Password';
  password.className = 'form-control mb-3';

  
  const notYetAnAccount = document.createElement('p');
  notYetAnAccount.innerHTML = 'Not yet an account ? <a href="/register">sign up.</a>';

  const submit = document.createElement('input');
  submit.value = 'Sign up';
  submit.type = 'submit';
  submit.id = 'loginSubmit'
  submit.className = 'btn btn-primary';

  const errorMessage = document.createElement('p');
  errorMessage.id = 'errorMessage';
  errorMessage.innerHTML = '';

  form.appendChild(title);
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(notYetAnAccount);
  form.appendChild(submit);
  form.appendChild(errorMessage);
  form.addEventListener('submit', onLogin); 
  
  formDiv.appendChild(form);
  
  main.appendChild(formDiv);
}


async function onLogin(e) {
  e.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const errorM = document.querySelector('#errorMessage');

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch('/api/auths/login', options);

  if (response.status === 400) {
    errorM.innerHTML = 'There is a field missing';
  } else if (response.status === 401) {
    errorM.innerHTML = 'Wrong username or wrong password';
  }
  if(!response.ok) {
    throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  }
  const authenticatedUser = await response.json();

  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/game');
}

export default LoginPage;