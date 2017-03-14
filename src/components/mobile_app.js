import React, {Component} from 'react'
import MobileNewsHeader from './mobile_news_header'
import New_Footer from './news_footer'

import '../css/mobile.css'

class MobileApp extends Component {
    render () {
        return (
            <div>
                <MobileNewsHeader />
                {this.props.children}
                <New_Footer />
            </div>
        )
    }
}

export default MobileApp