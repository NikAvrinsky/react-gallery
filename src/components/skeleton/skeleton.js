import React, {Component} from 'react'
import './skeleton.scss'

export default class Skeleton extends Component {
 
render() {
    const {height, width} = this.props
    return (
        <div className='card__skeleton'
            width={width}
            height={height}></div>
    )
}
}