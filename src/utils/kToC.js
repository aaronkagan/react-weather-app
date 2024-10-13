export default function kToC(tempInKelvin) {
  const tempInCelsius = parseInt(tempInKelvin - 273.15);
  return tempInCelsius;
}
