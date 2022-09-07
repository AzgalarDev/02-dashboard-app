let dataCases = [];
const getData = async () => {
  try {
    const response = await axios.get('https://disease.sh/v3/covid-19/all');
    dataCases = [response.data];
    /*const cases = dataCases.map((element) => element.cases);
    const deaths = dataCases.map((element) => element.deaths);*/
    return dataCases;
  } catch (error) {
    console.error(error);
  }
}

const chart = async () => {
  const dataApi = await getData();
  const cases = dataApi.map((element) => element.cases);
  console.log(cases);
  const deaths = dataApi.map((element) => element.deaths);
  const recovered = dataApi.map((element) => element.recovered);
  const critical = dataApi.map((element) => element.critical);
  const data = {
    labels: ["Cases", "Deaths", "Recovered", "Critical"],
    datasets: [{
        label: "Population (Covid-19)",
        backgroundColor: ["rgba(91,37,245, 1)", "#dad7e9", "#000", "red"],
        data: [cases, deaths, recovered, critical]
    }]
  };
  
  const options = {
    maintainAspectRatio: false,
    legend: {
        position: 'bottom',
        labels: {
            fontColor: "rgba(0,0,0, 0.5)",
            boxWidth: 20,
            padding: 10
        }
    },
  };
  
  const ctx = document.getElementById('doughnutdata').getContext('2d');
  let myLineChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
  });
}





chart();

