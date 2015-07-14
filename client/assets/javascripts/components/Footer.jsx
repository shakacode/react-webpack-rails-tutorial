import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div className='container'>
                <a href='http://www.railsonmaui.com'>
                    <div className='logo'/>
                    <h3 className='open-sans-light'>
                        Example of styling using image-url and Open Sans Light custom font
                    </h3>
                </a>
                <a href='https://twitter.com/railsonmaui'>
                    <div className='twitter-image'/>
                    Rails On Maui on Twitter
                </a>
            </div>
        );
    }
}
