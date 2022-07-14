import Link from    'next/link';
import styles from './styles.module.scss';
import { SigninButton } from '../SigninButton';

import Image from 'next/image';
import logo from '../../../public/images/logo.svg';



export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>

                <Link href='/'>
                    <a>
                    <Image src={logo} alt='logo'/>
                    </a>
                
                </Link>
                
                
                <nav>
                    <Link href='/'>
                        <a>Home</a>
                    </Link>
                    
                    <Link href='/board'>
                        <a>Meu board</a>
                    </Link>
                    

                </nav>
                
                <SigninButton/>
               
            </div>
        </header>
    )
}