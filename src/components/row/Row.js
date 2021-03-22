import React, {Component} from 'react'
import Card from '../card'

export default class Row extends Component {
    
    render() {
        const {rowPics, maxHeight, onDelete} = this.props
        let idCounter = this.props.id - rowPics.length

        const elems = rowPics.map(item => {
            return (
                <Card 
                {...item}
                maxHeight={maxHeight}
                onDelete={onDelete}
                key={idCounter}
                id={idCounter++}/>
            )
        })
        return (
            <div className="row">
                {elems}
            </div>
        )
    }
}
