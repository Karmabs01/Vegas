import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";
import img from "../../images/icons/how-to-play-icon01.png";

import CountdownTimer from './countdownTimer';


function TimerBrands({
  newUrl,
  ipData,
  ipDataCode,
  currentLanguage,
  country,
  source,
  selectedCountry,
  setSelectedCountry,
}) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [otherData, setOtherData] = useState([]);
  const [visibleBrands, setVisibleBrands] = useState(8);

  const DAYS_IN_MS = 1 * 12 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTime = NOW_IN_MS + DAYS_IN_MS;

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


  // ...

  return (
    <div>
      {otherData.length > 0 && (
        // <section className="experience py-5" id="howtoplay">
        //   <div className="container">
        //     <div className="row">
        //       <div className="col-12 col-lg-12">
        //         <p className="mt-0 mt-lg-5 mb-3 theme-text-primary fs-4 fw-bold" data-aos="fade-up">{t("Best deals inside")}</p>
        //         <h2 className="display-1 mb-3 font-black heading" data-aos="fade-up">{t("Bellagio's Best Bets")}</h2>
        //       </div>
        //     </div>
        //     <div className="row mt-5 mb-lg-5 position-relative">
        //       {/* <div className="line"></div> */}
        //       {otherData.length > 0 ? (
        //         otherData.map((rowData, index) => (
        //           <div key={index} className="col-12 col-lg-4 col-sm-6 mb-4 mb-lg-0" data-aos="fade-up">
        //             <div className="text-center step-card">
        //               <figure className="mb-0 image-icon">
        //                 <img src={rowData["LinkImg"]} alt={rowData["LinkImg"]} />
        //               </figure>
        //               <p className="p-5 mb-0 theme-text-accent-two fs-5 fw-bold">{rowData["OurOfferContent"]}</p>
        //               <a href={rowData["GoBig"] + newUrl + "L_vegas_2"}>
        //                 <div className="group btn-wrap justify-content-center">
        //                   <button className="btn-primary custom-btn-primary">{t("Play Now")}</button>
        //                 </div>
        //               </a>
        //               <div className="step-corner">
        //                 <div className="step-arrow fw-bold">{index + 1}</div>
        //               </div>
        //             </div>
        //           </div>
        //         ))
        //       ) : (
        //         <p className="no-available-brands">{t("No brands available for your country")}</p>
        //       )}
        //       <div className="col-12 mt-5 text-center" data-aos="fade-up">
        //         <div className="group btn-wrap justify-content-center">
        //           {isAllElements ? (
        //             <a href={`https://topbon.us/${newUrl}L_vegas_2`} className="button-drawing type--A" target="_blank">
        //               <button className="btn-primary custom-btn-primary">{t("More offers")}</button>

        //             </a>
        //           ) : (
        //             <a className="button-drawing type--A" target="_blank"
        //               onClick={loadMoreItems}>
        //               <button className="btn-primary custom-btn-primary">{t("Show more")}</button>
        //             </a>
        //           )}
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </section>
        <section className="games py-5" id="games">
            <div className="leftImage" data-aos="fade-down"></div>
            <div className="rightImage" data-aos="fade-down"></div>

        <div className="container bground">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <p className="mb-3 theme-text-primary fs-4 fw-bold" data-aos="fade-up">Final Call: Act Fast!</p>
                <h1 className="display-1 mb-3 font-black heading" data-aos="fade-up">Limited Time offers</h1>
              </div>
              <div className="row mt-5 align-items-center">
              {otherData.length > 0 ? (
                  otherData.slice(0, 1).map((rowData, index) => (
                     <div key={index} className="col-12 col-lg-3 offset-lg-1" data-aos="fade-up">
                     <div className="game-card text-center py-4">
                       <figure className="mb-0 icon-bg">
                       <img src={rowData["LinkImg"]} alt={rowData["LinkImg"]} />
                       </figure>
                       <h3 className="h2 fw-bold mb-3 mt-3">{rowData["CasinoBrand"]}</h3>
                       <p className="fs-6 fw-bold theme-text-primary mb-3">{rowData["OurOfferContent"]}</p>
                        <a  className="group btn-wrap justify-content-center" target="_blank" href={rowData["GoBig"] + newUrl + "L_vegas_random_2"}>
                         <button className="btn-primary custom-btn-primary">{t("Try Your Luck!")}</button>
                       </a>
                     </div>
                   </div>
                  ))
                ) : (
                  <p className="no-available-brands">{t("No brands available for your country")}</p>
                )}
               
                <div className="col-12 col-lg-4" data-aos="fade-up">
                  <div className="text-center py-4 mb-4">
                    <CountdownTimer targetDate={dateTime} />
                  </div>
                </div>
                
                {otherData.length > 0 ? (
                  otherData.slice(1, 2).map((rowData, index) => (
                     <div key={index} className="col-12 col-lg-3" data-aos="fade-up">
                     <div className="game-card text-center py-4">
                       <figure className="mb-0 icon-bg">
                       <img src={rowData["LinkImg"]} alt={rowData["LinkImg"]} />
                       </figure>
                       <h3 className="h2 fw-bold mb-3 mt-3">{rowData["CasinoBrand"]}</h3>
                       <p className="fs-6 fw-bold theme-text-primary mb-3">{rowData["OurOfferContent"]}</p>
                        <a key={index} className="group btn-wrap justify-content-center" target="_blank" href={rowData["GoBig"] + newUrl + "L_vegas_random_2"}>
                         <button className="btn-primary custom-btn-primary">{t("Try Your Luck!")}</button>
                       </a>
                     </div>
                   </div>
                  ))
                ) : (
                  <p className="no-available-brands">{t("No brands available for your country")}</p>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>
      )}
    </div>

  );
}

export default TimerBrands;
