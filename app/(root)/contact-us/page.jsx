"use client";
import Head from "next/head";
import "./page.css"; // Import the CSS file (place in styles folder)

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    e.target.reset();
  };

  return (
    <>
      <Head>
        <title>Contact Us - Bakery Bolfo Zanzibar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="container">
        <h1 className="page-title">Contact Us</h1>

        <div className="contact-wrapper">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <div className="info-item">
              <h4>Address</h4>
              <p>Mpendae, Hajiseti Street,</p>
              <p>Zanzibar, Tanzania</p>
            </div>
            <div className="info-item">
              <h4>Phone</h4>
              <p>
                <a href="tel:+255777123456">+255 777 123 456</a>
              </p>
              <p>
                <a href="tel:+255715789012">+255 715 789 012</a>
              </p>
            </div>
            <div className="info-item">
              <h4>Email</h4>
              <p>
                <a href="mailto:info@bakerybolfo.co.tz">
                  info@bakerybolfo.co.tz
                </a>
              </p>
            </div>
            <div className="info-item">
              <h4>Social Media</h4>
              <p>
                <a href="https://facebook.com/bakerybolfo" target="_blank">
                  Facebook
                </a>
              </p>
              <p>
                <a href="https://instagram.com/bakerybolfo" target="_blank">
                  Instagram
                </a>
              </p>
              <p>
                <a href="https://twitter.com/bakerybolfo" target="_blank">
                  Twitter
                </a>
              </p>
            </div>
          </div>

          <div className="contact-form">
            <h3>Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select id="subject" name="subject" required>
                  <option value="">Please select</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Place an Order</option>
                  <option value="catering">Catering Services</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea id="message" name="message" required></textarea>
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>

        <div className="map-section">
          <h3>Find Us</h3>
          <div className="map-container">
            <div className="map-placeholder">
              [Google Maps Embed - Location: Stone Town, Zanzibar]
            </div>
          </div>
        </div>

        <div className="business-hours">
          <h3>Business Hours</h3>
          <table className="hours-table">
            <tbody>
              <tr>
                <th>Monday - Friday</th>
                <td>7:00 AM - 8:00 PM</td>
              </tr>
              <tr>
                <th>Saturday</th>
                <td>8:00 AM - 7:00 PM</td>
              </tr>
              <tr>
                <th>Sunday</th>
                <td>9:00 AM - 5:00 PM</td>
              </tr>
              <tr>
                <th>Public Holidays</th>
                <td>9:00 AM - 3:00 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>


    </>
  );
}
