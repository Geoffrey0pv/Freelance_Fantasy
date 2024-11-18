import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    return (
        <section className="my-12 px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
                Preguntas Frecuentes
            </h2>
            <Accordion
                type="single"
                collapsible
                className="max-w-4xl mx-auto bg-transparent rounded-xl shadow-lg p-4"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-semibold text-white hover:text-indigo-500">
                        ¿Qué es Freelance Fantasy?
                    </AccordionTrigger>
                    <AccordionContent className="text-white mt-2 border-t border-gray-300 pt-2">
                        Freelance Fantasy es una plataforma dedicada a conectar empresas con
                        freelancers especializados en diversas áreas, asegurando calidad y
                        eficiencia en cada proyecto.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-semibold text-white hover:text-indigo-500">
                        ¿Cómo funciona la plataforma?
                    </AccordionTrigger>
                    <AccordionContent className="text-white mt-2 border-t border-gray-300 pt-2">
                        Regístrate como cliente o freelancer, explora los proyectos
                        publicados o postúlate según tus habilidades, y colabora en un
                        entorno seguro y profesional.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-semibold text-white hover:text-indigo-500">
                        ¿Qué servicios ofrecen los freelancers?
                    </AccordionTrigger>
                    <AccordionContent className="text-white mt-2 border-t border-gray-300 pt-2">
                        Los freelancers ofrecen servicios en desarrollo web, diseño gráfico,
                        marketing digital, redacción de contenido, y más. Cada profesional
                        tiene un portafolio donde puedes revisar su trabajo previo.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-semibold text-white hover:text-indigo-500">
                        ¿Cómo aseguran la calidad del trabajo?
                    </AccordionTrigger>
                    <AccordionContent className="text-white mt-2 border-t border-gray-300 pt-2">
                        Freelance Fantasy fomenta la comunicación abierta y ofrece un sistema
                        de reseñas para garantizar la satisfacción de ambas partes. Además,
                        los pagos se liberan solo cuando el cliente está satisfecho.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                    <AccordionTrigger className="text-lg font-semibold text-white hover:text-indigo-500">
                        ¿Es seguro trabajar en Freelance Fantasy?
                    </AccordionTrigger>
                    <AccordionContent className="text-white mt-2 border-t border-gray-300 pt-2">
                        Absolutamente. Nuestro sistema de pagos y manejo de proyectos está
                        diseñado para proteger tanto a freelancers como a clientes.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
};

export default FAQ;
