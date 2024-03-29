import styles from './styles.module.scss';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { PayPalButtons } from '@paypal/react-paypal-js';
import  firebase  from '../../services/firebaseConnection';
import { useState } from 'react';

import Image from 'next/image' ;
import rocket from '../../../public/images/rocket.svg';

// Client ID = Af8XDgLYrqLJr8N2p481iLXW9I6BysOE8joQ74gdOtCLkBbX6q4PvS6gkN-4bwhXbyyMJ8E-ZvBLCgoj
// <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>

interface DonateProps{
    user:{
        id:string;
        nome:string;
        image:string;
    }

}



export default function Donate( { user }:DonateProps){
    const [vip, setVip] = useState(false);

    async function handleSaveDonate() {
        await firebase.firestore().collection('users')
        .doc(user.id)
        .set({
            donate:true,
            lastDonate:new Date(),
            image:user.image
        })
        .then(()=>{
            setVip (true);
        })
    }


    return(
        <>
        <Head>
            <title> Ajude a plataforma Board ficar online!</title>
        </Head>
        <main className={styles.container}>
            <Image src={rocket} alt='Seja apoiador'/>

            {vip && (
                <div className={styles.vip}>
                    <Image width={50} height={50} src={user.image} alt='Foto de perfil do usuário'/>
                    <span>Parabéns, agora você é um colaborador!</span>
                </div>
            )}
            
            <h1>Seja um apoiador deste projeto! 🏆 </h1>
            <h3>Contribua com apenas <span>R$ 1,00</span></h3>
            <strong>Apareça na nossa Home e tenha funcionalidades exclusivas.</strong>

            <PayPalButtons
                createOrder={(data, actions)=>{
                    return actions.order.create({
                        purchase_units:[{
                            amount:{
                                value: '1'
                            }
                        }]
                    })        
                }}
                onApprove={ (data, actions)=>{
                    return actions.order.capture().then(function(details){
                        console.log('compra aprovada ' +details.payer.name.given_name)
                        handleSaveDonate();
                    })
                }}
            />
        </main>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) =>{
    const session = await getSession({ req })

    if(!session?.id){
        return{
            redirect:{
                destination: '/',
                permanent:false
            }
        }
        
    }

    const user = {
        id:session?.id,
        nome: session?.user.name,
        image:session?.user.image
    }

    return{
        props:{
            user

        }
    }
}