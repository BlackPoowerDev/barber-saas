export default function convertMinutes(horario) {
  const [horas, minutos] = horario.split(":").map(Number);
  return horas * 60 + minutos;
}
