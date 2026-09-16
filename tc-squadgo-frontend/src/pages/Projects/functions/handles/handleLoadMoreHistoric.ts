export async function handleLoadMoreHistoric(
    setLoadingMoreHistoric: React.Dispatch<React.SetStateAction<boolean>>,
    setHistoricFilter: React.Dispatch<React.SetStateAction<{
    current_page: number;
    last_page: number;
  }>>
) {
    setLoadingMoreHistoric(true);
    setHistoricFilter((oldData) => {
      return { ...oldData, current_page: oldData.current_page + 1 };
    });
  }