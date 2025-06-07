"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";
import "./page.css";
import { useCartStore } from "@/stores/cart.store";

const productsData = [
  {
    id: 1,
    name: "Boflo (Swahili Bread)",
    description: "Fresh baked traditional Swahili bread, soft and fluffy.",
    price: 1500,
    image: "https://cdn.pixabay.com/photo/2018/06/12/22/29/bread-3471667_640.jpg",
  },
  {
    id: 2,
    name: "Chapati",
    description: "Thin, round flatbread made with whole wheat flour.",
    price: 800,
    image: "https://cdn.pixabay.com/photo/2016/05/26/16/27/cinnamon-rolls-1417494_640.jpg",
  },
  {
    id: 3,
    name: "Mandazi",
    description: "Sweet, triangular East African donuts with a hint of cardamom.",
    price: 500,
    image: "https://cdn.pixabay.com/photo/2019/03/10/16/22/bread-4046506_640.jpg",
  },
  {
    id: 4,
    name: "Mkate wa Sinia",
    description: "Soft, spongy bread baked in a special pan.",
    price: 2000,
    image: "https://cdn.pixabay.com/photo/2019/03/24/14/23/bread-4077812_640.jpg",
  },
  {
    id: 5,
    name: "Coconut Bread",
    description: "Sweet bread with rich coconut flavor, perfect with tea.",
    price: 1800,
    image: "https://cdn.pixabay.com/photo/2016/10/22/17/10/bread-1761197_640.jpg",
  },
  {
    id: 6,
    name: "Vitumbua",
    description: "Sweet rice pancake with coconut, a popular Zanzibar breakfast.",
    price: 200,
    image: "https://cdn.pixabay.com/photo/2021/01/14/13/10/bread-5916804_640.jpg",
  },
];

const ProductsPage = () => {
  const { cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, updateQuantity } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolledCards, setScrolledCards] = useState([]);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const handleScroll = () => {
    const productCards = document.querySelectorAll(".root-product-card");
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="root-header">
        <div className="root-container">
          <div className="root-logo">
            <a href="/">
              <img src="/hti-logo.webp" alt="Hamos Bakery Logo" />
            </a>
          </div>
          <div className="root-header-actions">
            <div className="root-cart-icon" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={24} />
              <span className="root-cart-count">{getCartItemCount()}</span>
            </div>
          </div>
        </div>
      </header>

      <section className="root-products">
        <div className="root-container">
          <h2>Our Fresh Baked Products</h2>
          <div className="root-product-grid">
            {productsData.map((product, index) => (
              <div
                key={product.id}
                className={`root-product-card ${scrolledCards[index] ? "root-scrolled" : ""}`}
              >
                <div
                  className="root-product-image"
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>
                <div className="root-product-info">
                  <h3 className="root-product-title">{product.name}</h3>
                  <p className="root-product-description">{product.description}</p>
                  <p className="root-product-price">TSh {product.price.toLocaleString()}</p>
                  <button
                    className="root-btn root-add-to-cart"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={`root-cart-sidebar ${isCartOpen ? "root-open" : ""}`}>
        <div className="root-cart-header">
          <h2>Your Cart</h2>
          <button className="root-close-cart" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="root-cart-items">
          {cartItems.length === 0 ? (
            <p className="root-empty-cart">No Items in Cart</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="root-cart-item">
                <div
                  className="root-cart-item-image"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className="root-cart-item-details">
                  <div className="root-cart-item-title">{item.name}</div>
                  <div className="root-cart-item-price">TSh {item.price.toLocaleString()}</div>
                  <div className="root-cart-item-quantity">
                    <button
                      className="root-quantity-btn root-decrease"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="root-quantity-input"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    />
                    <button
                      className="root-quantity-btn root-increase"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="root-remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="root-cart-total">
          <span>Total:</span>
          <span>TSh {getCartTotal().toLocaleString()}</span>
        </div>
        <button className="root-checkout-btn root-btn">Checkout</button>
      </div>

      <div
        className={`root-overlay ${isCartOpen ? "root-open" : ""}`}
        onClick={() => setIsCartOpen(false)}
      ></div>
    </>
  );
};

export default ProductsPage;