import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddPicture from '../add-picture'
import Gallery from '../gallery'
import './app.css'


export default class App extends Component {
    constructor() {
        super()
        this.state = {
            gallery: [{
                url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964007.jpg",
                width: 1920,
                height: 1200
                },
                {
                url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550739.jpg",
                width: 640,
                height: 426
                },
                {
                url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964009.jpg",
                width: 436,
                height: 650
                },
                {
                url: "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550740.jpg",
                width: 600,
                height: 400
                }],
            width: 860,
            rowHeight: 170
        }
        this.rowHeight = 180
        this.defaultRowHeight = 180
        this.mobileRowHeight = 90
        this.updateWidth = this.updateWidth.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    updateWidth() {
        setTimeout(() => {
            if (this.state.width !== document.getElementById('container').offsetWidth) {
                this.setState({ width: document.getElementById('container').offsetWidth})
            }
            if (this.state.width <= 600) {
                this.rowHeight = this.defaultMobileHeight
            } else {
                this.rowHeight = this.defaultHeight
            }
        }, 200)
    }
    onDelete(e) {
        this.setState(({gallery}) => {
                if (gallery.length === 1) return {gallery: []}
                const index = gallery.findIndex((elem) => elem.url === e.target.src)         
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
        window.removeEventListener('resize', this.updateWidth);
    }
    
    onFormSubmit(data) {
        this.setState(({gallery}) => {
            let newGallery = []
            newGallery = [...this.state.gallery, ...data]
            console.log(newGallery)
            return{gallery: newGallery}
        })
        
    }

    render() {
        return (
        <div className="container"
        id='container'>
            <AddPicture
                onFormSubmit={this.onFormSubmit}/>
            <Gallery
                gallery={this.state.gallery}
                width={this.state.width}
                rowHeight={this.state.rowHeight}
                onDelete={this.onDelete}
                />
        </div>
        )
    }
}