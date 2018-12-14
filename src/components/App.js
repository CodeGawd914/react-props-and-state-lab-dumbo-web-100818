import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  getPets = () => {
    let api = '/api/pets'

    console.log("get pets ternary", this.state.filters.type);


    this.state.filters.type === 'all'
    ? (api)
    : api += `?type=${this.state.filters.type}`

    console.log("get pets", api);


    fetch(api)
    .then(res => res.json())
    .then(pets => this.setState({pets}))

  }

  adoptPet = petId => {
      const pets = this.state.pets.map( pet => {
        return pet.id === petId
        ? { ...pet, isAdopted: true}
        : pet

        console.log(pets)
      })
      this.setState({ pets })
  }

  changeType = (e) => {
    debugger
    this.setState({
      filters: {
        ...this.state.filters,
        type: e.target.value
      }
    })
    console.log(this.state.filters.type)
  }

  render() {
    console.log(this.state.pets)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.getPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
