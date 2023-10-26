import React from 'react';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Orcamentor</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Composições</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Insumos</a>
                    </li>
                </ul>
                <button className="btn btn-primary my-2 my-sm-0">Criar Orçamento</button>
            </div>
        </nav>
    );
}

export default Header;
