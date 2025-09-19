import { supabase } from "@/lib/supabase";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// TODO: Validation of form fields, email response on submission, validate if already made a booking for that date

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function Home() {
  const [name, setName] = useState("");
  const [tourCompany, setTourCompany] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [venue, setVenue] = useState<"Killarney" | "Tralee">("Killarney");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");

  async function submitForm() {
    const { data, error } = await supabase
      .from("Bookings")
      .insert({
        ContactName: name,
        TourCompany: tourCompany,
        ContactEmail: email,
        Date: date,
        Venue: venue,
        NumberOfGuests: numberOfGuests,
        Approved: false,
        PhoneNumber: phoneNumber,
      })
      .select();
    if (error) {
      console.error("Error adding Booking:", error);
      alert("There was an error submitting your booking. Please try again.");
    } else {
      console.log("Booking added successfully:", data);
      alert(
        "Booking submitted successfully! Please note that your booking is not confirmed until you receive a confirmation email."
      );
      setName("");
      setTourCompany("");
      setEmail("");
      setDate(new Date());
      setVenue("Killarney");
      setNumberOfGuests(1);
      setPhoneNumber("");
    }
  }

  const isntSat = (date: Date) => {
    return date.getDay() !== 6;
  };

  return (
    <div className="min-h-screen pb-20">
      <div
        className="container mx-auto py-8 px-4 text-white text-center"
        id="information"
      >
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Celtic Steps Coach Bookings System
        </h1>
        <p className="w-full md:w-2/3 lg:w-1/2 mx-auto mb-8">
          Use the below form to register interest for a coach booking for the
          show. Please note that you will{" "}
          <span className="underline">not have a valid booking</span> until you
          have recieved a{" "}
          <span className="font-bold">confirmation number via email</span>.
        </p>
      </div>
      <div
        id="userform"
        className="py-8 px-4 text-white justify-items-center grid xl:grid-cols-2 gap-10 [&>*]:w-full "
      >
        <div id="Contact Name" className="flex flex-col gap-2 items-center">
          <label className="label w-full">
            <span className="label-text text-white mx-auto font-bold">
              Tour Leader Name
            </span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Tour Leader Name"
            autoComplete="name"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div id="Tour Company" className="flex flex-col gap-2 items-center">
          <label className="label w-full">
            <span className="label-text text-white mx-auto font-bold">
              Tour Company
            </span>
          </label>
          <input
            value={tourCompany}
            onChange={(e) => setTourCompany(e.target.value)}
            type="text"
            placeholder="Tour Company"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div id="Contact Email" className="flex flex-col gap-2 items-center">
          <label className="label w-full">
            <span className="label-text text-white mx-auto font-bold">
              Contact Email
            </span>
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Contact Email"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div id="Phone Number" className="flex flex-col gap-2 items-center">
          <label className="label w-full">
            <span className="label-text text-white mx-auto font-bold">
              Phone Number (Including Country Code)
            </span>
          </label>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            placeholder="Phone Number (Including Country Code)"
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div id="Date" className="flex flex-col gap-2 items-center">
          <label className="label w-full">
            <span className="label-text text-white mx-auto font-bold">
              Date
            </span>
          </label>
          {/* <input
            value={
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1).toString().padStart(2, "0") +
              "-" +
              date.getDate().toString().padStart(2, "0")
            }
            onChange={(e) => setDate(new Date(e.target.value))}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            max={new Date().getFullYear() + "-10-17"}
            
            placeholder="Date"
            className="input input-bordered w-full max-w-xs"
          /> */}
          <DatePicker
            selected={new Date()}
            value={
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1).toString().padStart(2, "0") +
              "-" +
              date.getDate().toString().padStart(2, "0")
            }
            onChange={(d: Date | null) => {
              setDate(d || new Date());
            }}
            placeholderText="Select a date"
            minDate={new Date()}
            maxDate={new Date(new Date().getFullYear(), 9, 17)} // October is month 9 (0-indexed)
            dateFormat="yyyy-MM-dd"
            filterDate={isntSat}
            className="input input-bordered max-w-xs w-100"
            withPortal
          />
        </div>
        <div id="Venue" className="flex flex-col gap-2 items-center">
          <label className="label w-full">
            <span className="label-text text-white mx-auto font-bold">
              Venue
            </span>
          </label>
          <select
            value={venue}
            onChange={(e) =>
              setVenue(e.target.value == "Killarney" ? "Killarney" : "Tralee")
            }
            className="input input-bordered w-full max-w-xs"
          >
            <option value={"Killarney"}>
              Celtic Steps the Show : Killarney
            </option>
            <option value={"Tralee"}>Celtic Steps the Show : Tralee</option>
          </select>
        </div>
        <div id="Number of Guests" className="flex flex-col gap-2 items-center">
          <label className="label w-full">
            <span className="label-text text-white mx-auto font-bold">
              Number of Guests
            </span>
          </label>
          <input
            value={numberOfGuests}
            onChange={(e) =>
              setNumberOfGuests(e.target.value as unknown as number)
            }
            type="number"
            min="1"
            placeholder="Number of Guests"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>
      <div>
        <button
          className="btn btn-success btn-wide mx-auto block"
          onClick={submitForm}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
