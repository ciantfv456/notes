import './Menu.css';
import { Link } from "react-router-dom";

function menuToggle() {
    let menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}
function darkModeToggle() {
    let toggle = document.querySelector('body');
    toggle.classList.toggle('dark');
}

export default function Menu(){
    return (<div className="menu">
        <div className="toggle" onClick={menuToggle}>
            <ion-icon name="add-outline"></ion-icon>
        </div>
        <li style={{ "--i": 0 }}>
            <Link to="/">
                <ion-icon name="home-outline"></ion-icon>
            </Link>
        </li>
        <li style={{ "--i": 1 }}>
            <Link to="/dashboard">
                <ion-icon name="albums-outline"></ion-icon>
            </Link>
        </li>
        <li style={{ "--i": 2 }}>
            <a href="#"><ion-icon name="people-outline"></ion-icon></a>
        </li>
        <li style={{ "--i": 3 }}>
            <a href="https://github.com/ciantfv456/notes/tree/master"><ion-icon name="git-branch-outline"></ion-icon></a>
        </li>
        <li style={{ "--i": 4 }}>
            <a onClick={darkModeToggle}><ion-icon name="contrast-outline"></ion-icon></a>
        </li>
        <li style={{ "--i": 5 }}>
            <a href="#"><ion-icon name="color-palette-outline"></ion-icon></a>
        </li>
        <li style={{ "--i": 6 }}>
            <a href="#"><ion-icon name="globe-outline"></ion-icon></a>
        </li>
        <li style={{ "--i": 7 }}>
            <a href="#"><ion-icon name="person-add-outline"></ion-icon></a>
        </li>
    </div>)
}