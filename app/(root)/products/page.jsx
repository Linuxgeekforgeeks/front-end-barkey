"use client";
import "./page.css"
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, X, Plus, Minus, Facebook, Instagram, Twitter } from 'lucide-react';

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

// 3D Spinning Preview Component
const SpinningProductPreview = ({ product, isOpen, onClose, addToCart }) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState(1);
  
  const containerRef = useRef(null);
  
  // Auto rotation effect
  useEffect(() => {
    let animationId;
    
    const animate = () => {
      if (autoRotate && !isDragging) {
        setRotation(prev => (prev + 0.5) % 360);
      }
      animationId = requestAnimationFrame(animate);
    };
    
    if (isOpen) {
      animationId = requestAnimationFrame(animate);
    }
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [autoRotate, isDragging, isOpen]);
  
  // Mouse/touch event handlers for manual rotation
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartX(e.clientX);
  };
  
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartX(e.touches[0].clientX);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    setRotation(prev => (prev + deltaX * 0.5) % 360);
    setStartX(e.clientX);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startX;
    setRotation(prev => (prev + deltaX * 0.5) % 360);
    setStartX(e.touches[0].clientX);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  // Handle quantity changes
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // Handle add to cart with specified quantity
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
    onClose();
  };
  
  // Zoom handlers
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2.0));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.6));
  };
  
  if (!isOpen || !product) return null;
  
  return (
    <>
      <div className="product-preview-overlay" onClick={onClose}></div>
      <div className="product-preview-modal">
        <button className="close-preview" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="preview-content">
          <div 
            className="spinning-container"
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="product-3d-model"
              style={{
                transform: `rotateY(${rotation}deg) scale(${zoom})`,
                backgroundImage: `url(${product.image})`
              }}
            ></div>
          </div>
          
          <div className="preview-controls">
            <div className="zoom-controls">
              <button onClick={handleZoomOut} className="zoom-btn">
                <Minus size={16} />
              </button>
              <span>Zoom</span>
              <button onClick={handleZoomIn} className="zoom-btn">
                <Plus size={16} />
              </button>
            </div>
            <button 
              onClick={() => setAutoRotate(!autoRotate)} 
              className={`auto-rotate-btn ${autoRotate ? 'active' : ''}`}
            >
              {autoRotate ? 'Stop Rotation' : 'Auto Rotate'}
            </button>
          </div>
          
          <div className="preview-details">
            <h2>{product.name}</h2>
            <p className="preview-description">{product.description}</p>
            <p className="preview-price">TSh {product.price.toLocaleString()}</p>
            
            <div className="preview-actions">
              <div className="quantity-selector">
                <button onClick={decreaseQuantity} className="quantity-btn">
                  <Minus size={16} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button onClick={increaseQuantity} className="quantity-btn">
                  <Plus size={16} />
                </button>
              </div>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductsPage = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolledCards, setScrolledCards] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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

  const openProductPreview = (product) => {
    setSelectedProduct(product);
    setIsPreviewOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeProductPreview = () => {
    setIsPreviewOpen(false);
    document.body.style.overflow = ''; // Re-enable scrolling
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = ''; // Ensure scrolling is re-enabled on unmount
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo">
            <a href="#">
              <img src="/api/placeholder/200/80" alt="Hamos Bakery Logo" />
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
                  onClick={() => openProductPreview(product)}
                >
                  <div className="preview-badge">
                    <span>3D View</span>
                  </div>
                </div>
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

      <SpinningProductPreview 
        product={selectedProduct} 
        isOpen={isPreviewOpen} 
        onClose={closeProductPreview}
        addToCart={addToCart}
      />

      <style jsx global>{`
        /* Additional CSS for the 3D spinning product preview */
        .product-image {
          position: relative;
          cursor: pointer;
          overflow: hidden;
        }
        
        .preview-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          border-radius: 20px;
          padding: 5px 10px;
          font-size: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .product-image:hover .preview-badge {
          opacity: 1;
        }
        
        .product-preview-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 1000;
        }
        
        .product-preview-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          border-radius: 8px;
          width: 90%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          z-index: 1001;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .close-preview {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 10;
          color: #333;
        }
        
        .preview-content {
          display: flex;
          flex-direction: column;
          padding: 20px;
        }
        
        .spinning-container {
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
          cursor: grab;
          margin-bottom: 20px;
          touch-action: pan-y;
        }
        
        .spinning-container:active {
          cursor: grabbing;
        }
        
        .product-3d-model {
          width: 250px;
          height: 250px;
          background-size: cover;
          background-position: center;
          border-radius: 8px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.1s ease;
          transform-style: preserve-3d;
        }
        
        .preview-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .zoom-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .zoom-btn, .auto-rotate-btn {
          background-color: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 5px 10px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .zoom-btn:hover, .auto-rotate-btn:hover {
          background-color: #eaeaea;
        }
        
        .auto-rotate-btn.active {
          background-color: #4CAF50;
          color: white;
          border-color: #4CAF50;
        }
        
        .preview-details {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        
        .preview-description {
          color: #666;
          margin: 15px 0;
        }
        
        .preview-price {
          font-size: 24px;
          color: #e63946;
          font-weight: bold;
          margin-bottom: 20px;
        }
        
        .preview-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }
        
        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .quantity-btn {
          background: none;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          background-color: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .quantity-value {
          padding: 0 15px;
          min-width: 40px;
          text-align: center;
        }
        
        .add-to-cart-btn {
          background-color: #e63946;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.2s ease;
        }
        
        .add-to-cart-btn:hover {
          background-color: #d62938;
        }
        
        @media (min-width: 768px) {
          .preview-content {
            flex-direction: row;
            align-items: flex-start;
            gap: 30px;
          }
          
          .spinning-container {
            flex: 1;
            height: 400px;
            margin-bottom: 0;
          }
          
          .preview-details {
            flex: 1;
            text-align: left;
            padding-top: 0;
            border-top: none;
          }
          
          .preview-controls {
            justify-content: flex-start;
          }
          
          .preview-actions {
            justify-content: flex-start;
          }
        }
      `}</style>
    </>
  );
};

export default ProductsPage;