import React, {Component} from 'react'
import NewsHeader from './news_header'
import New_Footer from './news_footer'

import '../css/pc.css'

class App extends Component {
    render () {
        return (
            <div>
                <NewsHeader/>
                {this.props.children}
                <New_Footer />
            </div>
        )
    }
}

export default App