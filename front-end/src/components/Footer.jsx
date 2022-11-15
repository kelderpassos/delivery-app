import React from 'react';
import {
  WhatsappLogo,
  At, MapPin,
  InstagramLogo,
  YoutubeLogo, PinterestLogo } from 'phosphor-react';
import styles from './CSS/Footer.module.css';

function Footer() {
  return (
    <div className={ styles.footerContainer }>
      <section className={ styles.support }>
        <h3>Suporte</h3>
        <p>Política de Troca e Garantia</p>
        <p>Cancelamento</p>
        <p>Fale Conosco</p>
        <p>Política de Privacidade</p>
      </section>
      <section className={ styles.contact }>
        <h3>Contatos</h3>
        <div>
          <WhatsappLogo size={ 32 } weight="light" />
          <p>(99)99999-9999</p>
        </div>
        <div>
          <At size={ 32 } weight="light" />
          <p>lojavirtual@expressobebidas.com</p>
        </div>
        <div>
          <MapPin size={ 32 } weight="light" />
          <p>Rua Ziggy Stardust, 999, David Bowie - Marte</p>
        </div>

      </section>
      <section className={ styles.socialMedias }>
        <h3>Redes Sociais</h3>
        <div>
          <InstagramLogo size={ 32 } />
          <YoutubeLogo size={ 32 } />
          <PinterestLogo size={ 32 } />
        </div>
      </section>
    </div>
  );
}

export default Footer;
