import React, { useState, useEffect } from 'react'
import Chart from "react-apexcharts";

export default function LackingSkills() {
    const lackingSkills = localStorage.getItem("lackingSkills");
    const OptimisationPercentage = localStorage.getItem("OptimisationPercentage");
    const [series,setSeries] = useState([]);
    const [labels,setLabels] = useState([]);

    useEffect(() => {
        if(lackingSkills && OptimisationPercentage) {
        const lackPercentage = 100 - parseFloat(OptimisationPercentage);
        setSeries([parseFloat(OptimisationPercentage), lackPercentage]);
        setLabels(["Optimised Skills", "Lacking Skills"]);
        }
    },[lackingSkills, OptimisationPercentage]);

    const chartOptions = {
    chart: {
      type: "pie",
    },
    labels,
    colors: ["#22c55e", "#ef4444"], // Green for optimised, Red for lacking
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "16px",
        colors: ["#fff"],
      },
      formatter: (val, opts) => {
        return `${opts.w.globals.labels[opts.seriesIndex]}: ${val.toFixed(1)}%`;
      },
    },
    legend: {
      position: "bottom",
      labels: {
        colors: "#fff",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val.toFixed(1)}%`,
      },
    },
  };

  return (
    <div className='text-white border-1 border-white rounded-lg shadow-md' >
      {lackingSkills?(
        <div className='border-1 border-white p-4 rounded-lg shadow-md justify-center items-center'>
        <h1 className='text-xl font-semibold mb-4 text-center'>Lacking Skills</h1>
        <p>{lackingSkills}</p>
        </div>): "No lacking skills found."}

      {series.length > 0 && (
        <div className="border-1 border-white p-6 rounded-lg mt-4 flex flex-col justify-center items-center">
          <h1 className="text-xl font-semibold mb-4 text-white text-center">Skill Match Overview</h1>
          <Chart options={chartOptions} series={series} type="pie" width={400} />
        </div>
      )}
    </div>
  )
}

/*
Qualifications and Skills:
?Bachelors degree in Computer Science, Software Engineering, or a related field (or equivalent work experience).
?Proven experience as a Front-End Developer with a portfolio showcasing front-end development projects.
?Proficiency in front-end technologies including HTML, CSS, and JavaScript.
?Experience with modern front-end libraries and frameworks (React, Angular, Vue. js, etc. ).
?Familiarity with version control systems (e. g. , Git) and collaborative coding workflows.
?Strong understanding of responsive design principles and mobile-first development.
?Ability to work collaboratively in a team environment, communicate effectively, and provide constructive feedback.
?Problem-solving skills and the ability to debug and troubleshoot technical issues.
?Knowledge of performance optimization techniques and best practices.
?Experience with CSS preprocessors (such as Sass or Less) and build tools (Webpack, Gulp) is a plus.
?Understanding of backend technologies and basic knowledge of RESTful APIs is a plus.
*/
