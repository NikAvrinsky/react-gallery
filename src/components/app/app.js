import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
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
        this.updateWidth = this.updateWidth.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    updateWidth() {
        setTimeout(() => {
            
            if (this.state.width !== document.getElementById('container').offsetWidth) {
                this.setState({ width: document.getElementById('container').offsetWidth})
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
            document.getElementById('holder').classList = 'holder_default'
            return {gallery: newGallery}
        })
        
    }

    render() {
        return (
        <div id='container'>
            <AddPicture
                onFormSubmit={this.onFormSubmit}/>
            <Gallery
                gallery={this.state.gallery}
                width={this.state.width}
                defaultHeight={this.defaultHeight}
                defaultMobileHeight={this.defaultMobileHeight}
                onDelete={this.onDelete}
                />
        </div>
        )
    }
}