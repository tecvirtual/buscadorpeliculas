import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
    movie: {},
    isFetching: false 
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    this.setState({ isFetching: true })

    const title = event.target[0].value
    const url = 'https://api.jikan.moe/v3/search/anime'

    axios.get(url, {
      params: {
        q: title,
        limit : 1
      }
    })
      .then(res => this.setState({
        movie: res.data.results[0],
        isFetching: false
    }))
  }

  render () {
    const { movie, isFetching } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder='Nombre de Pelicula'
          />
          <button>
            Buscar
          </button>
        </form>
        {isFetching && (
          <h2>Cargando...</h2>
        )}
        { movie.title && !isFetching && (
          <div>
            <h1>{ movie.title }</h1>
            <p>
              { movie.synopsis }
            </p>
            <img
              src={ movie.image_url }
              alt='Poster'
              style={{
                width: '150px'
              }}  
            />
          </div>
        ) }
      </div>
    )
  }
}

export default App