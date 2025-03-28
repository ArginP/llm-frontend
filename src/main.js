import './style.css';
import 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
import logoSrc from './assets/logo.png';
import profileImgSrc from './assets/profile.png';

const logoPage = document.getElementById('logo');
const profileImgPage = document.getElementById('profileImg');

logoPage.src = logoSrc;
profileImgPage.src = profileImgSrc;