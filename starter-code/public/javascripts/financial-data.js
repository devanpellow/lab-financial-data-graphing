const getBtcPrice = () => {
	document.getElementById("date-btn").onclick = () => {
		const startDate = document.getElementById("start-date").value;
		const endDate = document.getElementById("end-date").value;
		const currency = document.getElementById("currency").value;
		// const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
		const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`;

		axios
			.get(url)
			.then(response => {
				const data = response.data;
				const dates = Object.keys(data.bpi);
				const prices = Object.values(data.bpi);

				console.log(dates, prices);

				let minVal = prices[0].toFixed(2);
				let maxVal = prices[prices.length - 1].toFixed(2);
				console.log(minVal);
				document.getElementById("min-val").innerText = (minVal + " " + currency);
				document.getElementById("max-val").innerText = (maxVal + " " + currency);

				const ctx = document
					.getElementById("stock-chart")
					.getContext("2d");

				const myChart = new Chart(ctx, {
					type: "line",
					data: {
						labels: dates,
						datasets: [
							{
								label: "Bitcoin price",
								data: prices,
								backgroundColor: "rgba(54, 162, 235, 0.3)"
							}
						]
					}
				});
			})
			.catch(err => {
				console.log(err);
			});
	};
};
getBtcPrice();
