import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import Heading from "../../components/Heading";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { baseApiURL } from "../../baseUrl";
import timetableUrl from '../../assets/images/Timetable_3_Semester_CSE.png'

const Timetable = () => {
  const [timetable, setTimetable] = useState("");
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    const getTimetable = () => {
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .get(
          `${baseApiURL()}/timetable/getTimetable`,
          {
            params: {
              semester: userData.semester,
              branch: userData.branch,
            },
            headers: headers,
          }
        )
        .then((response) => {
          if (response.data.length !== 0) {
            setTimetable(response.data[0].link);
          } else {
            // If timetable is not found for the selected batch and semester, redirect or show a message
            toast.error("Timetable not found for your batch and semester.");
          }
        })
        .catch((error) => {
          toast.dismiss();
          console.log(error);
        });
    };

    if (userData && userData.branch && userData.semester) {
      getTimetable();
    }
  }, [userData]);

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title={`Timetable of Semester ${userData.semester}`} />
        {timetable && (
          <p
            className="flex justify-center items-center text-lg font-medium cursor-pointer hover:text-blue-500 hover:scale-110 ease-linear transition-all duration-200 hover:duration-200 hover:ease-linear hover:transition-all"
            onClick={() =>
              window.open(timetableUrl)
            }
          >
            Download
            <span className="ml-2">
              <FiDownload />
            </span>
          </p>
        )}
      </div>
      {timetable && (
        <img
          className="mt-8 rounded-lg shadow-md w-[70%] mx-auto"
          src={timetableUrl}
          alt="timetable"
        />
      )}
      {!timetable && (
        <p className="mt-10">No Timetable Available At The Moment!</p>
      )}
    </div>
  );
};

export default Timetable;
