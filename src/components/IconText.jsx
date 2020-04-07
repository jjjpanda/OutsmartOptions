import React from 'react'
import {
    Icon
} from 'antd'

export const IconText = ({ text, type, href }) => (
    <span>
        <a href={href} >
            {React.createElement(Icon, { type, style: { marginRight: 8 } })}
            {text}
        </a>
    </span>
);