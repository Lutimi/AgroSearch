import Swale from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwale = withReactContent(Swale);

export const Alerting = ({ title, message, icon, type }) => {
  mySwale.fire({
    title: title,
    text: message,
    icon: icon,
    confirmButtonText: "OK",
    confirmButtomColor: "#1E6594",
    type: type,
  });
};

export const Loading = () => {
  mySwale.fire({
    title: "Cargando...",
    text: "Espere un momento",
    icon: "info",
    confirmButtonText: "OK",
    confirmButtomColor: "#1E6594",
    showConfirmButton: false,
  });
};
