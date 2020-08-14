(() => {

    const table1 = document.getElementById("table1");
    
    function loadData1(ctx) {
        const labels = [];
        let data = [];
        let chart = null;
        const randomColor = () => Math.floor(Math.random() * 256);  
        
        for (let i = 1; i < table1.rows.length; i++) {
            let countryLine = {
                label: table1.rows[i].cells[1].outerText,
                backgroundColor: 'rgba(0, 99, 132, 0.1)',
                borderColor: 'rgb('+randomColor()+', '+randomColor()+', '+randomColor()+')',
                hidden: i>4,
                data: []
            };
            for (let j = 0; j < table1.rows[i].cells.length; j++) {
                if(i === 1 && j > 1) {
                    labels.push(table1.rows[i].cells[j].outerText);
                } else {
                    if(j > 1) {
                        countryLine.data.push(Number(table1.rows[i].cells[j].outerText.replace(",",".")));
                    }     
                }
            }
            if(i > 1) {
                data.push(countryLine);
            }
        }
        chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labels,
              datasets: data
            },
            options: {
              maintainAspectRatio: false,
              responsive: false,
            
            }
        });
    }
    function graph1() {
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');
        table1.before(canvas);
        loadData1(ctx);
    }
    graph1();

})()