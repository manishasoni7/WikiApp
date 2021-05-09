import React from 'react'
import axios from 'axios'
 
class App extends React.Component{
    constructor(props){
        super();
        this.state = {search : '', results : null};
    }

    componentDidUpdate(){
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: this.state.search
                }
            })
            this.setState({results : data.query.search});
        }
        if(this.state.search && !this.state.results){
            search();
        }
    }

    render(){
        return(
            <div>
                <form className="row g-2">
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
                    {console.log(this.state.results)}
                    {this.state.results.map((item) =>{
                    return(
                            <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">{item.title}</h5>
                                <p class="card-text">{item.snippet}</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                            </div>
                            )
                        })
                    }
                </form>
            </div>
        )
    }
}

export default App;