export function handleOnChangePlannedReleaseDate(
    e: Date,
    setPlannedReleaseDate: React.Dispatch<React.SetStateAction<Date>>
) {
    console.log(e);
    setPlannedReleaseDate(e);
  };