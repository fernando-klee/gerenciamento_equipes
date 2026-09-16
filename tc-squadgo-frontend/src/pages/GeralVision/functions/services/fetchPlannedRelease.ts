import { api } from "../../../../services/api";
import { PlannedReleaseProps } from "../../interfaces"; 

export async function fetchPlannedRelease(
    setPlannedReleaseLoading: React.Dispatch<React.SetStateAction<boolean>>,
    plannedReleaseDate: Date,
    setPlannedRelease: React.Dispatch<React.SetStateAction<PlannedReleaseProps[]>>
) {
      setPlannedReleaseLoading(true);
      const response = await api.get(`/resources/output-estimate/list-all`);
      console.log(response.data);
      const responseFiltered = response.data.filter(
        (re: PlannedReleaseProps) => {
          if (re.output_estimate) {
            const outputEstimateDate = new Date(re.output_estimate);
            const plannedReleaseYear = plannedReleaseDate.getFullYear();
            const outputEstimateYear = outputEstimateDate.getFullYear();
            const outputEstimateMonth = outputEstimateDate.getMonth();

            return (
              outputEstimateYear === plannedReleaseYear &&
              outputEstimateMonth === plannedReleaseDate.getMonth()
            );
          }
          return false;
        }
      );
      setPlannedRelease(responseFiltered);
      setPlannedReleaseLoading(false);
    }