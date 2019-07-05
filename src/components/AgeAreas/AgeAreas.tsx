import * as React from 'react'
import './AgeAreas.css'


interface IState {
    avgAge :0;
}

interface IProps{
    setResult:any,
    setImage:any[] 
    avgAges:number
}

export default class AgeAreas extends React.Component<IProps, IState>{
    
 

    // <div>{this.state.setImage.map((files:any) => <img key={files.name} src={files.preview} />)}</div>
    // <div>{this.state.setImage.map((file:any) => file.map((pic:any)=> <img className="image1" key={pic.name} src={pic.preview}/>))}</div>
    public render(){
            
            
        return(
            <section className="container">
                <div className="ageZone">
                    <h3>I will save previous age </h3>
                    <div className="adjust">{this.props.setResult.map((ages:any, index:any)=> <li key={index}>{ages}</li>)}</div>
                </div>

                <div className="ageZone1">
                    <h3 className="ageZone1h3">Average Age</h3>
                    <h2>{this.props.avgAges}</h2>
                </div>
                
                
                
            </section>
       
            
        )
    }

    
}