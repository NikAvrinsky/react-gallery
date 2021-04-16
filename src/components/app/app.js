import React, {Component} from 'react'
import AddPicture from '../add-picture'
import Gallery from '../gallery'
import './app.scss'


export default class App extends Component {
    constructor() {
        super()
        this.state = {
            gallery: [],
            width: 860,
        }
        this.defaultHeight = 160
        this.defaultMobileHeight = 90
        this.itemId = null
        this.positionId = null
        this.updateWidth = this.updateWidth.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.dragAndDrop = this.dragAndDrop.bind(this)
        this.onReplace = this.onReplace.bind(this)
    }

    updateWidth() {
        setTimeout(() => {
            
            if (this.state.width !== document.getElementById('gallery__wrapper').offsetWidth) {
                this.setState({ width: document.getElementById('gallery__wrapper').offsetWidth})
            }
        
        }, 50)
    }
    onDelete(e) {
        this.setState(({gallery}) => {
                if (gallery.length === 1) return {gallery: []}
                const picId = parseInt(e.target.id)
                const index = gallery.findIndex(item => item.id === picId)
                const newArray = [...gallery.slice(0, index), ...gallery.slice(index + 1)]
                return {
                gallery: newArray
                }
            })
          
    }
    
    onReplace(item, position) {
        this.setState(({gallery}) => {
            const itemId = parseInt(item)
            const positionId = parseInt(position)
            const itemIndex = gallery.findIndex(item => item.id === itemId)
            const positionIndex = gallery.findIndex(item => item.id === positionId)
            //console.log(item, position)
            let newArray = null
            if (positionIndex > itemIndex) {
                newArray = [...gallery.slice(0, itemIndex), ...gallery.slice(itemIndex+1, positionIndex + 1), 
                        gallery[itemIndex], ...gallery.slice(positionIndex + 1, gallery.length)]
            } else if (positionIndex < itemIndex) {
                newArray = [...gallery.slice(0, positionIndex), gallery[itemIndex], 
                    ...gallery.slice(positionIndex, itemIndex), ...gallery.slice(itemIndex + 1, gallery.length)]
            } else {
                newArray = gallery
            }
            //console.log(newArray)
            return {
            gallery: newArray
            }
        }) 
    }

    dragAndDrop(id) {
        //console.log(this)
        const nodeId = id
        

        const dragStart = (e) => {
            this.itemId = e.target.nextSibling.id
            setTimeout( e.target.classList.add('hide'), 0)
            e.target.nextSibling.classList.add('hide-dis')
            document.querySelectorAll('.gallery__card-trash').forEach(item => {
                item.classList.add('hide-dis')
            })


            //console.log('start',this.itemId)
        }
        const dragEnd = function(e) {
            e.target.classList.remove('hide')
            e.target.nextSibling.classList.remove('hide-dis')
            document.querySelectorAll('.gallery__card-trash').forEach(item => {
                item.classList.remove('hide-dis')
            })
        }
        const dragOver = (e) => {
            e.preventDefault()
            this.positionId = e.target.nextSibling.id
            //console.log('over',this.positionId)
        }
        const dragEnter = function() {
            //console.log('enter')
        }
        const dragLeave = function() {
            //console.log('leave')
        }
        const dragDrop = () => {
            this.onReplace(this.itemId, this.positionId) 
        }
        const card = document.getElementById(nodeId).parentNode
        card.addEventListener('dragstart', dragStart)
        card.addEventListener('dragend', dragEnd)
        card.addEventListener('dragover', dragOver)
        card.addEventListener('draenter', dragEnter)
        card.addEventListener('dragleave', dragLeave)
        card.addEventListener('drop', dragDrop)      
    }

    componentDidMount() {
        this.updateWidth()
        window.addEventListener('resize', this.updateWidth)
        
        
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth)
    }

    onFormSubmit(data) {
        this.setState(({gallery}) => {
            let newGallery = []
            newGallery = [...this.state.gallery, ...data]
            document.getElementById('holder').classList = 'add__holder'
            return {gallery: newGallery}
        })
        
    }

    render() {
        return (
        <div id='gallery__wrapper'
            className='gallery__wrapper'>
            <AddPicture
                onFormSubmit={this.onFormSubmit}/>
            <Gallery
                gallery={this.state.gallery}
                width={this.state.width}
                defaultHeight={this.defaultHeight}
                defaultMobileHeight={this.defaultMobileHeight}
                onDelete={this.onDelete}
                dnd={this.dragAndDrop}
                />
        </div>
        )
    }
}