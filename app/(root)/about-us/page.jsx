
"use client"
import Head from 'next/head';
import './page.css';
import Image from 'next/image';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Bakery Bolfo Zanzibar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="container">
        <section className="hero-section">
          <div className="hero-image">
            <img src="/hamos.jpg" alt="Bakery Bolfo Storefront" />
          </div>
          <div className="hero-content">
            <h1>Our Story</h1>
            <p>Bakery Bolfo is more than just a bakery – we're a family of passionate bakers bringing the rich flavors of Zanzibar to life through our artisan breads, pastries, and traditional treats.</p>
            <p>Founded in 2015 by Abdul and Hafidh, we started as a small family bakery on Mpendae, Hajiseti Street in Zanzibar, driven by a love for authentic Zanzibari baking and a commitment to using local, fresh ingredients.</p>
          </div>
        </section>

        <section className="story-section">
          <h2 className="section-title">Our Journey</h2>
          <p>Our story begins with Abdul and Hafidh, brothers who learned the art of baking from their family in Zanzibar. What started as a small street-side bakery has grown into a beloved local institution, celebrating the rich culinary heritage of Zanzibar.</p>
          <p>We draw inspiration from the island's diverse cultural influences – Arab, Persian, Indian, and African – creating unique flavors that tell the story of Zanzibar through every bite. From traditional Swahili breads to French-inspired pastries, our menu reflects the multicultural spirit of our beautiful island.</p>
        </section>

        <section className="values-section">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Local Ingredients</h3>
              <p>We source 80% of our ingredients from local Zanzibari farmers and producers, supporting our community and ensuring the freshest, most authentic flavors.</p>
            </div>
            <div className="value-item">
              <h3>Traditional Craft</h3>
              <p>We preserve traditional baking methods, using wood-fired ovens and time-honored techniques passed down through generations.</p>
            </div>
            <div className="value-item">
              <h3>Community First</h3>
              <p>We believe in giving back. We offer baking apprenticeships to local youth and support community food programs.</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <Image height={500} width={500} src="/images/team/abdul.jpg" alt="Abdul" />
              <h3>Abdul</h3>
              <p>Co-Founder & Head Baker</p>
            </div>
            <div className="team-member">
              <Image height={500} width={500} src="/images/team/hafidhi.jpg" alt="Hafidh" />
              <h3>Hafidh</h3>
              <p>Co-Founder & Operations Manager</p>
            </div>
            <div className="team-member">
              <Image height={500} width={500} src="/images/team/fatma.jpg" alt="Fatima Hassan" />
              <h3>Fatima Hassan</h3>
              <p>Pastry Chef</p>
            </div>
          </div>
        </section>
      </main>

    
    </>
  );
}