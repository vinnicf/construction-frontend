import React from 'react';
import OrcamentorLogo from '../../src/assets/orcamentor.svg'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light 
        ">
            <a className="navbar-brand" href="https://orcamentor.com"><img src={OrcamentorLogo} alt="" /> Orcamentor</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>


        </nav>
    );
}

export default Header;
