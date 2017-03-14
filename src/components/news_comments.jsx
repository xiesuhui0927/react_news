import React, {Component} from 'react'
import {Form, Card, Button, Input, message, notification} from 'antd'

const FormItem = Form.Item
import axios from 'axios'


class  NewsComments extends Component {
    constructor (props) {
        super (props)
        this.state = {
            comments: []
        }
    }
    componentWillMount () {
        const {newsId} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${newsId}`
        axios.get(url)
            .then(response => {
                const comments = response.data.map(item => {
                    return {
                        username: item.UserName,
                        dataTime: item.datetime,
                        content: item.Comments
                    }
                })
                // 更新状态
                this.setState({comments})
            })
    }

    // 提交评论
    submitComment = (event) => {
        // 取消默认点击行为
        event.preventDefault()

        const userId = localStorage.userId
        if(!userId) {
            message.warn('请先登录!')
            return // 直接返回
        }

        const {newsId} = this.props
        const content = this.props.form.getFieldValue('content')
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${newsId}&commnet=${content}`
        axios.get(url)
            .then(response => {
                message.success('评论成功')
                // 接着更新评论列表
                this.componentWillMount()
                // 清除输入框的数据
                this.props.form.resetFields()
            })
    }
    // 添加收藏
    addCollection = () => {
        const userId = localStorage.userId
        if(!userId) {
            message.warn('请先登录!')
            return // 直接返回
        }
        const {newsId} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${newsId}`
        axios.get(url)
            .then(response => {
                notification.success({
                    message: 'ReactNews收藏',
                    description: '添加收藏成功啦!'
                })
            })
    }


    render () {
        const {comments} = this.state
        const commentsList = comments.map((comment, index) => (
                <Card key={index} title={comment.username} extra={`发布于 ${comment.dataTime}`}>
                    <p>{comment.content}</p>
                </Card>
            ))

        const {getFieldDecorator} = this.props.form

        return (
           <div>
               {commentsList}
               <Form onSubmit={this.submitComment} >
                   <FormItem label="您的评论">
                       {
                           getFieldDecorator('content')(<Input type="textarea" />)
                       }
                   </FormItem>
                   <Button type="primary" htmlType="submit" >提交评论</Button>
                   <Button type="primary" onClick={this.addCollection} >收藏该文章</Button>
               </Form>

           </div>
        )
    }
}

export default Form.create({})(NewsComments)