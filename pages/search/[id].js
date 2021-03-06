import Navigation from "../../components/navigation";
import { useEffect, useState } from "react";
import Description from "../../components/description";
import Footer from "../../components/footer";
import Image from "next/image";
import { baseUrl } from "../../service/api";
import { Alerting } from "../../utils/alert";
import { useRouter } from "next/router";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import PlantCard from "../../components/PlantCard";
import Link from "next/link";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Navigation as Navi } from "swiper";

export default function Details({ plant, searchId }) {
  const router = useRouter();
  const { id } = router.query;
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, [windowWidth]);

  const saveConcept = async () => {
    const user = JSON.parse(localStorage.getItem("username"));
    if (!user) return;
    const response = await baseUrl.get(`/users/${user.id}/userconcepts`);
    const existConcept = response.data.find(
      (concept) => concept.userConceptTitle === plant.plantDiseaseName
    );
    if (existConcept) {
      Alerting({
        title: "Ya tienes este concepto guardado",
        message: "Puedes verlo en la sección de conceptos guardados",
        type: "warning",
        icon: "warning",
      });
      return;
    }

    const addConcept = await baseUrl.post("/userconcepts", {
      userConceptTitle: plant?.plantDiseaseName,
      userConceptDescription: plant?.plantDiseaseDescription,
      url: "/search/" + id,
    });
    console.log(addConcept);
    if (addConcept.status === 200) {
      console.log(
        `https://backend-ontologia.azurewebsites.net/api/users/${user.id}/userconcepts/${addConcept.data.id}/`
      );
      await baseUrl.post(
        `users/${user.id}/userconcepts/${addConcept.data.id}/`
      );
      Alerting({
        title: "Concepto guardado",
        message: "Puedes verlo en la sección de conceptos guardados",
        type: "success",
        icon: "success",
      });
    }
  };
  const percentage = 78.6;
  return (
    <div>
      <Description />

      <Navigation />

      <main className="celular:text-sm md:text-base mx-auto mb-4 celular:w-full md:w-2/3 min-h-screen">
        <div className="flex flex-col md:items-start celular:items-center mb-4">
          <div className="flex lg:flex-row   lg:items-center md:flex-col celular:flex-col my-6 py-8 px-10 justify-between md:shadow-md rounded-lg w-full">
            <div className="flex md:flex-col flex-1   gap-[16px] justify-between celular:flex-col celular:items-center  md:items-start">
              <h1 className="font-medium text-4xl md:py-0 celular:py-4 text-justify lg:text-center">
                Enfermedades de la papa
              </h1>
              <button
                onClick={() => saveConcept(plant)}
                className="celular:w-full celular:h-10 md:w-40 md:h-8 bg-skyblue text-white rounded-md font-medium"
              >
                Guardar detalle
              </button>
            </div>
            <div className="flex flex-col justify-between items-start md:py-0 space-y-4 celular:py-10 md:w-[250px]">
              <div className="flex  justify-start items-start md:justify-center ">
                <p className="text-lg font-medium">
                  ¿Te fue útil esta búsqueda?
                </p>
              </div>
              <div className="flex flex-row celular:justify-between md:justify-center space-x-4 text-sm celular:py-4 md:py-0">
                <button className="rounded-md celular:w-36 celular:h-8 md:w-24 md:h-7 bg-skyblue text-white">
                  Sí
                </button>
                <button className="rounded-md celular:w-36 celular:h-8 md:w-24 md:h-7 bg-bluebuscar text-white">
                  No
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 celular:grid-cols-1 w-full space-x-12 celular:px-4">
            <div className="flex flex-col">
              <h1 className="text-3xl  pt-5 font-medium text-[#13293D]">
                {plant.plantDiseaseName}
              </h1>
              <div className="  py-5  text-gray-700 ">
                <p className="text-gray-700">{plant.plantDiseaseDescription}</p>
              </div>
            </div>

            <div
              className="flex w-full m-0 celular:flex-col md:flex-row"
              style={{ margin: 0 }}
            >
              {/* Plant */}
              {plant.afectaA && (
                <div
                  className="flex justify-center md:flex-col celular:flex-col-reverse
               md:justify-between items-center h-5/6 shadow-lg rounded-xl w-full m-2 celular:p-5 md:p-10"
                >
                  <h2 className="text-gray-500 text-[16px] font-semibold text-center mb-2">
                    Afecta a un porcentaje de los cultivos
                  </h2>
                  <CircularProgressbar
                    styles={{
                      path: {
                        // Path color
                        stroke: `#FD9808`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "round",
                        // Customize transition animation
                        // Rotate the path
                      },
                      text: {
                        fill: "#FD9808",
                        fontSize: "24px",
                        fontWeight: "bold",
                      },
                      trail: {
                        // Trail color
                        stroke: "#E8F1F2",
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Rotate the trail
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                      },
                    }}
                    value={plant.afectaA}
                    text={`${plant.afectaA}%`}
                  />
                </div>
              )}
              {/* <div className="flex justify-center md:flex-col celular:flex-col-reverse md:justify-between items-center h-5/6 shadow-lg rounded-xl w-full m-2 celular:p-5 md:p-10">
                <div className="flex flex-row gap-4">
                  <div className="flex items-center">
                    <ul className="text-skyblue">
                      <Link
                        href={`https://www.google.com/search?q=${plant.plantDiseaseName}+%22papa%22`}
                      >
                        <a>Búsqueda en Google</a>
                      </Link>
                    </ul>
                  </div>
                  <div>
                    <Image
                      src="https://blush.design/api/download?shareUri=_nRDPd5Vo&w=800&h=800&fm=png"
                      alt="detail image"
                      width={125}
                      height={162}
                    />
                  </div>
                </div>
              </div> */}
              {/* plant */}
              <div
                className="flex  justify-center md:flex-col celular:flex-col-reverse
               md:justify-between items-center h-5/6 shadow-lg rounded-xl w-full m-2 celular:p-5 md:p-10"
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-center text-center">
                    <ul className="text-gray-700 font-medium">
                      <Link
                        href={`https://www.google.com/search?q=${plant.plantDiseaseName}+%22papa%22`}
                      >
                        <a className="flex items-center flex-col justify-center">
                          Búsqueda en Google
                          <Image
                            src="/google.svg"
                            alt="detail image"
                            width={200}
                            height={200}
                            objectFit="contain"
                          />
                        </a>
                      </Link>
                    </ul>
                  </div>
                  <div className="flex justify-center"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3 m-auto w-fit mb-[30px]">
          <p className="font-small flex gap-[100px]">
            <p className="flex items-center gap-[20px]">
              Agente causal: <p className="w-3 h-3 bg-red-300"></p>
            </p>
            <p className="flex items-center gap-[20px]">
              Sintoma: <p className="w-3 h-3 bg-yellow-300"></p>
            </p>
          </p>
        </div>

        <Swiper
          slidesPerView={windowWidth < 1200 ? 1 : 3}
          spaceBetween={1}
          slidesPerGroup={windowWidth < 1200 ? 1 : 3}
          loop={false}
          loopFillGroupWithBlank={false}
          navigation={true}
          modules={[Navi]}
          className="mySwiper"
        >
          {plant?.agentesCausales?.map((agente, index) => (
            <SwiperSlide key={agente.nombre}>
              <PlantCard agente={agente} causal />
            </SwiperSlide>
          ))}
          {plant?.sintomas?.map((agente, index) => (
            <SwiperSlide key={agente.nombre}>
              <PlantCard agente={agente} />
            </SwiperSlide>
          ))}
        </Swiper>
      </main>

      <Footer />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const plat = await fetch(
    "https://backend-ontologia.azurewebsites.net/api/plantdiseases/" + id
  );
  const data = await plat.json();

  return {
    props: {
      plant: data,
    },
  };
};
