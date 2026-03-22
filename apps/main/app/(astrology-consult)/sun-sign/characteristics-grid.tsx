import { FaBriefcase, FaHeart, FaHospital, FaUser } from "react-icons/fa"


type options = {
    icon: React.JSX.Element,
    label: string,
    text: string,
    bg: string
}


export const CharacteristicsGrid = () => {

    const menuOptions: options[] = [
                    {
                      icon: <FaUser className="text-blue-500" />,
                      label: "Personality",
                      text: "Strong, ambitious and determined individuals with a natural spark for leadership.",
                      bg: "bg-blue-50",
                    },
                    {
                      icon: <FaHeart className="text-pink-500" />,
                      label: "Love & Relations",
                      text: "Passionate and loyal partners who seek deep emotional connections.",
                      bg: "bg-pink-50",
                    },
                    {
                      icon: <FaBriefcase className="text-orange-500" />,
                      label: "Career",
                      text: "Excel in creative and structured environments where their skills are valued.",
                      bg: "bg-orange-50",
                    },
                    {
                      icon: <FaHospital className="text-green-500" />,
                      label: "Health",
                      text: "Generally strong constitution but need to maintain balance in routines.",
                      bg: "bg-green-50",
                    },
    ]


    return (
           <div className="row g-4 mb-10">
                  {menuOptions.map((feat, i) => (
                    <div key={i} className="col-md-6">
                      <div
                        className={`${feat.bg} p-6 rounded-4 border border-white h-100 flex gap-4`}
                      >
                        <div className="text-2xl mt-1">{feat.icon}</div>
                        <div>
                          <h4 className="text-sm font-bold text-[#301118] uppercase mb-1">
                            {feat.label}
                          </h4>
                          <p className="text-gray-500 text-xs leading-relaxed italic m-0">
                            {feat.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
        </div>
    )
}