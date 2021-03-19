import React, {Component} from 'react'
import Card from '../card'

export default class Row extends Component {
    constructor(props) {
        super(props) 
        this.data = props.rowPics
        this.state = {
            maxHeight: props.maxHeight
        }
        this.idCounter = 0   
    }
    
    render() {
        const {onDelete} = this.props
        const elems = this.data.map(item => {
            return (
                <Card 
                {...item}
                maxHeight={this.state.maxHeight}
                onDelete={onDelete}
                key={++this.idCounter}/>
            )
        })
        return (
            <div className="row">
                {elems}
            </div>
        )
    }
}
