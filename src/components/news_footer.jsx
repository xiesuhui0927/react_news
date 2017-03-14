import　React from 'react'

import {
    Row,
    Col
} from 'antd'

export default function New_Footer() {
    return(
        <Row>
            <Col span={2}></Col>
            <Col span={20} className="footer">
                &copy;&nbsp;2016 ReactNews. All Rights Reserved.
            </Col>
            <Col span={2}></Col>
        </Row>
        )
}