/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface JQuery {
  chosen(options?:any):JQuery;
}

declare var AmCharts:any;
declare var Chart:any;
declare var Chartist:any;