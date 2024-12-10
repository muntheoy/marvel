import React from 'react';
import styles from '../styles/Footer.module.scss';
import logo from '../assets/logo.svg';

const Footer: React.FC = () => {

    return (
        <div className="footer">
            <div className={styles.container}>
                <img src={logo} alt="Logo"/>

                <p>Data provided by Marvel 2022 MARVEL</p>
            </div>
        </div>
    );
};

export default Footer;
