import React, {Component} from 'react'
import './card.css'

export default class Card extends Component {
    
    render() {
        const {url, maxHeight, onDelete, id} = this.props
       
        return(  
            <div className='gallery__card'
                id={id}>
                <img
                className='gallery__img'
                src={url}
                alt='img'
                height={maxHeight}   
                />
            <div className="gallery__card-trash"
                onClick={(e) => onDelete(e)}>
                <i className="far fa-trash-alt"></i>
            </div>
            </div>
        )
    }
}