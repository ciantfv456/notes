import './Profile.css';
import { Link } from "react-router-dom";

function profileToggle() {
    let menu = document.querySelector('.profile');
    menu.classList.toggle('active');
}

export default function Profile(){
    return (<div className="profile">
        <div className="profile-toggle" onClick={profileToggle}>
            <ion-icon name="person-outline"></ion-icon>
        </div>
        <li style={{ "--i": 0 }}>
            <Link to="/">
                <ion-icon name="settings-outline"></ion-icon> {/* your profile - profile picture, some useless details, recent dashboards */}
            </Link>
        </li>
        <li style={{ "--i": 1 }}>
            <Link to="/my-dashboard">
                <ion-icon name="albums-outline"></ion-icon> {/* your dashboards - list of dashboards, new, delete, label dashboards*/}
            </Link>
        </li>
        <li style={{ "--i": 2 }}>
        <Link to="/shared-dashboard">
            <ion-icon name="people-outline"></ion-icon> {/* Shared dashboards */}
        </Link>
        </li>
    </div>)
}