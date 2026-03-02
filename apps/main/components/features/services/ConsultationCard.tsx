import React from "react";
import NextImage from "next/image";
const Image = NextImage as any;

interface ConsultationCardProps {
  item: {
    id: number;
    image: string;
    title: string;
  };
}

const ConsultationCard: React.FC<ConsultationCardProps> = ({ item }) => {
  return (
    <div className="mb-5 text-center group">
      <div className="w-[85%] mx-auto mb-[10px] aspect-square overflow-hidden rounded-full border-2 border-orange transition-transform duration-300 group-hover:scale-105">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
      </div>
      <h4 className="text-xl font-medium text-[#1e0b0f] transition-colors duration-300 group-hover:text-orange">
        {item.title}
      </h4>
    </div>
  );
};

export default ConsultationCard;


