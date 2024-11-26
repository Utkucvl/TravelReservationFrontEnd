import { configureStore } from "@reduxjs/toolkit";
import securitySlice from "./securitySlice";
import testimonialSlice from "./testimonialSlice";
import blogSlice from "./blogSlice";
import toVisitSlice from "./toVisitSlice";
import hotelSlice from "./hotelSlice";
import reservationSlice from "./reservationSlice";
import userSlice  from "./userSlice";
export const store = configureStore({
    reducer: {
      security: securitySlice,
      testimonial:testimonialSlice,
      blog:blogSlice,
      toVisit :toVisitSlice,
      hotel:hotelSlice,
      reservation:reservationSlice,
      user:userSlice
    },
  });