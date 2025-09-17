import { supabase } from "@/lib/supabase";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";

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

  async function submitForm() {
    const { data, error } = await supabase.from("Bookings").insert({
      ContactName: name,
      TourCompany: tourCompany,
      ContactEmail: email,
      Date: date,
      Venue: venue,
      NumberOfGuests: numberOfGuests,
      Approved: false,
    });
    if (error) {
      console.error("Error adding Booking:", error);
    } else {
      console.log("Booking added successfully:", data);
    }
  }

  return (
    <div className="min-h-screen">
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
              Contact Name
            </span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Contact Name"
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

        <div id="Date" className="flex flex-col gap-2 items-center">
          <label className="label w-full">
            <span className="label-text text-white mx-auto font-bold">
              Date
            </span>
          </label>
          <input
            value={date.toDateString()}
            onChange={(e) => setDate(new Date(e.target.value))}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            max={new Date().getFullYear() + "-10-17"}
            placeholder="Date"
            className="input input-bordered w-full max-w-xs"
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
