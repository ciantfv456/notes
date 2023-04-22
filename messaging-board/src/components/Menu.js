import { useState } from "react"
export default function Menu() {
    const [active, setActive] = useState(0)
    return (
        <div className="navigation">
            <ul>
                <li key="boards" className="list" id={active == 0 ? "active": ""} onClick={() => {setActive(0)}}>
                    <a href='#'>
                        <span className='icon'><ion-icon name="documents-outline"></ion-icon></span>
                        <span className='text'>Boards</span>
                    </a>
                </li>
                <li key="color" className="list" id={active == 1 ? "active": ""} onClick={() => {setActive(1)}}>
                    <a href='#'>
                        <span className='icon'><ion-icon name="color-palette-outline"></ion-icon></span>
                        <span className='text'>Custome Colors</span>
                    </a>
                </li>
                <li key="profile" className="list" id={active == 2 ? "active": ""} onClick={() => {setActive(2)}}>
                    <a href='#'>
                        <span className='icon'><ion-icon name="person-outline"></ion-icon></span>
                        <span className='text'>Profile</span>
                    </a>
                </li>
                <li key="settings" className="list" id={active == 3 ? "active": ""} onClick={() => {setActive(3)}}>
                    <a href='#'>
                        <span className='icon'><ion-icon name="settings-outline"></ion-icon></span>
                        <span className='text'>Settings</span>
                    </a>
                </li>
                <li key="about" className="list" id={active == 4 ? "active": ""} onClick={() => {setActive(4)}}>
                    <a href='#'>
                        <span className='icon'><ion-icon name="bookmark-outline"></ion-icon></span>
                        <span className='text'>About</span>
                    </a>
                </li>
                
                <div className="indicator"></div>
            </ul>
            
        </div>
    )
}