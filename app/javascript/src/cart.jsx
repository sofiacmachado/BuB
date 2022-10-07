import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './layout';
import './cart.scss';


const cartItems = [
    {
      title: 'Anna Karenina',
      author: "Leo Tolstoy",
      isbn: '9780140449174',
      description: "Anna Karenina seems to have everything - beauty, wealth, popularity and an adored son. But she feels that her life is empty until the moment she encounters the impetuous officer Count Vronsky. Their subsequent affair scandalizes society and family alike and soon brings jealously and bitterness in its wake. Contrasting with this tale of love and self-destruction is the vividly observed story of Levin, a man striving to find contentment and a meaning to his life - and also a self-portrait of Tolstoy himself.",
      condition: "Used",
      user_description: 'Spine has some folds',
      genre: 'classic',
      price: 4,
      rating: 4.08/5,
      image_url: 'https://m.media-amazon.com/images/I/41MCjKLqN9L._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
      user: 1
    },
    {
      title: 'Notes from Underground',
      author: "Fyodor Dostoevsky",
      isbn: '9780679734529',
      description: "Notes from Underground is a novella written in 1864 by Fyodor Dostoevsky, and is considered by many to be one of the first existentialist novels. The novella presents itself as an excerpt from the rambling memoirs of a bitter, isolated, unnamed narrator, who is a retired civil servant living in St. Petersburg.",
      condition: "Like new",
      user_description: 'cartItems is in perfect conditions',
      genre: 'classic',
      price: 8,
      rating: 4.2/5,
      image_url: 'https://images-na.ssl-images-amazon.com/images/I/41kxGhOH0vL._SX322_BO1,204,203,200_.jpg',
      user: 1
    }
  ]

class Cart extends React.Component {
    
    constructor(props) {
        super(props);
        this.state =   {
            title: '',
            author: '',
            description: '',
            isbn: '',
            condition: '',
            user_description: '',
            genre: '',
            price: '',
            rating: '',
            image_url: '',
            user: '',
            loading: true,
            authenticated: false,
            editing: false,
            }
          }
  
    //fetch
      componentDidMount() {
        let data = {
          cartItems: [],
        }
  
        this.setState({
          loading: false,
          id: data.cartItems.id,
          author: data.cartItems.author,
          title: data.cartItems.title,
          description: data.cartItems.description,
          user_description: data.cartItems.user_description,
          condition: data.cartItems.condition,
          genre: data.cartItems.genre,
          price: data.cartItems.price,
          isbn: data.cartItems.isbn,
          rating: data.cartItems.rating,
          image_url: data.cartItems.image_url,
          user: data.cartItems.user,
          loading: true,
          authenticated: false,
          editing: false,
  
        });
        //fetch
        data = true;
        this.setState({
          authenticated: data,
        });
      }

    render() {

        const  book  = data; 
       // const { cartItems } = this.state;
       const totalPrice = cartItems.reduce((totalPrice, item) => totalPrice + item.price, 0);

            return (
                <Layout>
                    <div className="container mybooks-container">
                        <div className="row">
                            <div className="col-4 mybooks-title">
                                <h4 className="mb-1">My Shopping Cart</h4>
                                {cartItems.length === 0 && 
                                <p className="text-secondary mb-3">
                                    Cart is empty
                                </p>}
                            </div>
                        </div>
                        <div className="row mt-4 mb-4">

                                {cartItems.map((item) => (
                                     <div key={item.id} className="latestbook text-body text-decoration-none">
                                     <div className="row mt-4 mb-4 row-item">
                                        <div className="col-2 col-lg-4">
                                            <div
                                            className="book-image my-3"
                                            style={{ backgroundImage: `url(${item.image_url})` }}
                                            />
                                        </div>
                                            <div className="col-4">
                                                <h6 className="mb-2 text-uppercase">"{item.title}"</h6>
                                                <p className="text-uppercase mb-1 text-secondary">
                                                    <small>
                                                    <b>{item.author}</b>
                                                    </small>
                                                </p>
                                            </div>
                                            <div className="col-2">
                                                <p className="price-tag">${item.price}
                                                </p>
                                            </div>
                                            <div className="col-2">
                                                <button onClick={() => onRemove(item)}  className="btn btn-edit remove">
                                                    x
                                                </button>
                                            </div>
                                    </div>
                                    </div>
                                        ))}
                                        {cartItems.length !== 0 && (
                                            <div className='checkout-row'>
                                                <div className="col-12 mt-4">
                                                    <p className="price-total">Total Price: ${totalPrice}</p>
                                                </div>
                                                <hr />
                                                <div className="col-12">
                                                    <button className="btn btn-add">
                                                        Checkout
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                        </div>
                    </div>
                </Layout>
            )
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <Cart />,
        document.body.appendChild(document.createElement("div"))
    );
});