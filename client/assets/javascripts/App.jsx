import React from 'react';
import CommentBox from './components/CommentBox';
import Footer from './components/Footer';

class App extends React.Component {
    render() {
        return (
            <div>
                <CommentBox url='comments.json' pollInterval={5000}/>
            </div>
        )
    }
}

global.App = App; //Make this global to reference from html.