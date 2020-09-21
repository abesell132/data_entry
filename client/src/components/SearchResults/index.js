import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./index.scss";

class SearchResults extends Component {
  render() {
    return (
      <div class="list">
        <div class="background-overlay"></div>
        <div class="options">
          <form id="search-options">
            <div class="custom-select" id="food-select">
              <select>
                <option value="1">Food Category:</option>
                <option value="1">Pick For Me</option>
                <option value="1">Asian</option>
                <option value="2">Burgers</option>
                <option value="2">Dessert</option>
                <option value="3">Mexican</option>
                <option value="4">Salad</option>
                <option value="4">Seafood</option>
                <option value="4">Soup</option>
                <option value="4">Pasta</option>
                <option value="4">Pizza</option>
              </select>
            </div>
            <div class="custom-select">
              <select>
                <option value="0">Restaurant Type:</option>
                <option value="1">Dine-In</option>
                <option value="2">Take Out</option>
                <option value="2">Delivery</option>
              </select>
            </div>
            <button>Update</button>
          </form>
          <div id="search-results">
            <div class="result">
              <div>
                <a href="./menu.html">
                  <h3>Teal Lake Pizzaria</h3>
                </a>
                <div class="address">
                  81 Croix St
                  <br />
                  Negaunee, MI 49866
                </div>
                <div class="restaurant-categories">Pizza, American, Dessert, Salad</div>
              </div>
              <div class="links">
                <a href="https://www.teallakepizzeria.com/" target="_blank" rel="noopener noreferrer">
                  <div>
                    <img src="../front//assets/imgs/seo.png" alt="Website Link" /> <span class="link-text">Website</span>
                  </div>
                </a>
                <a href="./menu.html">
                  <div>
                    <img src="../front//assets/imgs/menu.png" alt="Menu Link" /> <span class="link-text">View Menu</span>
                  </div>
                </a>
                <a
                  href="https://www.google.com/maps/dir//81+Croix+St,+Negaunee,+MI+49866/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x4d51c28a7edf3a4d:0xdd1cf49cf6978e83?sa=X&ved=2ahUKEwjCjsv_jvPrAhWWLs0KHYuaBkcQwwUwAHoECAsQAg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <img src="../front//assets/imgs/explore.png" alt="Directions Link" /> <span class="link-text">Directions</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Dump Redux Store Into {this.props} Object
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  //    Redux Action Declations Go Here
})(withRouter(SearchResults));
