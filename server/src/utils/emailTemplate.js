export const forgotPasswordTemplate = (resetUrl, name) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>Hello ${name},</h2>
    <p>You requested a password reset. Click the link below to set a new password:</p>
    <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background: #000; color: #fff; text-decoration: none; border-radius: 4px;">
      Reset Password
    </a>
    <p>If you didn't request this, you can safely ignore this email.</p>
    <p>Thanks,<br/>ShopEase Team</p>
  </div>
`;

export const orderConfirmationTemplate = (order, shippingAddress, orderItems, totalPrice) => {
  return `
    <h1>Thank you for your order!</h1>
    <p>Your order has been placed successfully.</p>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Total:</strong> ₹${totalPrice.toLocaleString()}</p>
    
    <h3>Shipping Address:</h3>
    <p>
      ${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state}, 
      ${shippingAddress.zipCode}, ${shippingAddress.country}
    </p>
    
    <h3>Order Items:</h3>
    <ul>
      ${orderItems.map(i => `<li>${i.quantity} x ${i.productName} @ ₹${i.price.toLocaleString()}</li>`).join('')}
    </ul>
    
    <p>We will notify you once your order is shipped.</p>
  `;
};
