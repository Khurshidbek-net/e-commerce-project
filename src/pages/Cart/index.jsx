import React, { useEffect, useState } from 'react';
import './Cart.style.scss';
import { DeleteIcon, PromoIcon } from '../../assets/icons';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const initializedCart = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(initializedCart);
  }, []);

  const updateQuantity = (index, delta) => {
    const newCart = [...cartItems];
    const item = newCart[index];
    item.quantity = Math.max(1, item.quantity + delta);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const subtotal = cartItems.reduce((sum, item) => {
    if (item.oldPrice && item.oldPrice > item.price) {
      return sum + item.oldPrice * item.quantity;
    }
    return sum + item.price * item.quantity;
  }, 0);

  const totalDiscount = cartItems.reduce((sum, item) => {
    if (item.oldPrice && item.oldPrice > item.price) {
      return sum + (item.oldPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

  const totalDiscountPercentage =
    subtotal > 0 ? (totalDiscount / subtotal) * 100 : 0;
  const deliveryFee = 15;
  const total = subtotal - totalDiscount + deliveryFee;

  return (
    <div className="cart-page container">
      <div className="hr-line" />
      <h1>YOUR CART</h1>
      <div className="cart-wrapper">
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <div className="info-image">
                <img src={item.image} alt={item.title} />
                <div className="info">
                  <h4>{item.title}</h4>
                  <p><span className="main">Size:</span> {item.size}</p>
                  <p><span className="main">Color:</span> {item.color}</p>
                  <div className="price-info">
                    <strong>${item.price.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
              <div className="actions">
                <div onClick={() => removeItem(index)} className="trash"><DeleteIcon /></div>
                <div className="quantity">
                  <button onClick={() => updateQuantity(index, -1)} className="quantity-btn">-</button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button onClick={() => updateQuantity(index, 1)} className="quantity-btn">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="summary">
          <h3>Order Summary</h3>
          <div className="summary-line">
            <span>Subtotal</span><span className='price'>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Discount (-{totalDiscountPercentage.toFixed(2)}%)</span><span className="red">-${totalDiscount.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Delivery Fee</span><span className='price'>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="hr-line-between" />
          <div className="summary-line total">
            <span>Total</span><span className='price'>${total.toFixed(2)}</span>
          </div>
          <div className="promo">
            <div className="promo-input-wrapper">
              <PromoIcon className="promo-icon" />
              <input type="text" placeholder="Add promo code" />
            </div>
            <button>Apply</button>
          </div>
          <button className="checkout">Go to Checkout →</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
