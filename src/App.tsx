import * as React from 'react';
import './App.css'
import AgeAreas from './components/AgeAreas/AgeAreas';
import DropArea from './components/DropAreas/DropArea'
import Header from './components/Header/Header'
import Result from './components/Result/Result'







interface IState {
  result:string,
  filelength:number,
  setResults: any[],
  setImages: any[],
  avgAge:number
  i:number
 
}



class App extends React.Component<{},IState>{
    public constructor(props:any){
      super(props)
      this.state = {
        avgAge: 0,
        filelength:0,
        i : 0,
        result:"",
        setImages:[],
        setResults:[],
        
        
        
        
       
      }
    }

  public resultstate = (resultString:string,filelen:any) => {
      this.setState({result:resultString,filelength:filelen})
      
      
    }
    

    public savePreviousAge = (resultAge:[],resultImage:[]) =>{
     
      // this.state.setImages.push(resultImage);
      this.setState({setResults : [...this.state.setResults, resultAge]});
      
      this.setState({setImages : resultImage});
      
      const sum = this.state.setResults.reduce((accumulator,currentValue) => {
        return accumulator+currentValue/this.state.setResults.length
      },0)
      this.setState({avgAge:sum})
      
  }
    
    
    

    
    // <ol>{this.state.setResults.map(ages => <li key={ages}>{ages}</li>)}</ol>

    // if this.state.setResults exist then execute AgeAreas or div
    public render() {
       
     return (
        
        <div>
          <Header />
          <DropArea setResults={this.resultstate} saveAges={this.savePreviousAge} />
          <Result result={this.state.result} filelength={this.state.filelength} setImage={this.state.setImages}/>
          <AgeAreas setResult ={this.state.setResults} setImage={this.state.setImages} avgAges={this.state.avgAge} />
          <div className="">{this.state.setImages.map(file => file.map((pic:any)=> <img className="bubble" key={pic.name} src={pic.preview}/>))}</div>
          
          
        </div>
      );
    }
}

export default App;
