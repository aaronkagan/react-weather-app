import { Link } from 'react-router-dom';

export default function SplashPage() {
  return (
    <div className="flex justify-center items-center flex-col gap- mt-[15vh]">
      <Link to="/home">
        <img
          className="rounded-[110px]"
          src="/assets/images/icons/weather-app-icon.webp"
          alt="weather app icon"
        />
      </Link>
      <p className="mt-5 text-white splash-text">
        Click On Icon Above To Load Weather App
      </p>
    </div>
  );
}
