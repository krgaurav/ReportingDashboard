/**
 * Created by kumarg on 7/28/2014.
 */
define(["highcharts","dataModel"],function(highcharts,dataModel){

    var appModel = function(){
        var self = this;
        self.data = {};
        self.columnChart = null;
        self.months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        self.loadData = function(){
            // it will do ajax stuff, and on success you will return the data.
            $.ajax(
                {
                    type: "GET",
                    url:"http://localhost:8066/model/countryData.json",
                    dataType: "json",
                    cache: false,
                    async:false,
                    success:function(result){
                        self.data = result.data;
                        self.pieChartData = self.createPieChartData( self.data,"office");
                        self.loadPieChart(self.pieChartData);

                        var columnChartData = self.createColumnChartData( self.data,"start_date","");
                        //console.log(self.columnChartData);
                        self.loadColumnChart(columnChartData,'#00008b');

                    },
                    failure:function(){
                        alert("Error in DataLoading" );

                    },
                    error:
                        function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown)
                        }
                });
        };

        self.loadColumnChart = function(chartData, color){
            //console.log(chartData);
            self.columnChart = $('#lineChartcontainer').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Employee In Office'
                },
                subtitle: {
                    text: 'Source: FinancialEngine Crop.'
                },
                xAxis: {
                    categories: chartData.categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'No. Of Emp '
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                colors: [
                    color
                ],
                series: [{
                    data : chartData.data
                }]
            });
        },
        self.loadLineChart = function(){
            $('#lineChartcontainer').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Monthly Average Rainfall'
                },
                subtitle: {
                    text: 'Source: WorldClimate.com'
                },
                xAxis: {
                    categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec'
                    ]
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Rainfall (mm)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Tokyo',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

                }, {
                    name: 'New York',
                    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

                }, {
                    name: 'London',
                    data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

                }, {
                    name: 'Berlin',
                    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

                }]
            });
        },
        self.loadPieChart = function(chartData){
            $('#pieChartcontainer').highcharts({
                chart: {
                    type: 'pie',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Monthly Average Rainfall'
                },
                subtitle: {
                    text: 'Source: WorldClimate.com'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type:'pie',
                    name: 'FinancialEngine',
                    data: chartData.data,
                    point:{
                        events:{
                            click:function(event){
                                //console.log(this.name);
                                self.filterTableData(this.name);
                                self.filterColumnChart(this.name,this.color);
                            }
                        }
                    }


                }]
            });
        },
        self.loadDataTables = function(){
            $('#dataTable').dataTable({
                "ajax":"/model/countryData.json" ,
                "columns":[
                    { "data": "name" },
                    { "data": "position" },
                    { "data": "office" },
                    { "data": "extn" },
                    { "data": "start_date" },
                    { "data": "salary" }
                ],
                "sDom": "<'row'" +
                            "<'#resetButton'>" +
                            "<'clearfix col-sm-12'l<f>>>t" +
                        "<'row'<'col-sm-4'i><'col-sm-12'p>>"
            });
            $("#resetButton").html('<button id ="reset" type="button" class="btn btn-default btn-xs">Reset</button>');
        },

        //Rezize Chart
        self.resizeChart = function(){
            var chart = $('#lineChartcontainer').highcharts();
            var width;
            if($("#chartContainer").width()-20 > 555){
                width = $('#lineChartcontainer').width()-20;
            }else{
                width = $("#chartContainer").width()-20;
            }
            var height = chart.chartHeight;
            chart.setSize(width, height, doAnimation = true);
        }

        //Create chart Data from given data
        self.createPieChartData = function(data,categoryName){
            self.resultData = {};
            var categories = [];
            var dataMap = {};
            var cat;
            for(var i=0; i< data.length; i++ ) {
                if(data[i].hasOwnProperty(categoryName))
                    cat = data[i][categoryName];
                if(categories.indexOf(cat) == -1)
                    categories.push(cat);
                if (dataMap.hasOwnProperty(cat)){// For illustration // Edit, remove null check
                    // increase the count by one
                    dataMap[cat] = self.get(cat, dataMap) +1;
                } else {
                    // add the category in the dataMap
                    dataMap[cat] = 1;
                }

            }
            categories.sort();
            var data = _.map(dataMap, function(val, key){
                return [key, val]
            })
            self.resultData.categories = categories;
            self.resultData.data = data;
            return self.resultData;
        }

        //Create Data based on joining date
        self.createColumnChartData = function(data,categoryName,filterfield){
            self.resultData = {};
            var dataMap = {};
            var date;
            //Create initial Map for months nad their respective data
            for(i=0;i< self.months.length ; i++){
                dataMap[self.months[i]] = 0;
            }

            //iterate the data and populate the month map
            for(var i=0; i< data.length; i++ ) {
                if (data[i].hasOwnProperty(categoryName)) {
                    if (filterfield == "" || filterfield == "undefined") {
                        date = data[i][categoryName];
                        var monthName = self.getMonthFromDate(date);
                        //check for applying filter Field

                        if (dataMap.hasOwnProperty(monthName)) {// For illustration // Edit, remove null check
                            // increase the count by one
                            dataMap[monthName] = self.get(monthName, dataMap) + 1;
                        }
                    }else {
                        if(data[i].office == filterfield) {
                            date = data[i][categoryName];
                            var monthName = self.getMonthFromDate(date);
                            //check for applying filter Field

                            if (dataMap.hasOwnProperty(monthName)) {// For illustration // Edit, remove null check
                                // increase the count by one
                                dataMap[monthName] = self.get(monthName, dataMap) + 1;
                            }
                        }

                    }
                }
            }
            var data = _.map(dataMap, function(val, key){
                return [key, val]
            })
            self.resultData.categories = self.months;
            self.resultData.data = data;
            return self.resultData;
        },

        self.get = function(k, map){
            return map[k];
        }

        //filter Table data to show data only for the given location
        self.filterTableData = function(name){
            // DataTable
            var table = $('#dataTable').DataTable();
            // Apply the search
            table.column( 2 ).search(name).draw();
        }

        //Filter ColumnCHart
        self.filterColumnChart =function(office, color){
            var newColumnChartData =  self.createColumnChartData(self.data,"start_date",office);
            self.loadColumnChart(newColumnChartData,color);
            $('#lineChartcontainer').highcharts().legend.allItems[0].update({name:office});
        }

        //get Month Name from Date
        self.getMonthFromDate = function(date){
            var d = new Date(Date.parse(date));
            var monthName = self.months[d.getMonth()];
            return monthName;
        }


    }
    return appModel;
});