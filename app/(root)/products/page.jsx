"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Facebook, Instagram, Twitter } from 'lucide-react';
import './page.css';
 const productsData = [
        {
          id: 1,
          name: "Boflo (Swahili Bread)",
          description:
            "Fresh baked traditional Swahili bread, soft and fluffy.",
          price: 1500,
          image:
            "https://cdn.pixabay.com/photo/2018/06/12/22/29/bread-3471667_640.jpg",
        },
        {
          id: 2,
          name: "Chapati",
          description: "Thin, round flatbread made with whole wheat flour.",
          price: 800,
          image:
            "https://cdn.pixabay.com/photo/2016/05/26/16/27/cinnamon-rolls-1417494_640.jpg",
        },
        {
          id: 3,
          name: "Mandazi",
          description:
            "Sweet, triangular East African donuts with a hint of cardamom.",
          price: 500,
          image:
            "https://cdn.pixabay.com/photo/2019/03/10/16/22/bread-4046506_640.jpg",
        },
        {
          id: 4,
          name: "Mkate wa Sinia",
          description: "Soft, spongy bread baked in a special pan.",
          price: 2000,
          image:
            "https://cdn.pixabay.com/photo/2019/03/24/14/23/bread-4077812_640.jpg",
        },
        {
          id: 5,
          name: "Coconut Bread",
          description:
            "Sweet bread with rich coconut flavor, perfect with tea.",
          price: 1800,
          image:
            "https://cdn.pixabay.com/photo/2016/10/22/17/10/bread-1761197_640.jpg",
        },
        {
          id: 6,
          name: "Vitumbua",
          description:
            "Sweet rice pancake with coconut, a popular Zanzibar breakfast.",
          price: 200,
          image:
            "https://cdn.pixabay.com/photo/2021/01/14/13/10/bread-5916804_640.jpg",
        },
      ];


const ProductsPage = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolledCards, setScrolledCards] = useState([]);

  const addToCart = (productId) => {
    const product = productsData.find((p) => p.id === productId);
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === id);
      if (item.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const handleScroll = () => {
    const productCards = document.querySelectorAll('.product-card');
    const newScrolledCards = [];
    productCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.8) {
        newScrolledCards[index] = true;
      }
    });
    setScrolledCards(newScrolledCards);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo">
            <a href="#">
              <img src="/hti-logo.webp" alt="Hamos Bakery Logo" />
            </a>
          </div>
          <div className="header-actions">
            <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={24} />
              <span className="cart-count">{getCartItemCount()}</span>
            </div>
          </div>
        </div>
      </header>

      <section className="products">
        <div className="container">
          <h2>Our Fresh Baked Products</h2>
          <div className="product-grid">
            {productsData.map((product, index) => (
              <div
                key={product.id}
                className={`product-card ${scrolledCards[index] ? 'scrolled' : ''}`}
              >
                <div
                  className="product-image"
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">TSh {product.price.toLocaleString()}</p>
                  <button
                    className="btn add-to-cart"
                    onClick={() => addToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">No Items in Cart</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div
                  className="cart-item-image"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className="cart-item-details">
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-price">TSh {item.price.toLocaleString()}</div>
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn decrease"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                    <button
                      className="quantity-btn increase"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-total">
          <span>Total:</span>
          <span>TSh {getCartTotal().toLocaleString()}</span>
        </div>
        <button className="checkout-btn btn">Checkout</button>
      </div>

      <div
        className={`overlay ${isCartOpen ? 'open' : ''}`}
        onClick={() => setIsCartOpen(false)}
      ></div>

    </>
  );
};

export default ProductsPage;