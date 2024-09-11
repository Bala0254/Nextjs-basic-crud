  export const getStates = () => [
    'California', 'New York', 'Texas', 'Florida', 'Illinois'
  ];
  
  export const getCities = (state: string) => {
    switch (state) {
      case 'California':
        return ['Los Angeles', 'San Francisco', 'San Diego'];
      case 'New York':
        return ['New York City', 'Buffalo', 'Rochester'];
      case 'Texas':
        return ['Houston', 'Dallas', 'Austin'];
      case 'Florida':
        return ['Miami', 'Orlando', 'Tampa'];
      case 'Illinois':
        return ['Chicago', 'Aurora', 'Naperville'];
      default:
        return [];
    }
  };  