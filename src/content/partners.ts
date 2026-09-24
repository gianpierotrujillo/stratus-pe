/**
 * SOCIOS — fuente única. Textos validados por los socios (capturas GoDaddy).
 */
import { PENDIENTE } from "@/config/pending";

export type Partner = {
  slug: string;
  name: string;
  role: string;
  credential: string;
  bio: string;
  specialties: readonly string[];
  photo: { src: string; alt: string; width: number; height: number };
  linkedin: string;
};

export const partners: readonly Partner[] = [
  {
    slug: "luis-garcia-neyra",
    name: "Luis Garcia Neyra",
    role: "Socio",
    credential: "Abogado y candidato a MBA — Universidad de Lima",
    bio: 'Cuenta con más de 15 años de experiencia asesorando a empresas, organizaciones sin fines de lucro y entidades del Estado en materia ambiental, recursos naturales, derecho de los pueblos indígenas y financiamiento e implementación de emprendimientos sostenibles. Ha sido Co-fundador y Gerente General de Tambopata Expeditions S.A.C., empresa peruana impulsora del desarrollo de "Las Piedras Amazon Center - LPAC". Actualmente brinda asesoría a diversos proyectos y empresas familiares para la prevención de riesgos desde su inicio y el escalamiento de oportunidades. Habla inglés fluido.',
    specialties: ["Derecho Ambiental", "Recursos Naturales", "Pueblos Indígenas", "Emprendimientos Sostenibles"],
    photo: {
      src: "/images/equipo/luis-garcia-neyra-abogado-socio-stratus-consulting.jpg",
      alt: "Luis Garcia Neyra, abogado y socio de Stratus Consulting",
      width: 1200,
      height: 1600,
    },
    linkedin: PENDIENTE("LinkedIn de Luis Garcia Neyra"),
  },
  {
    slug: "jose-miguel-tay",
    name: "José Miguel Tay",
    role: "Socio",
    credential: "Abogado y Máster en Derecho Empresarial — Universidad de Lima",
    bio: "Cuenta con más de 15 años de experiencia asesorando a empresas en derecho corporativo, laboral, gestión de tierras, derecho inmobiliario y solución de controversias. Actualmente brinda asesoría a diversos proyectos y empresas familiares, orientando la búsqueda de soluciones holísticas para capitalizar oportunidades. Habla inglés fluido.",
    specialties: ["Derecho Corporativo", "Derecho Laboral", "Gestión de Tierras", "Derecho Inmobiliario"],
    photo: {
      src: "/images/equipo/jose-miguel-tay-abogado-socio-stratus-consulting.jpg",
      alt: "José Miguel Tay, abogado y socio de Stratus Consulting",
      width: 1200,
      height: 1607,
    },
    linkedin: PENDIENTE("LinkedIn de José Miguel Tay"),
  },
];
