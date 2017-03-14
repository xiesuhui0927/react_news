import React, {Component} from 'react'
import {
    BackTop
} from 'antd'

import axios from 'axios'

import NewsComments from './news_comments'

class MobileNewsDetail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            news: ''
        }
    }

    componentDidMount () {
        const uniquekey = this.props.params.news_id
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response => {
                const news = response.data
                this.setState({news})
                document.title = news.title + " - React News | React驱动的新闻平台";
            })
    }


    render() {

        const {news} = this.state
        return (
            <div style={{padding: '10px'}}>
                <div className="mobileDetailsContainer">
                    <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
                    <hr/>
                    <NewsComments newsId={this.props.params.news_id}/>
                </div>
                <BackTop />
            </div>
        )
    }
}

export default MobileNewsDetail