
import Logo from "../assets/logoanime.png";


export default function Header() {
    return (
        <header className="header">
            <div className="brand">
                <img src={Logo} alt="Logo" className="logo" />
                <div className="empresa">
                    <h1 className="titulo">Sistema de control</h1>
                    <p className="slogan">LLeva el control de tu pasatiempo favorito</p>
                </div>
            </div>
        </header>
    )
};