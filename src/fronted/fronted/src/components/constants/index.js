export const whyShouldYouPickUs = [
    {
        id: 1,
        name: 'Seguridad',
        pos: 'Protección de Datos y Pagos',
        duration: 'Siempre activa',
        title: "Tu seguridad es nuestra prioridad. Garantizamos la protección de tus datos personales y financieros mediante tecnología de encriptación avanzada. Además, los pagos se procesan de forma segura, protegiendo tanto a freelancers como a clientes.",
        icon: 'verify.png',
        animation: 'salute',
    },
    {
        id: 2,
        name: 'Proyectos Verificados',
        pos: 'Calidad y Confianza',
        duration: 'Constante',
        title: "Trabaja solo en proyectos confiables. Cada proyecto publicado en nuestra plataforma pasa por un proceso de verificación, asegurando que trabajes con clientes reales y evitando fraudes. Esto genera un ambiente seguro tanto para freelancers como para contratantes.",
        icon: 'hand-shake.png',
        animation: 'clapping',
    },
    {
        id: 3,
        name: 'Pagos Garantizados',
        pos: 'Facilidad de Pago',
        duration: 'Al finalizar el trabajo',
        title: "Ofrecemos una plataforma que asegura el pago de tus servicios. Los fondos se retienen hasta que el proyecto se completa satisfactoriamente, garantizando que recibas tu pago puntualmente tras cumplir con los entregables.",
        icon: 'credit-card.png',
        animation: 'victory',
    },
    {
        id: 4,
        name: 'Colaboración Global',
        pos: 'Conexión sin Fronteras',
        duration: 'A nivel mundial',
        title: "Nuestra plataforma te conecta con clientes y freelancers de todo el mundo, permitiendo trabajar de manera remota en proyectos internacionales. Amplía tus horizontes y crea una red global de contactos y oportunidades.",
        icon: 'internet.png',
        animation: 'clapping',
    }

];
export const clientReviews = [
    {
        id: 1,
        name: 'Emily Johnson',
        position: 'Directora de Marketing en GreenLeaf',
        img: 'review1.png',
        review:
            'Colaborar con los freelancers de FreelanceFantasy superó todas mis expectativas. En tan solo unas semanas, transformaron nuestro sitio web en una plataforma moderna, fácil de usar, totalmente responsive y visualmente atractiva. El impacto en nuestra presencia digital ha sido tremendo.',
    },
    {
        id: 2,
        name: 'Marco Lopez',
        position: 'Freelancer en FreelanceFantasy',
        img: 'review2.png',
        review:
            'Trabajar en FreelanceFantasy ha sido una de las mejores decisiones de mi carrera. Estoy rodeado de profesionales de primera clase y accedo a proyectos emocionantes que me permiten crecer constantemente. Además, las oportunidades laborales son insuperables.',
    },
    {
        id: 3,
        name: 'John Dohsas',
        position: 'Project Manager en UrbanTech',
        img: 'review3.png',
        review:
            'FreelanceFantasy convirtió un reto extremadamente complicado en una solución increíble en tiempo récord. Su capacidad para resolver problemas y entregar resultados excepcionales es simplemente impresionante. Los recomiendo sin dudarlo.',
    },
    {
        id: 4,
        name: 'Ether Smith',
        position: 'CEO de BrightStar Enterprises',
        img: 'review4.png',
        review:
            'Ser freelancer en FreelanceFantasy es una experiencia única. La facilidad de comunicación y el apoyo que recibo de la plataforma y los clientes es incomparable. Me permite enfocarme en lo que realmente importa: crear proyectos de alto impacto.',
    },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
        deskPosition: isMobile ? [0.5, -6.50, 0] : [0.25, -6.50, 0],
        cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
        reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
        ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
        targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };

};