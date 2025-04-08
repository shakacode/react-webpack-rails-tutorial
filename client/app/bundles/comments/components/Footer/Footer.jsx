import React from 'react';
import BaseComponent from 'libs/components/BaseComponent';

export default class Footer extends BaseComponent {
  render() {
    return (
      <footer className=" text-neutral-200 bg-[#222] py-8 mt-16">
        <div className="container mx-auto px-4">
          <a href="http://www.shakacode.com">
            <h3 className="flex gap-4 items-center">
              <div className="w-[146px] h-[40px] bg-[url('../images/railsonmaui.png')]" />
              Example of styling using image-url and Open Sans Light custom font
            </h3>
          </a>
          <a href="https://x.com/railsonmaui" className="flex gap-4 items-center">
            <div className="w-16 h-16 bg-[url('../images/twitter_64.png')]" />
            Rails On Maui on X/Twitter
          </a>
        </div>
      </footer>
    );
  }
}
