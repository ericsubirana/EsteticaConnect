import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import axios from "axios";

export default function PoliticaSeguretat() {

    return (
        <div>
            <Header page="home" />
            <div className="politica">
                <h2>Información que recopilamos</h2>
                <p>
                    Nuestro sitio web podrá recopilar información personal, como:
                </p>
                <ul>
                    <li>Nombre completo.</li>
                    <li>Información de contacto, incluyendo dirección de correo electrónico y teléfono.</li>
                    <li>Datos demográficos como código postal, preferencias y gustos.</li>
                    <li>Información específica para procesar pedidos, coordinar envíos de productos o agendar citas para servicios.</li>
                </ul>

                <h2>Uso de la información recopilada</h2>
                <p>
                    Usamos la información recopilada para:
                </p>
                <ul>
                    <li>Proporcionar productos y servicios personalizados.</li>
                    <li>Mantener un registro de usuarios y de pedidos o solicitudes de servicios.</li>
                    <li>Mejorar nuestros productos, servicios y experiencia en línea.</li>
                    <li>Enviar correos electrónicos periódicos con información sobre promociones, nuevos productos, servicios o contenido relevante.</li>
                </ul>
                <p>
                    Estos correos electrónicos serán enviados a la dirección proporcionada por usted y podrá cancelar su suscripción en cualquier momento.
                </p>

                <h2>Seguridad de la información</h2>
                <p>
                    Estamos comprometidos con la seguridad de su información. Implementamos sistemas avanzados y los actualizamos constantemente para evitar accesos no autorizados.
                </p>

                <h2>Uso de cookies</h2>
                <p>
                    Una cookie es un archivo pequeño que se almacena en su dispositivo con el fin de facilitar la navegación. Nuestro sitio utiliza cookies para:
                </p>
                <ul>
                    <li>Identificar las páginas más visitadas y analizar patrones de uso.</li>
                    <li>Mejorar su experiencia y brindarle contenido personalizado.</li>
                </ul>
                <p>
                    Usted puede aceptar o rechazar las cookies desde la configuración de su navegador. Sin embargo, algunas funcionalidades del sitio pueden verse limitadas si rechaza las cookies.
                </p>

                <h2>Enlaces a terceros</h2>
                <p>
                    Nuestro sitio puede contener enlaces a otras páginas que puedan ser de su interés, como proveedores o socios. Una vez que haga clic en estos enlaces y abandone nuestro sitio, no tenemos control sobre las prácticas de privacidad de esos sitios y no somos responsables de la protección de sus datos en ellos. Le recomendamos revisar las políticas de privacidad de dichos sitios.
                </p>

                <h2>Control de su información personal</h2>
                <p>
                    En cualquier momento, usted puede restringir el uso de su información personal de las siguientes maneras:
                </p>
                <ul>
                    <li>Optando por no recibir comunicaciones promocionales al marcar o desmarcar las opciones correspondientes en los formularios.</li>
                    <li>Cancelando su suscripción a boletines o comunicaciones.</li>
                </ul>
                <p>
                    <strong>Cefina</strong> no venderá, cederá ni distribuirá su información personal sin su consentimiento, salvo que sea requerido por ley.
                </p>
                <p>
                    Nos reservamos el derecho de modificar esta política en cualquier momento. Cualquier cambio será publicado en esta página.
                </p>

                <p>
                    Si tiene preguntas sobre nuestra política de privacidad, no dude en contactarnos a través de <a href="mailto:ce.fina@hotmail.com">ce.fina@hotmail.com</a>.
                </p>
            </div>
            <Footer/>
        </div>
    )
}
