class Renderer {
	constructor() {}

	async chartIt(stockSymbol, closePrices, dates) {
        var ctx = document.getElementById("myChart").getContext("2d");
        
		var data = {
			labels: await dates,
			datasets: [
				{
					label: await stockSymbol,
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: await closePrices,
				},
            ],
		};

		new Chart(ctx).Line(data, {
		
			onAnimationComplete: function () {
				var sourceCanvas = this.chart.ctx.canvas;
				var copyWidth = this.scale.xScalePaddingLeft - 5;
				var copyHeight = this.scale.endPoint + 5;
				var targetCtx = document.getElementById("myChartAxis").getContext("2d");

				targetCtx.canvas.width = copyWidth;
				targetCtx.drawImage(
					sourceCanvas,
					0,
					0,
					copyWidth,
					copyHeight,
					0,
					0,
					copyWidth,
					copyHeight
                );  
            },
		});
	}
}
const render = new Renderer();

const chartSetup = function(){
    const appendReleventElements = function (element) {
        $(`${element}`).append(`<div class="chartWrapper"> 
        <div class="chartAreaWrapper"> 
           <canvas id="myChart" height="300" width="1200"></canvas> 
        </div> 
        <canvas id="myChartAxis" height="300" width="0"></canvas> 
     </div>  `);
    };
    
    
    const renderChart = async (header, yAxis, xAxis) => {
        await render.chartIt(header, yAxis, xAxis);
    }

    return {
        appendReleventElements,
        renderChart,

    }
}


module.exports = chartSetup
 
 