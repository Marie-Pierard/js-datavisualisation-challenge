(() => {

    const table2 = document.getElementById("table2");
    
    function loadData2(ctx) {
        const labels = [];
        let data = [];
        let chart = null;
        const randomColor = () => Math.floor(Math.random() * 256);  
        
        for (let i = 0; i < table2.rows.length; i++) {
            let countryBar = {
                label: table2.rows[i].cells[1].outerText,
                backgroundColor: 'rgb('+randomColor()+', '+randomColor()+', '+randomColor()+')',
                hidden: i>3,
                data: []
            };
            for (let j = 0; j < table2.rows[i].cells.length; j++) {
                if(i === 0 && j > 1) {
                    labels.push(table2.rows[i].cells[j].outerText);
                } else {
                    if(j > 1) {
                        countryBar.data.push(Number(table2.rows[i].cells[j].outerText));
                    }     
                }
            }
            if(i > 1) {
                data.push(countryBar);
            }
        }
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: data
            },
            options: {
              maintainAspectRatio: false,
              responsive: false            
            
            }
        });
    }
    console.log(loadData2)
    function graph2() {
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');
        table2.before(canvas);
        loadData2(ctx);
    }
    graph2();

})()