import { Link } from "react-router-dom";
import {
  MapPinned,
  PlusCircle,
  Flag
} from "lucide-react";

function QuickActions() {

  const actions = [
    {
      title: "Find Toilets",
      description: "Explore nearby public toilets on the interactive map.",
      icon: <MapPinned size={34} />,
      link: "/map",
      color: "text-blue-600 bg-blue-100"
    },
    {
      title: "Add Toilet",
      description: "Help others by adding a verified public toilet.",
      icon: <PlusCircle size={34} />,
      link: "/add-toilet",
      color: "text-emerald-600 bg-emerald-100"
    },
    {
      title: "Request Toilet",
      description: "Create a demand if your area needs a public toilet.",
      icon: <Flag size={34} />,
      link: "/add-demand",
      color: "text-red-600 bg-red-100"
    }
  ];

  return (

    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-slate-900">

          Quick Actions

        </h2>

        <p className="text-slate-500 text-center mt-4">

          Everything you need is just one click away.

        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">

          {
            actions.map((action, index) => (

              <Link
                key={index}
                to={action.link}
                className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition duration-300 p-8 border border-slate-200 hover:-translate-y-2"
              >

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${action.color}`}>

                  {action.icon}

                </div>

                <h3 className="text-2xl font-semibold mt-6">

                  {action.title}

                </h3>

                <p className="text-slate-500 mt-3 leading-7">

                  {action.description}

                </p>

              </Link>

            ))
          }

        </div>

      </div>

    </section>

  );

}

export default QuickActions;