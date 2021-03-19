import React, {Component} from 'react'
import Row from '../row'
import './gallery.css'


export default class PicGallery extends Component {
    constructor(props){
        super()
        this.rows = []
        this.defaultHeight = 180
        this.defaultMobileHeight = 90
        this.rowHeight = this.defaultHeight
        this.idCounter = 0
        this.state = {
            width:860,
            data: props.data
        }
        this.localData = []
        this.updateWidth = this.updateWidth.bind(this)
        this.onDelete = this.onDelete.bind(this)
         
    }
    getIndexes(d, height=this.rowHeight) {
        const currentHeight = height
        const data = d

        data.forEach(item => {
            item.index = (currentHeight / item.height)
        })
        
    }
    getCurrentWidth(row, h) {
        const data = row,
        height = h
        let currentWidth = 0
        this.getIndexes(data, height)
        data.forEach(item=>{
            currentWidth += item.width*item.index
        })
        currentWidth = currentWidth + 10*(data.length-1)
        return currentWidth
    }
    calcMaxHeight(row, width=this.state.width) {
        let currentHeight = this.rowHeight
        const totalWidth = width
        const data = row
        let currentWidth = this.getCurrentWidth(data, currentHeight)
        while (currentWidth <= totalWidth) {
            currentWidth = this.getCurrentWidth(data, currentHeight)
            currentHeight += 0.001
        } 
        return currentHeight              
    }

    setRows() {
        const data = this.state.data
        this.rows = []
        let newRow = []
        let newRowWidth = 0
        for (let i = 0; i < data.length; i++) {
            newRow.push(data[i])
            newRowWidth = this.getCurrentWidth(newRow)
            if (newRowWidth > this.state.width) {
                newRow.pop()
                this.rows.push(newRow)
                newRow = []
                --i
            }
        }
        this.rows.push(newRow)
        console.log(this.rows, newRow, newRowWidth)
                
        // this.newRows = []
        // let newRow = []
        // let currentWidth = 0
        // const data=d
        //const height = h
        // for (let i = 0; i < data.length; i++) {
        //     console.log(`setRows gCW:`,this.getCurrentWidth(newRow, data[i]),data.length,newRow)
        //     //console.log(`STATE:`, this.state.width, this.state.data)
        //     if (this.getCurrentWidth(newRow) > this.state.width) {
        //         newRow.pop()
        //         this.newRows.push(newRow)
        //         //console.log(`setRows newRow:${this.newRow}`)   
        //         newRow = []
        //         --i
        //     }
        //     newRow.push(data[i])   
        // }
        //this.newRows.push(newRow)  
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
        
       //console.log(this.state.width) 
    }
    onDelete(e) {
        this.setState(({data}) => {
                if (data.length === 1) return {data: []}
                const index = data.findIndex((elem) => elem.url === e.target.src)         
                const newArray = [...data.slice(0, index), ...data.slice(index + 1)]
                return {
                data: newArray
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
    
    render() {
        console.log(`!!!RENDER!!!`)
        // if(this.props.data) {
        //     this.setState(({data}) => {
        //     const newData = []
        //     newData.push(data)
        //     newData.push(...this.props.data)
        //     return {data: newData
        //     }
        //     })
        //}
        if (this.state.data.length === 0) {
            return (
                <div><h2>Картинок пока нет</h2></div>
            )
        } else {
            this.setRows()
            let elems = this.rows.map(item=>{
                return (
                    <Row 
                    rowPics={item}
                    maxHeight={`${this.calcMaxHeight(item)}px`}
                    onDelete={this.onDelete}
                    //onChangeGallery={onChangeGallery}
                    key={++this.idCounter}/>
                )
            })
            return (
                <div className="gallery">
                    {elems}   
                </div>
                
            )
        }
        
    }
}