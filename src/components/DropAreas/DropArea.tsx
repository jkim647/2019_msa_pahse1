import ReactDropzone from 'react-dropzone'
import './DropArea.css'

import * as React from 'react'



interface IState {
    imageFiles: any[],
    saveAge: any[],
    dropzone: any
    age: any
    saveImages: any[]

}

interface IProps{
    setResults:any
    saveAges:any
}

export default class DropArea extends React.Component<IProps, IState>{
    
    constructor(props: any) {
        super(props)
        this.state = {
            age:0,
            dropzone: this.onDrop.bind(this),
            imageFiles: [],
            saveAge: [],
            saveImages:[]   
            }
            
        }
        
        // The onDrop's fuunction has the responsibility of displaying the image when dragged and dropped onto the screen.
        public onDrop(files: any) {
            this.setState({
                imageFiles: files,
            })
            this.props.setResults("",this.state.imageFiles.length)
            const file = files[0]
            const reader = new FileReader();
            reader.onload = (event) => {
                
                const binaryString = (event.target as FileReader).result;  // casting the event to be of type FileReader and then it will get the result of the event target.
                if (typeof binaryString === "string") {
                    this.upload(btoa(binaryString))  // encodes the image into a base 64 string
                }
            };
            try{
                reader.readAsBinaryString(file);
            }catch(error){
                this.props.setResults("Sorry we had trouble loading that file please use a downloaded image file",0);
            }
        }

        public upload(base64String: any) {
            const base64 = require('base64-js');
            const byteArray = base64.toByteArray(base64String);
            fetch('https://whatsmyage.azurewebsites.net/image', {
                body: byteArray,
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
                method: 'POST'
            })
                .then((response: any) => {
                    if (!response.ok) {
                        this.props.setResults("Sorry there was an error",this.state.imageFiles.length)
                    } else {
                        response.json().then((json: any[]) => {
                            if(json.length<1){
                                this.props.setResults("Sorry no face detected",this.state.imageFiles.length)
                            }else{
                                this.props.setResults("Age is "+json[0].faceAttributes.age,this.state.imageFiles.length)
                                this.state.saveAge.push(json[0].faceAttributes.age);
                                this.setState({saveImages : [...this.state.saveImages, this.state.imageFiles]})
                                   
                                this.props.saveAges(this.state.saveAge[this.state.age],this.state.saveImages)
                                this.setState({age: this.state.age+1})
                                
                               

                               
                                
                                
                            }
                        })
                    }
                })
                
        }
// const myArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];


// const newArray = myArray.map(value => value.map(number => number * 2));
        public render() {
            return (
                <div className="cont">
                    <div className="centreText">
                        <div className="dropZone">
                            <ReactDropzone accept='image/*' onDrop={this.state.dropzone} style={{ position: "relative" }}>
                                <div className="dropZoneText">
                                    {
                                        this.state.imageFiles.length > 0 ?
                                            <div>{this.state.imageFiles.map((file) => <img className="image1" key={file.name} src={file.preview} />)}</div> :
                                            <p>Try dropping some files here, or click to select files to upload.</p>
                                    }
                                    
                                </div>
                            </ReactDropzone>
                            
                        </div>
                    </div>
                </div>
            )
        }
    }