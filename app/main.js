
/**
 * [paths description]
 * @type {Object}
 */
requirejs.config({

    paths : {
        jquery : "components/jquery/jquery",
        bootstrap: "components/bootstrap/dist/js/bootstrap",
        highcharts: "components/highcharts-release/highcharts",
        exporting: "js/lib/exporting",
        datatables: "js/lib/jquery.dataTables",
        domReady: "components/domReadyRequireJS/domReady",
        underscore:"components/underscore/underscore",
        dataTableBootStrap:"js/lib/dataTables.bootstrap",
        requirejs: "components/requirejs/require",
        "application" : 'js/app'
    },

    shim : {
        highcharts: {
            deps: ['jquery'],
            exports: 'Highcharts'
        },
        datatables: {
            deps:   ["jquery"],
            exports: '$.fn.dataTable'
        },
        exporting : {
            deps: ["highcharts"]
        },
        "bootstrap": {
            deps: ['jquery'],
            exports: '$.fn.popover'
        },
        domReady : {
            deps: ["requirejs"]
        },
        underscore : {
            exports : '_'
        }
    }

});
/**
 * [description]
 * @param  {[type]} $
 * @param  {[type]} d
 * @return {[type]}
 */
require(["jquery",
    "domReady",
    "highcharts",
    "datatables",
    "bootstrap",
    "exporting",
    "dataModel",
    "dataTableBootStrap",
    "underscore",
    "application"],function($,domReady,highcharts,datatables,bootstrap,exporting,dataModel,dataTableBootStrap,underscore,App) {
    /*
     * Pass a callback function i.e. application code to execute one DOM is ready
     * */
    domReady(function(){
        var myApp = new App();
        myApp.loadData();
        myApp.loadDataTables();

        $(window).resize(function() {
            myApp.resizeChart();
        });

        $("#reset").click(function(){
            myApp.filterTableData("");
            var columnChartData = myApp.createColumnChartData( myApp.data,"start_date","");
            //console.log(self.columnChartData);
            myApp.loadColumnChart(columnChartData,'#00008b');
        });
    });
});