import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import heroPic from "../../images/hero/hero-pic.png";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import logo1 from "../../images/partner/logo01.png";
import logo2 from "../../images/partner/logo02.png";
import logo3 from "../../images/partner/logo03.png";
import logo4 from "../../images/partner/logo04.png";
import logo5 from "../../images/partner/logo05.png";



function AnotherBrands({
  newUrl,
  ipDataCode,
  currentLanguage,
  source,
  selectedCountry,
}) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [otherData, setOtherData] = useState([]);
  const [visibleBrands, setVisibleBrands] = useState(8);

  const handleShowMore = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + 8);
  };

  const apiOld = "https://bonusnumber1.com/api/brandsNew/read.php";
  const apiNew = "https://bonusnumber1.com/api/brandsNew2/read.php";
  const api1043 = "https://bonusnumber1.com/api/brandsNew3/read.php";
  const api1044 = "https://bonusnumber1.com/api/brandsNew4/read.php";

  function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }


  useEffect(() => {
    const geo = selectedCountry.toUpperCase();

    const fetchData = async () => {
      try {
        let url;
        switch (source) {
          case "partner1039":
            url = apiNew; // Для partner1039
            break;
          case "partner1043":
            url = api1043; // Для partner1043
            break;
          case "partner1044":
            url = api1044; // Для partner1044
            break;
          default:
            url = apiOld; // Для всех остальных случаев
        }

        const res = await fetch(url);
        if (res.ok) {
          const responseData = await res.json();
          // const dataArray = Object.values(responseData);

          let filteredDataOther = [];

          if (geo) {
            filteredDataOther = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["High_hybrid"] === "1"
            );
          } else {
            filteredDataOther = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["High_hybrid"] === "1"
            );
          }
          if (geo === "ALL") {
            filteredDataOther = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["FirstPriority"] === "1"
            );
          }


          // Перемешиваем данные перед отображением
          setOtherData(shuffleArray(filteredDataOther));
          setLoading(false);

          // Если нет брендов, вызывать setSelectedCountry
          // if (filteredDataOther.length === 0) {
          //   setSelectedCountry("all");
          // }
        } else {
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setLoading(false);
      }
    };

    if ((ipDataCode && currentLanguage) || (geo && currentLanguage)) {
      fetchData();
    }
  }, [ipDataCode, currentLanguage, selectedCountry, source]);

  const options = {
    loop: true,
    margin: 40,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 3
      },
      1100: {
        items: 5
      }
    }
  };

  return (

    // <section id="home" className="hero-section go-zoom-1">
    //   <div className="container">
    //     <div className="row align-items-center">
    //       <div className="col-lg-12">
    //         <div className="hero-content top-greadient">
    //           <h1 className="wow fadeInLeft mb-20" data-wow-delay=".2s"> {t("Hello, summer!")}</h1>
    //           <h4 className="wow fadeInUp" data-wow-delay=".4s">
    //             {t("Discover top online casino offers, exclusive bonuses, free spins, and more. Try your luck with these sizzling summer deals!")}
    //           </h4>

    //         </div>
    //         {otherData.length > 0 ? (
    //           otherData.slice(0, 1).map((rowData, index) => (
    //             <a key={index} target="_blank" href={rowData["GoBig"] + newUrl + "L_enchanted-forest_random"} className="button-drawing type--A">
    //               <div className="button__line"></div>
    //               <div className="button__line"></div>
    //               <span className="button__text">{t("TRY YOUR LUCK")}</span>
    //               <div className="button__drow1"></div>
    //               <div className="button__drow2"></div>
    //             </a>
    //           ))
    //         ) : (
    //           <p className="no-available-brands">{t("No brands available for your country")}</p>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="hero" id="home">
      <div className="bground">
        <div className="container mt-5">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 position-relative align-self-center" data-aos="fade-up">
              <p className="sub-heading mt-5 mb-3 fs-4 fw-bold theme-text-primary">Discover your next Play Games</p>
              <h1 className="display-1 text-uppercase mb-3 font-black max theme-text-white">Gaming World</h1>
              <p className="fs-5 mb-0 theme-text-white">High Quality Video Online Games</p>
              <div className="group mt-5 btn-wrap">
                {otherData.length > 0 ? (
                  otherData.slice(0, 1).map((rowData, index) => (
                    <a key={index} target="_blank" href={rowData["GoBig"] + newUrl + "L_vegas_random"}>
                      <button className="btn-primary custom-btn-primary">Play Now</button>
                    </a>
                  ))
                ) : (
                  <p className="no-available-brands">{t("No brands available for your country")}</p>
                )}
                {/* <span className="ms-3">
                <button className="btn custom-btn-secondary icon-wrapper" type="submit">
                  <i className="bi bi-play-fill fs-4"></i>
                </button>
              </span> */}
              </div>
            </div>
            <div className="col-12 col-lg-6 position-relative" data-aos="fade-down">
              <figure className="mb-0 shape-wrap">
                <img src={heroPic} alt={heroPic} className="img-fluid obj-1" />
              </figure>
            </div>
          </div>
        </div>
        <div className="container my-5">
          <OwlCarousel className='owl-carousel owl-theme' id="carouselPartner" loop margin={10} nav  {...options}>

            <div className="col w-auto">
              <img src={logo1} alt={logo1} />
            </div>
            <div className="col w-auto">
              <img src={logo2} alt={logo2} />
            </div>
            <div className="col w-auto">
              <img src={logo3} alt={logo3} />
            </div>
            <div className="col w-auto">
              <img src={logo4} alt={logo4} />
            </div>
            <div className="col w-auto">
              <img src={logo5} alt={logo5} />
            </div>
          </OwlCarousel>;

        </div>
      </div>
    </section>

  );
}

export default AnotherBrands;
