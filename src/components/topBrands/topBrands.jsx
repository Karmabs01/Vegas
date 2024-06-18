import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";
import "bootstrap/dist/css/bootstrap.min.css";

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const options = {
  loop: true,
  margin: 10,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1100: {
      items: 3
    }
  }
};

function TopBrands({
  newUrl,
  ipDataCode,
  currentLanguage,
  source,
  selectedCountry,
  setSelectedCountry, // Функция для обновления selectedCountry
}) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [loading, setLoading] = useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const brandValue = urlParams.get("brand");

  const apiOld = "https://bonusnumber1.com/api/brandsNew/read.php";
  const apiNew = "https://bonusnumber1.com/api/brandsNew2/read.php";
  const api1043 = "https://bonusnumber1.com/api/brandsNew3/read.php";
  const api1044 = "https://bonusnumber1.com/api/brandsNew4/read.php";

  function showData(array) {
    const showedArray = array.slice(); // Создаем копию массива
    //Обрезка массива до step элементов, чтобы было по шаблону
    // if (showedArray.length > step) {
    //   setAllElements(false)
    //   return showedArray.slice(0, step);
    // } else {
    //   setAllElements(true)
    // }
    return showedArray;
  }

  console.log("source:", source);
  useEffect(() => {
    const geo = selectedCountry.toUpperCase();
    console.log("GEO", geo);
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
          // const dataArray = Object.values(responseData.brandsNew);
          let filteredData = [];
          if (geo) {
            filteredData = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["High_hybrid"] === "1"
            );
          } else {
            filteredData = responseData.brandsNew.filter(
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
            filteredData = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Trendsetting"] === "1"
            );
          }


          const topData = responseData.brandsNew
            .filter((rowData) => rowData.Tech === brandValue)
            .map((item) => ({
              ...item,
              clas: "topbrand",
            }));

          // Фильтрация объектов в массиве data
          const filteredDataWithTopData = filteredData.filter((dataItem) => {
            // Проверка, есть ли объект с таким же Casino brand в topData
            const existsInTopData = topData.some(
              (topDataItem) =>
                topDataItem["CasinoBrand"] === dataItem["CasinoBrand"]
            );

            // Возвращаем true только для объектов, которые не совпадают
            return !existsInTopData;
          });

          const arrLength = filteredDataWithTopData.length / 2

          if (geo !== "ALL") {
            setData(showData(filteredDataWithTopData.slice(0, arrLength)));
          } else {
            setData(showData(filteredDataWithTopData));
          }
          setLoading(false);

          setTopData([...topData]);

          // Если нет брендов, вызывать setSelectedCountry
          if (filteredDataWithTopData.length === 0) {
            setSelectedCountry("all");
            console.log(filteredDataWithTopData);
          }
        } else {
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setLoading(false);
      }
    };

    if ((geo && currentLanguage) || (!geo && ipDataCode && currentLanguage)) {
      fetchData();
    }
  }, [ipDataCode, brandValue, currentLanguage, selectedCountry, source]);

  const combinedData = [...topData, ...data];

  return (

    <div>
      {data.length > 0 && (
        <section className="trending py-5" id="experience">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-lg-8 mb-5 mb-lg-0">
                <p className="mt-5 mb-3 theme-text-primary fs-4 fw-bold" data-aos="fade-up">Our Games</p>
                <h2 className="display-1 font-black mb-3 heading" data-aos="fade-up">Trending Games</h2>
              </div>
              <div className="col-12 col-lg-4">
                <div className="owl-theme">
                  <div className="owl-controls">
                    <div className="custom-nav owl-nav"></div>
                  </div>
                </div>
              </div>
            </div>
            <OwlCarousel className='owl-carousel owl-theme' loop margin={10} id="carouselTrending" nav  {...options}>

              {data.map((rowData, index) => (
                <div className="item mb-3 mb-lg-0" key={index} data-aos="fade-up">
                  <div className="row g-0 list">
                    <div className="col-12 col-md-4 col-xxl-4">
                      <figure className="image-icon mb-0">
                        <img src={rowData["LinkImg"]} alt={rowData["LinkImg"]} />
                      </figure>
                    </div>
                    <div className="col-12 col-md-8 col-xxl-8">
                      <div className="p-3">
                        <h4 className="d-block fs-6 fw-bold mb-2 theme-text-secondary"><span>{rowData["CasinoBrand"]}</span></h4>
                        <div className="d-block fs-8 mb-2 theme-text-secondary">{rowData["OurOfferContent"]}</div>
                        <div className="d-flex align-items-center justify-content-between btn-wrap mt-2">
                          <a href={rowData["GoBig"] + newUrl + "L_vegas_1"}>
                            <button className="btn-primary">Play Now</button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
              )}
            </OwlCarousel>
          </div>
        </section>
      )}
    </div>
  );
}

export default TopBrands;
