import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';

class Add extends React.Component {

    render() {
        const { bookings, loading } = this.state;
        return (
          <Layout>
            <div className="container pt-4">
              <h4 className="mb-1">Add a new property</h4>
              <p className="text-secondary mb-3">
                Please tell us more about your place
              </p>
              <form onSubmit={this.submitProperty}>
                <div className="form-row">
                  <div className="form-group col-12">
                    <label htmlFor="inputTitle">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputTitle"
                      placeholder="Beautiful colonial-era townhouse in Georgetown"
                      value={this.state.title}
                      onChange={this.handleTitleChange}
                      maxLength="70"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputType">Type of Accommodation</label>
                    <select
                      id="inputType"
                      className="form-control"
                      onChange={this.handlePropertyTypeChange}
                      value={this.state.property_type}
                    >
                      <option></option> 
                      <option>Shared Room In Apartment</option>
                      <option>Private Room In Apartment</option>
                      <option>Whole Apartment</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPrice">Price per night (in $)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputPrice"
                      placeholder="62"
                      onChange={this.handlePriceChange}
                      value={this.state.price_per_night}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-3">
                    <label htmlFor="inputBedroom">Bedrooms</label>
                    <select
                      id="inputBedroom"
                      className="form-control"
                      onChange={this.handleBedroomChange}
                      value={this.state.bedrooms}
                      type="number"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="inputBed">Beds</label>
                    <select
                      id="inputBed"
                      className="form-control"
                      onChange={this.handleBedChange}
                      value={this.state.beds}
                      type="number"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="inputBath">Baths</label>
                    <select
                      id="inputBath"
                      className="form-control"
                      onChange={this.handleBathChange}
                      value={this.state.baths}
                      type="number"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="inputMaxGuests">Max guests</label>
                    <select
                      id="inputMaxGuests"
                      className="form-control"
                      onChange={this.handleMaxGuestChange}
                      value={this.state.max_guests}
                      type="number"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputCity">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                      placeholder="New York City"
                      onChange={this.handleCityChange}
                      value={this.state.city}
                      maxLength="200"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputCountry">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCountry"
                      placeholder="US"
                      onChange={this.handleCountryChange}
                      value={this.state.country}
                      maxLength="200"
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="inputDescription">Description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      rows="10"
                      id="inputDescription"
                      placeholder="A wonderful room in an apartment that is conveniently placed near New York City's best sights..."
                      onChange={this.handleDescriptionChange}
                      value={this.state.description}
                      maxLength="2000"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="addPhoto">Add property photo</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="addPhoto"
                    accept="image/*"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit new property
                </button>
              </form>
            </div>
          </Layout>
        );
      }
    }

    ReactDOM.render(
      <React.StrictMode>
        <Add />
      </React.StrictMode>,
      document.body.appendChild(document.createElement("div"))
      );