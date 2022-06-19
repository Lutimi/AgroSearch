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
  return (
    <div>
      <Description />

      <Navigation />

      <main className="celular:text-sm md:text-base mx-auto mb-4 celular:w-full md:w-2/3 min-h-screen">
        <div className="flex flex-col md:items-start celular:items-center mb-4">
          <div className="flex lg:flex-row items-center md:flex-col celular:flex-col my-6 py-8 px-10 justify-between md:shadow-md rounded-lg w-full">
            <div className="flex md:flex-col flex-1  gap-[16px] justify-evenly celular:flex-col celular:items-center md:items-start">
              <h1 className="font-extrabold text-4xl md:py-0 celular:py-4 text-center">
                Enfermedades de la papa
              </h1>
              <button
                onClick={() => saveConcept(plant)}
                className="celular:w-full celular:h-10 md:w-40 md:h-8 bg-skyblue text-white rounded-md font-medium"
              >
                Guardar detalle
              </button>
            </div>
            <div className="flex flex-col md:py-0 celular:py-10 md:w-[250px]">
              <div className="flex justify-center">
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

          <div className="flex md:flex-row md:w-full md:justify-between celular:flex-col items-center">
            <div className="flex flex-col md:w-1/2">
              <h1 className="text-3xl px-10 pt-5 font-medium">
                {plant.plantDiseaseName}
              </h1>
              <div className=" px-10 py-5 ">
                <p>{plant.plantDiseaseDescription}</p>
              </div>
            </div>
            {/* plant */}
            <div className="flex justify-center md:flex-col celular:flex-col-reverse md:justify-between items-center h-72 shadow-lg rounded-xl w-1/2 m-2 celular:p-5 md:p-10">
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
          loop={windowWidth < 1200 ? false : true}
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
