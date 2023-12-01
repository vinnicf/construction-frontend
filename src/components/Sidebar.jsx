import React, { useState, useContext } from 'react';
import { Group, Code } from '@mantine/core';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';
import classes from '../styles/NavbarSimpleColored.module.css'
import OrcamentorLogo from '../../src/assets/orcamentor-white.svg'
import {
  IconSquareRoundedPlusFilled,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconUserFilled,
} from '@tabler/icons-react';

const data = [
  { link: '/criar-orcamento', label: 'Criar Orçamento', icon: IconSquareRoundedPlusFilled },
  { link: '/', label: 'Meus Orçamentos', icon: IconReceipt2 },
  { link: '', label: 'Composições', icon: IconDatabaseImport },

];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage whether the sidebar is collapsed
  const [active, setActive] = useState('Meus Orçamentos');
  const { logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed); // Toggle the isCollapsed state
  };

  const handleLogout = () => {
    logout();
  };

  const links = data.map((item) => (
    <Link
      to={item.link}
      className={`${classes.link} ${active === item.label ? classes.active : ''}`}
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <span className='orcamentorlogo'><img src={OrcamentorLogo} alt="" /> Orcamentor</span>
          <Code fw={700} className={classes.version}>

          </Code>

        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconUserFilled className={classes.linkIcon} stroke={1.5} />
          <span>{user.username}</span>
        </a>

        <a href="#" className={classes.link} onClick={handleLogout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Sair</span>
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;
