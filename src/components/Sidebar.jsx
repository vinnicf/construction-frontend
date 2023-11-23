import React, { useState } from 'react';
import { Group, Code } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from '../styles/NavbarSimpleColored.module.css'
import OrcamentorLogo from '../../src/assets/orcamentor.svg'
import Carrinho from '../assets/carrinho.svg'
import {
    IconSquareRoundedPlusFilled,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconDatabaseImport,
    IconReceipt2,
    IconSwitchHorizontal,
    IconLogout,
  } from '@tabler/icons-react';

  const data = [
    { link: '/criar-orcamento', label: 'Criar Orçamento', icon: IconSquareRoundedPlusFilled },
    { link: '/', label: 'Meus Orçamentos', icon: IconReceipt2 },
    { link: '', label: 'Composições', icon: IconDatabaseImport },

  ];

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false); // State to manage whether the sidebar is collapsed
    const [active, setActive] = useState('Meus Orçamentos');

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed); // Toggle the isCollapsed state
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
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Mudar Conta</span>
          </a>
  
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Sair</span>
          </a>
        </div>
      </nav>
    );
};

export default Sidebar;
