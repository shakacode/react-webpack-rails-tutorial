import React from 'react';
import BaseComponent from 'libs/components/BaseComponent';
import css from './Footer.module.scss';

export default class Footer extends BaseComponent {
  render() {
    return (
      <footer className=" text-neutral-200 bg-[#222] py-8">
        <div className="container mx-auto px-4">
          <a href="http://www.shakacode.com">
            <h3>
              <div className={css.logo} />
              Example of styling using image-url and Open Sans Light custom font
            </h3>
          </a>
          <a href="https://twitter.com/railsonmaui">
            <div className={css.twitterImage} />
            Rails On Maui on Twitter
          </a>
        </div>
      </footer>
    );
  }
}
