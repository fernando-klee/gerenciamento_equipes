export function projectStatusDescription(status: string) {
    switch (status) {
      case "EM_ANDAMENTO":
        return "Em andamento";
      case "A_INICIAR":
        return "A iniciar";
      case "CONCLUIDO":
        return "Concluído";
    }
  };