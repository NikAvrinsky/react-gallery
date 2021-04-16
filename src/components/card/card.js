import React, {Component} from 'react'
import './card.scss'

export default class Card extends Component {
    componentDidMount() {
        this.props.dnd(this.props.id)
    }
    render() {
        const {url, maxHeight, onDelete, id} = this.props
        return(  
            <div className='gallery__card'
                draggable= 'true'>
                <img
                className='gallery__img'
                src={url}
                alt='img'
                height={maxHeight}  
                />
            <div className="gallery__card-trash"
                id={id}
                onClick={(e) => onDelete(e)}>
                <i className="far fa-trash-alt"
                id={id}></i>
            </div>
            </div>
        )
    }
}