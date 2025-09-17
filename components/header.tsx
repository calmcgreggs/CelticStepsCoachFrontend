import Link from "next/link";

export default function Header() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-sm lg:text-xl">
          Celtic Steps Coach Bookings
        </a>
      </div>

      <div className="navbar-end">
        <Link href="mailto:sales@celticsteps.ie" className="btn">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
