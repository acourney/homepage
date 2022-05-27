import React, { useEffect, useState } from "react";

function Time(props) {
  const [toggle, setToggle] = useState(false);
  const [timeToDisplay, setTimeToDisplay] = useState("");

  let time = new Date();
  let local_hour = parseInt(time.toLocaleTimeString().split(":")[0]);
  let local_minute = parseInt(time.toLocaleTimeString().split(":")[1]);
  let postfix = time.toLocaleTimeString().split(" ")[1];

  function minuteConversion(m) {
    let minute = "";

    const ones = {
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
      7: "seven",
      8: "eight",
      9: "nine",
    };

    const teens = {
      10: "ten",
      11: "eleven",
      12: "twelve",
      13: "thirteen",
      14: "fourteen",
      15: "fifteen",
      16: "sixteen",
      17: "seventeen",
      18: "eighteen",
      19: "nineteen",
    };

    const tens = {
      2: "twenty",
      3: "thirty",
      4: "forty",
      5: "fifty",
      6: "sixty",
    };

    if (m.toString().length === 1) {
      minute = ones[m];
    } else if (m.toString().length === 2) {
      if (m.toString().split("")[0] === "1") {
        minute = teens[m];
      } else {
        const min_arr = [];
        const first_digit = parseInt(m.toString().split("")[0]);
        const second_digit = parseInt(m.toString().split("")[1]);

        const tens_place = tens[first_digit];
        const ones_place = ones[second_digit];

        min_arr.push(tens_place, ones_place);
        minute = min_arr.join(" ");
      }
    }

    return minute;
  }
  function timeInWords(h, m) {
    // Write your code here
    if (m.toString().split("")[0] === "0") {
      m = parseInt(m.toString().split("")[1]);
    }
    if (h > 12 || h < 1) {
      console.log("please enter a valid hour between 1 and 12");
    }
    if (m < 0 || m > 60) {
      console.log("please enter a valid minute between 0 and 60");
    }
    let time_str = "";
    const time_arr = [];

    const hour_conversions = {
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
      7: "seven",
      8: "eight",
      9: "nine",
      10: "ten",
      11: "eleven",
      12: "twelve",
    };
    const hour = hour_conversions[h];
    const next_hour = hour_conversions[h + 1];

    if (m === 0) {
      time_arr.push(hour, "o' clock");
    } else if (m === 1) {
      time_arr.push("one minute past", hour);
    } else if (m === 15) {
      time_arr.push("quarter past", hour);
    } else if (m === 30) {
      time_arr.push("half past", hour);
    } else if (m === 45) {
      time_arr.push("quarter to", next_hour);
    } else if (m === 60) {
      time_arr.push(next_hour, "o' clock");
    }

    if (m > 30 && m !== 45 && m !== 60) {
      const minutes = minuteConversion(60 - m);
      time_arr.push(minutes, "minutes to", next_hour);
    } else if (m < 30 && m !== 15 && m !== 1 && m !== 0) {
      const minutes = minuteConversion(m);
      time_arr.push(minutes, "minutes past", hour);
    }
    time_str = time_arr.join(" ");
    return time_str;
  }

  useEffect(() => {
    const intervalID = setTimeout(() => {
      setTimeToDisplay(timeInWords(local_hour, local_minute));
      setToggle((toggle) => !toggle);
    }, 1000);

    return () => clearInterval(intervalID);
  }, [toggle]);

  return <div>{timeToDisplay}</div>;
}

export default Time;
