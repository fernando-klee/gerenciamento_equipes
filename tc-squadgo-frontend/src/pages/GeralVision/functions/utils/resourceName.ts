export function resourceName(name: string): string {
    const lastName = name.substring(name.lastIndexOf(" "), name.length);
    const firstName = name.substring(0, name.indexOf(" "));

    return `${firstName} ${lastName}`;
  };