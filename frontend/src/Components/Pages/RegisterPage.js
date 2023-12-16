import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';
import Navbar from '../Navbar/Navbar';

const RegisterPage = () => {
  clearPage();
  renderRegisterForm();
};

function renderRegisterForm() {
  const main = document.querySelector('main');

  const formDiv = document.createElement('div');
  formDiv.className = 'registerWrapper';

  const form = document.createElement('form');
  form.className = 'p-5';
  form.id = 'registerForm';

  const title = document.createElement('h1');
  title.innerHTML = 'Register';
  title.id = 'titleForm';
  title.className = 'text-center';

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

  const confirmPassword = document.createElement('input');
  confirmPassword.type = 'password';
  confirmPassword.id = 'confirmPassword';
  confirmPassword.placeholder = 'Confirm your password';
  confirmPassword.className = 'form-control mb-3';

  const alReadyAnAccount = document.createElement('p');
  alReadyAnAccount.innerHTML = 'Already have an account ? <a href="/login">sign in.</a>';

  const submit = document.createElement('input');
  submit.value = 'Sign up';
  submit.type = 'submit';
  submit.id = 'registerSubmit';
  submit.className = 'btn btn-primary';

  const errorMessage = document.createElement('p');
  errorMessage.id = 'errorMessage';
  errorMessage.innerHTML = '';

  const privacyPolicyP = document.createElement('p');
  privacyPolicyP.innerHTML =
    'By continuing, you confirm that you have read and understand the <a href="https://policies.google.com/privacy?hl=en-US" target="_blank style="color:white";>Privacy Policy.</a>';
  
  form.appendChild(title);
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(confirmPassword);
  form.appendChild(alReadyAnAccount);
  form.appendChild(privacyPolicyP);
  form.appendChild(submit);
  form.appendChild(errorMessage);
  form.addEventListener('submit', onRegister);

  formDiv.appendChild(form);
 
  main.appendChild(formDiv);
}

async function onRegister(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirmPassword').value;
  const errorM = document.querySelector('#errorMessage');

  if (password !== confirmPassword) {
    errorM.innerHTML = 'Your passwords are not the same';
    throw new Error('Wrong confirmation password');
  }

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

  const response = await fetch('/api/auths/register', options);

  if (response.status === 400) {
    errorM.innerHTML = 'There is a field missing';
  } else if (response.status === 409) {
    errorM.innerHTML = 'This username already exists';
  }
  if (!response.ok) {
    throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  }
  const authenticatedUser = await response.json();
  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/');
}

export default RegisterPage;
