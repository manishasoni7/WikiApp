import React from 'react'
import axios from 'axios'
 
class App extends React.Component{
    constructor(props){
        super();
        this.state = {search : '', results : []};
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: this.state.search
                }
            })
            this.setState({results: data.query.search});
    }

    render(){
        return(
            <div>
                <form className="row g-2" onSubmit={this.handleSubmit}>
                    <div className="col-auto">
                        <input 
                        type="Search" 
                        className="form-control" 
                        id="Searchhere" 
                        placeholder="Search here" 
                        value={this.state.search}
                        onChange={(e)=>this.setState({search : e.target.value})} />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-3" >Search</button>
                    </div>
                </form>
                {this.state.results.map((item) =>{
                    return(
                            <div key={item.pageid} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text"><span dangerouslySetInnerHTML={{ __html: item.snippet }}></span></p>
                                <a href={`https://en.wikipedia.org?curid=${item.pageid}`} target="_blank" className="btn btn-success">View more!</a>
                            </div>
                            </div>
                            )
                        })
                    }
            </div>
        )
    }
}

export default App;