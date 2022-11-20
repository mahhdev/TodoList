import styles from './Header.module.css';

import layer from '../assets/layer.svg';
import logo from '../assets/logo.svg';

export function Header() {
    return (
        <header className={styles.header}>
            <img src={layer} alt="layer" />
            <img src={logo} alt="logo" />
        </header>
    )
}