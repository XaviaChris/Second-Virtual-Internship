import { useState, useEffect, useRef } from "react";
import "./ChoosePlan.css";
import pricingImage from "../assets/pricing-top.png";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa6";
import { IoChevronForward } from "react-icons/io5";
import Footer from "../components/Footer.jsx";

function ChoosePlan() {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [openIndex, setOpenIndex] = useState(null);
  const [isFloating, setIsFloating] = useState(true);
  const [loading, setLoading] = useState(false);

  const ctaStopRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ctaStopRef.current) return;

      const rect = ctaStopRef.current.getBoundingClientRect();

      if (rect.top <= window.innerHeight - 80) {
        setIsFloating(false);
      } else {
        setIsFloating(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://us-central1-YOUR_PROJECT.cloudfunctions.net/createCheckoutSession",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan: selectedPlan,
          }),
        }
      );

      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: "How does the free 7-day trial work?",
      answer: "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
    },
    {
      question: "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
      answer: "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
    },
    {
      question: "What's included in the Premium plan?",
      answer: "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
    },
    {
      question: "Can I cancel during my trial or subscription?",
      answer: "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.",
    },
  ];

  const footerText =
    selectedPlan === "yearly"
      ? "Cancel your trial at any time before it ends, and you won’t be charged."
      : "30-day money back guarantee, no questions asked.";

  return (
    <div className="choose">
      <div className="header--navy">
        <div>
          <h1 className="header__text--title">
            Get unlimited access to many amazing books to read
          </h1>
          <h2 className="header__text-subtitle">
            Turn ordinary moments into amazing learning opportunities
          </h2>
        </div>
        <img className="pricing--img" src={pricingImage} alt="pricing" />
      </div>

      {isFloating && (
        <div className="cta--floating">
          <div className="cta__content">
            <button className="choose__cta no--click" onClick={handleCheckout}>
              {loading
                ? "Redirecting..."
                : selectedPlan === "yearly"
                ? "Start your free trial"
                : "Get started"}
            </button>

            <p className="plan__footer-text">{footerText}</p>
          </div>
        </div>
      )}

      <div className="key__ideas">
        <p className="key__ideas__text">
          <IoDocumentTextSharp className="ideas--icons" />
          <b>Key ideas in few min </b>with many books to read
        </p>
        <p className="key__ideas__text">
          <RiPlantFill className="ideas--icons" />
          <b>3 million </b>people growing with Summarist everyday
        </p>
        <p className="key__ideas__text">
          <FaHandshake className="ideas--icons" />
          <b>Precise recommendations </b> collections curated by experts
        </p>
      </div>

      <h1 className="header__text-subtitle">
        Choose the plan that fits you
      </h1>

      <div className="plan__options">
        <div
          className={`plan__box ${
            selectedPlan === "yearly" ? "active" : ""
          }`}
          onClick={() => setSelectedPlan("yearly")}
        >
          <div className="plan__radio">
            <div
              className={`radio__outer ${
                selectedPlan === "yearly" ? "active" : ""
              }`}
            >
              <div className="radio__inner"></div>
            </div>
          </div>

          <div className="plan__content">
            <h3>Premium Plus Yearly</h3>
            <h2>$99.99/year</h2>
            <p className="best--fit">7-day free trial included</p>
          </div>
        </div>

        <div className="plan__divider">
          <span>or</span>
        </div>

        <div
          className={`plan__box ${
            selectedPlan === "monthly" ? "active" : ""
          }`}
          onClick={() => setSelectedPlan("monthly")}
        >
          <div className="plan__radio">
            <div
              className={`radio__outer ${
                selectedPlan === "monthly" ? "active" : ""
              }`}
            >
              <div className="radio__inner"></div>
            </div>
          </div>

          <div className="plan__content">
            <h3>Premium Monthly</h3>
            <h2>$9.99/month</h2>
            <p className="best--fit">No trial included</p>
          </div>
        </div>
      </div>

      <div ref={ctaStopRef} className="cta--placeholder">
        <div className="cta__content">
          <button className="choose__cta no--click" onClick={handleCheckout}>
            {loading
              ? "Redirecting..."
              : selectedPlan === "yearly"
              ? "Start your free 7-day trial"
              : "Start your first month"}
          </button>

          <p className="plan__footer-text">{footerText}</p>
        </div>
      </div>

      <div className="accordion">
        {faqs.map((item, index) => (
          <div className="accordion__item" key={index}>
            <div
              className="accordion__header"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              <h3>{item.question}</h3>
              <IoChevronForward
                className={`accordion__icon ${
                  openIndex === index ? "open" : ""
                }`}
              />
            </div>

            {openIndex === index && (
              <div className="accordion__content">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default ChoosePlan;