"use client";
import React from "react";
import { useState, useEffect } from "react";
import styles from "./styleReviews.module.css";

export default function ReviewsComponent() {
  const [selectedCountry, setCountry] = useState(null);
  const [Review, setReview] = useState(null);
  const [england, setEngland] = useState(false);
  const [scotland, setScotland] = useState(false);
  const [wales, setWales] = useState(false);

  function handleClick(place) {
    console.log(selectedCountry);
    setCountry(place);
  }

  useEffect(() => {
    if (selectedCountry) {
      fetch(
        `https://seal-app-336e8.ondigitalocean.app/reviews?country=${selectedCountry}`
      )
        .then((response) => response.json())
        .then((data) => setReview(data));

      setEngland(selectedCountry === "England");
      setScotland(selectedCountry === "Scotland");
      setWales(selectedCountry === "Wales");
    }
  }, [selectedCountry]);

  console.log(Review);
  return (
    <>
      <section>
        <article className={styles.reviewContainer}>
          <h1 className={styles.heading}>Trusted</h1>
          <p className={styles.reviewText}>
            We've got thousands of happy customers all over the UK. Choose your
            country to see the latest review:
          </p>
          <div className={styles.buttonContainer}>
            <button
              onClick={() => handleClick("England")}
              className={`${styles.countryButtons} ${
                england && styles.buttonSelected
              }`}
            >
              England
            </button>

            <button
              onClick={() => handleClick("Wales")}
              className={`${styles.countryButtons} ${
                wales && styles.buttonSelected
              }`}
            >
              Wales
            </button>

            <button
              onClick={() => handleClick("Scotland")}
              className={`${styles.countryButtons} ${
                scotland && styles.buttonSelected
              }`}
            >
              Scotland
            </button>
          </div>
          <div
            className={Review && Review.text ? styles.reviewSubContainer : ""}
          >
            {Review ? Review.text : ""}
          </div>
          <div className={styles.reviewContent}>
            {Review ? Review.author + " - " + Review.location : ""}
          </div>
        </article>
      </section>
    </>
  );
}
