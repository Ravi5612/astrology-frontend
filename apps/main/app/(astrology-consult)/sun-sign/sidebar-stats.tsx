import {
  FaArrowRight,
  FaCalendarAlt,
  FaChartBar,
  FaCheck,
  FaDice,
  FaGem,
  FaPalette,
  FaTimes,
} from "react-icons/fa";

type Options = {
  icon: React.JSX.Element;
  label: string;
  val: string;
};

const menuOptions: Options[] = [
  {
    icon: <FaPalette />,
    label: "Lucky Color",
    val: "Golden & Red",
  },
  {
    icon: <FaDice />,
    label: "Lucky No.",
    val: "1, 5, 9",
  },
  {
    icon: <FaGem />,
    label: "Stone",
    val: "Ruby / Amber",
  },
  {
    icon: <FaCalendarAlt />,
    label: "Lucky Day",
    val: "Sunday",
  },
];

export const SidebarStats = () => {
  return (
    <div className="col-lg-4">
      <div className="space-y-6">
        <div className="bg-[#301118] text-white p-8 rounded-4 border border-[#fd64102b] shadow-xl">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
            <FaChartBar className="text-[#fd6410]" /> Key Attributes
          </h3>
          <div className="space-y-4">
            {menuOptions.map((stat, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-white/5 p-4 rounded-3 border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-orange-400">{stat.icon}</span>
                  <span className="text-[10px] font-bold uppercase text-gray-400">
                    {stat.label}
                  </span>
                </div>
                <span className="text-sm font-bold text-orange-200">
                  {stat.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="light-card p-8 bg-orange-50 border border-orange-100 rounded-4">
          <h4 className="text-[#301118] font-black uppercase tracking-wider text-sm mb-4">
            compatibility
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <FaCheck size={10} />
              </div>
              <span className="text-xs font-bold text-gray-500 italic">
                Best With: Leo, Sagittarius, Aries
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-red-100 text-red-600 p-2 rounded-full">
                <FaTimes size={10} />
              </div>
              <span className="text-xs font-bold text-gray-500 italic">
                Challenge With: Scorpio, Aquarius
              </span>
            </div>
          </div>
          <button className="btn-link mt-8 w-full flex items-center justify-center gap-4 text-xs bg-[#fd6410] text-white rounded-xl border-0 font-bold uppercase tracking-widest">
            View Full Compatibility <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
