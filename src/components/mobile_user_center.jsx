import React, {Component} from 'react'
import {
    Tabs,
    Card,
    Upload,
    Icon,
    Modal
} from 'antd'

import {Link} from 'react-router'

import axios from 'axios'
const TabPane = Tabs.TabPane
class MobileUserCenter extends Component {
    constructor (props) {
        super(props)
        this.state ={
            collections: [],
            comments: [],
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }]
        }
    }
    componentDidMount () {
        const userId = localStorage.userId
        // 获取收集列表
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
        axios.get(url)
            .then(response => {
                const collections = response.data.map(item => {
                    return {
                        'uniquekey': item.uniquekey,
                        "title": item.Title
                    }
                })
                // 更新收藏列表
                this.setState({collections})
            })
        // 获取评论列表
        url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
        axios.get(url)
            .then(response => {
                const comments = response.data.map(item => {
                    return {
                        'uniquekey': item.uniquekey,
                        'dataTime': item.datetime,
                        "content": item.Comments
                    }
                })
                // 更新评论列表
                this.setState({comments})
            })
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    render() {
        const {collections, comments} = this.state
        const collectionList = collections.length
        ?  collections.map((item, index) =>(
            <Card key={index} title={item.uniquekey} extra={<Link to={`/news_detail/${item.uniquekey}`} >查看</Link>} >
                <p>{item.title}</p>
            </Card>
        ))
        : '您还没有收藏任何的新闻， 快去收藏一些新闻吧.'

        const commentList = comments.length
        ? comments.map((item, index) =>(
            <Card key={index} title={`于 ${item.dataTime} 评论了文章 ${item.uniquekey}`} extra={<Link to={`/news_detail/${item.uniquekey}`} >查看</Link>} >
                <p>{item.content}</p>
            </Card>
        ))
        : '您还没有发表过任何评论。'

        // 上传相关
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        )

        return (
            <div>
                <Tabs>
                    <TabPane tab="我的收藏列表" key="1">
                        {collectionList}
                    </TabPane>
                    <TabPane tab="我的评论列表" key="2">
                        {commentList}
                    </TabPane>
                    <TabPane tab="头像设置" key="3">

                        <Upload
                            action="http://localhost:3000/posts/"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}>
                            {uploadButton}
                        </Upload>

                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>

                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default MobileUserCenter