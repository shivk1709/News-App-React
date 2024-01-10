import React, { Component } from 'react'
import NewsItems from './NewsItems'

export default class News extends Component {

      articles = [];

  constructor() {
    super();
    console.log("Constructor");
    this.state = {
      articles:this.articles,
      loading: false,
      page:0
    }
  }

   handlePrevious = async() =>{
    console.log("Previous");
    let url = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=5c6441a3ce0541b3a3602f5eccf658d2&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let jsonData = await data.json();
    console.log(jsonData);
    this.setState({articles: jsonData.articles,
      page: this.state.page - 1
    })
  }



  handleNext = async () =>{
    
    let url = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=5c6441a3ce0541b3a3602f5eccf658d2&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let jsonData = await data.json();
      console.log(jsonData);
      this.setState({articles: jsonData.articles,
        page: this.state.page + 1,
        totalResult: jsonData.totalResult
      })
  }

  async componentDidMount(){
    console.log("cdm");
    let url = "https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=5c6441a3ce0541b3a3602f5eccf658d2&page=1&pageSize=20";
    let data = await fetch(url);
    let jsonData = await data.json();
    console.log(jsonData);
    this.setState({articles: jsonData.articles})
  }
  render() {
    console.log("render");
    return (
      <div>
        <div className="container my-3">
          <h1>Top Headlines</h1>
          <div className="row mt-3">
            {this.state.articles.map((element) =>{
              return <div className="col-md-4" key = {element.url}>
                <NewsItems  title={element.title?element.title.slice(0, 50):"Click Below Button to Read The News"} description={element.description?element.description.slice(0,50):"Click Below Button to Read The News"} imageUrl={element.urlToImage?element.urlToImage:"https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704758400&semt=sph"} newsUrl={element.url} />
              </div>
            })}
          </div>
          <div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevious} className="btn btn-dark">&#8592; Previous</button>
          <button  type="button" onClick={this.handleNext} className="btn btn-dark">Next &rarr;</button>
          </div>
        </div>
      </div >
    )
  }
}
