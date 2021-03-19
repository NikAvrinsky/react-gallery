import React, {Component} from 'react'
import './card.css'

export default class Card extends Component {
    constructor(props) {
        super(props)
        this.counter = 0

    }
      

    render() {
        const {url, maxHeight, onDelete} = this.props
       
        return(  
            <div className='gallery__card'>
                <img
                className='gallery__img'
                src={url}
                alt='img'
                height={maxHeight}
                onClick={(e) => onDelete(e)}
            />
            </div>
        )
    }
}